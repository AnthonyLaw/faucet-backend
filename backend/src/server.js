const nemController = require('./controllers/nem');
const twitterController = require('./controllers/twitter');
const { nemFaucetValidation, toAbsoluteAmount, toRelativeAmount } = require('./utils/helper');
const dotenv = require('dotenv');
const restify = require('restify');
const restifyErrors = require('restify-errors');

dotenv.config();

const server = restify.createServer();
server.use(restify.plugins.acceptParser('application/json'));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser({ mapParams: true }));

// Setup cross domain access
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'POST, GET');
	next();
});

server.post('/claim/xem', async (req, res, next) => {
	const receiptAddress = req.body.address;
	const transferAmount = toAbsoluteAmount((parseInt(req.body.amount, 10) || 0));
	const faucetAddress = process.env.NEM_FAUCET_ADDRESS;

	try {
		const [
			{ balance: receiptBalance },
			{ balance: faucetBalance },
			unconfirmedTransactions
		] = await Promise.all([
			nemController.getAccountBalance(receiptAddress),
			nemController.getAccountBalance(faucetAddress),
			nemController.getUnconfirmedTransactions(receiptAddress)
		]);

		const error = nemFaucetValidation({
			receiptAddress,
			transferAmount,
			receiptBalance,
			faucetBalance,
			unconfirmedTransactions
		});

		if ('' !== error)
			return next(new restifyErrors.BadRequestError(error));

		// Announce Transfer Transaction
		const result = await nemController.transferXem(transferAmount, receiptAddress);

		res.send({
			code: result.code,
			type: result.type,
			transactionHash: result.transactionHash.data,
			amount: toRelativeAmount(transferAmount),
			receiptAddress
		});

		return next(false);
	} catch (error) {
		return next(error);
	}
});

// Todo
// server.post('/claim/xym', (req, res, next) => {});

server.get('/twitter/auth', async (req, res, next) => {
	try {
		const result = await twitterController.requestToken();

		if ('true' === result.oauth_callback_confirmed) {
			res.send(result);
			return next(false);
		}

		return next(new restifyErrors.InternalError('Twitter auth failed.'));
	} catch (error) {
		return next(error);
	}
});

server.get('/twitter/verify', async (req, res, next) => {
	try {
		const { client, ...info } = await twitterController.userAccess(req.params);

		res.send(info);

		return next(false);
	} catch (error) {
		return next(error);
	}
});

server.get('/twitter/user', async (req, res, next) => {
	try {
		const { followers, userInfo } = await twitterController.getUserData(req.params);

		const diff = Math.abs(new Date() - new Date(userInfo.created_at));
		const accountAge = Math.floor(diff / (1000 * 60 * 60 * 24));

		const isVerify = 10 === followers.length && 30 < accountAge;

		const result = {
			isVerify,
			screenName: userInfo.username
		};

		res.send(result);

		return next(false);
	} catch (error) {
		return next(error);
	}
});

server.listen(process.env.PORT, () => {
	console.info('%s listening at %s', server.name, server.url);
});
