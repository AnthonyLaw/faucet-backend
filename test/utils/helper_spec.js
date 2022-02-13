const { expect } = require('chai');
const helper = require('../../src/utils/helper');


describe('helper', () => {
    it('can convert absolute amount to relative amount.', () => {
        // Arrange:
        const amount = 1000000;

        // Act:
        const relativeAmount = helper.toRelativeAmount(amount);

        // Assert:
        expect(relativeAmount).to.equal(1);
    });

    it('can convert relative amount to absolute amount.', () => {
        // Arrange:
        const amount = 1;

        // Act:
        const absoluteAmount = helper.toAbsoluteAmount(amount);

        // Assert:
        expect(absoluteAmount).to.equal(1000000);
    });

    it('can validate nem address input.', () => {
        // Arrange:
        const receiptAddress = 'ABC';
        const transferAmount = 10;
        const receiptBalance =  10;
        const faucetBalance = 100000;
        const unconfirmedTransactions = []

        // Act:
        const errorMessage = helper.nemFaucetValidation({
            receiptAddress,
            transferAmount,
            receiptBalance,
            faucetBalance,
            unconfirmedTransactions
        });

        // Assert:
        expect(errorMessage).to.equal('Address Invalid');
    });
})