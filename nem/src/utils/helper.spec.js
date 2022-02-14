import Helper from './helper';

describe('Helper', () => {
	describe('isNemTestnetAddressValid should', () => {
		it('return true by given correct address', () => {
			// Arrange:
			const address = 'TAZJ3KEPYAQ4G4Y6Q2IRZTQPU7RAKGYZULZURKTO';

			// Act:
			const result = Helper.isNemTestnetAddressValid(address);

			// Assert:
			expect(result).toBe(true);
		});

		it('return false by given mainnet address', () => {
			// Arrange:
			const address = 'NAQ7RCYM4PRUAKA7AMBLN4NPBJEJMRCHHJYAVA72';

			// Act:
			const result = Helper.isNemTestnetAddressValid(address);

			// Assert:
			expect(result).toBe(false);
		});

		it('return false by given empty address', () => {
			// Arrange:
			const address = '';

			// Act:
			const result = Helper.isNemTestnetAddressValid(address);

			// Assert:
			expect(result).toBe(false);
		});
	});
});
