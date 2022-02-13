const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const endpoint = process.env.NEM_ENDPOINT;

const client = axios.create({
	baseURL: endpoint
});

const nemRequest = {
	/**
	 * Gets account balance.
	 * @param {string} _address Account address.
	 * @returns {Promise<object>} Account balance.
	 */
	getAccountInfo: async _address => {
		try {
			const response = await client.get(`/account/get?address=${_address}`);

			return { response };
		} catch (error) {
			console.error(`Can't get address balance ${_address}`);
			return { error };
		}
	},

	/**
	 * Gets timestamp from network.
	 * @returns {Promise<object>} Timestamp.
	 */
	getNetworkTime: async () => {
		try {
			const response = await client.get('/time-sync/network-time');
			return { response };
		} catch (error) {
			console.error('Can not get network time.');
			return { error };
		}
	},

	/**
	 * Gets unconfirmed transactions from account.
	 * @param {string} _address Account address.
	 * @returns {Promise<Array>} Transactions.
	 */
	getUnconfirmedTransactions: async _address => {
		try {
			const response = await client.get(`/account/unconfirmedTransactions?address=${_address}`);
			return { response };
		} catch (error) {
			console.error('Can\'t get address unconfirmed transactions');
			return { error };
		}
	},

	/**
	 * Announce payload to the network.
	 * @param {string} payload - Signed transaction payload.
	 * @returns {object} Announce transaction status.
	 */
	announceTransaction: async payload => {
		try {
			const response = await client.post('/transaction/announce', payload);
			return { response };
		} catch (error) {
			console.error(`Can't announce transaction ${payload}`);
			return { error };
		}
	}
};

module.exports = nemRequest;
