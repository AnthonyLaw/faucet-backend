const Helper = {
	/**
	 * Verify Nem address.
	 * @param {string} _address Nem address.
	 * @returns {boolean} Result of address.
	 */
	isNemTestnetAddressValid: _address => {
		const address = _address.toUpperCase().replace(/-/g, '');

		if (!address || 40 !== address.length || 'T' !== address[0])
			return false;

		return true;
	}
};

export default Helper;
