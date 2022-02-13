import axios from 'axios';

const endpoint = 'http://hugetestalice.nem.ninja:7890';

const client = axios.create({
	baseURL: endpoint
});

const NemRequest = {
	/**
	 * Gets account balance.
	 * @param {string} _address - Account address.
	 * @returns {object} Balance - Account balance.
	 */
	getAccountInfo: async _address => {
		try {
			const response = await client.get(`/account/get?address=${_address}`);

			return { response };
		} catch (error) {
			console.error(`Can't get address balance ${_address}`);
			return { error };
		}
	}
};

export default NemRequest;
