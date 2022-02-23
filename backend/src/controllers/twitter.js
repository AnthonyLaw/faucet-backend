const dotenv = require('dotenv');
const { TwitterApi } = require('twitter-api-v2');

dotenv.config();
const appKey = process.env.TWITTER_APP_KEY;
const appSecret = process.env.TWITTER_APP_SECRET;
const twitterCallback = process.env.TWITTER_CALLBACK_URL;

const twitter = {
	requestToken: async () => {
		const twitterClient = new TwitterApi({
			appKey,
			appSecret
		});

		try {
			return await twitterClient.generateAuthLink(twitterCallback);
		} catch (error) {
			throw Error('fail to request twitter token');
		}
	},
	userAccess: async ({ oauth_token, oauth_token_secret, oauth_verifier }) => {
		const client = new TwitterApi({
			appKey,
			appSecret,
			accessToken: oauth_token,
			accessSecret: oauth_token_secret
		});

		try {
			return await client.login(oauth_verifier);
		} catch (error) {
			throw Error('fail to request user access token');
		}
	},
	getUserData: async ({ accessToken, accessSecret, userId }) => {
		const client = new TwitterApi({
			appKey,
			appSecret,
			accessToken,
			accessSecret
		});

		try {
			const [followers, userInfo] = await Promise.all([
				client.v2.followers(userId, { max_results: 10 }),
				client.v2.me({ 'user.fields': 'created_at' })
			]);

			return {
				followers: followers.data,
				userInfo: userInfo.data
			};
		} catch (error) {
			throw Error('fail to request user data');
		}
	}
};

module.exports = twitter;
