import './faucetForm.scss';
import PropTypes from 'prop-types';
import React from 'react';

const Form = function ({
	formInput, setFormInput, submitForm, isButtonDisable
}) {
	const onHandleChange = event => {
		setFormInput({
			...formInput,
			[event.target.name]: event.target.value
		});
	};

	return (
		<div className="formContainer">
			<input
				name="recipientAddress"
				value={formInput.recipientAddress}
				className="formInput"
				type="text"
				placeholder="Your Testnet Address (Starts with T)"
				onChange={onHandleChange}
			/>

			<input
				name="amount"
				value={formInput.amount}
				className="formInput"
				type="number"
				placeholder="XEM Amount (Max 10,000)"
				onChange={onHandleChange}
			/>

			<button
				className="formButton"
				type="submit"
				onClick={e => submitForm(e)}
				disabled={isButtonDisable}
			>
				Claim
			</button>
		</div>
	);
};

Form.propTypes = {
	formInput: PropTypes.exact({
		recipientAddress: PropTypes.string.isRequired,
		amount: PropTypes.string.isRequired
	}).isRequired,
	setFormInput: PropTypes.func.isRequired,
	submitForm: PropTypes.func.isRequired,
	isButtonDisable: PropTypes.bool.isRequired
};
export default Form;
