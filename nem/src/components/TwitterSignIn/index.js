import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const TwitterSignIn = function ({
	twitterAccountStatus,
	setTwitterAccountStatus
}) {
	const [isLoading, setIsLoading] = useState(false);

	const twitterAuth = async () => {
		setIsLoading(true);

		const { data } = await axios.get('http://127.0.0.1:8080/twitter/auth');

		localStorage.setItem('twitter_oauth_token_secret', data.oauth_token_secret);

		window.location.href = data.url;
	};

	const twitterLogout = () => {
		localStorage.removeItem('twitter_info');
		localStorage.removeItem('twitter_oauth_token_secret');
		document.location.href = '/';
	};

	useEffect(() => {
		const twitter_info = JSON.parse(localStorage.getItem('twitter_info'));

		const query = new URLSearchParams(window.location.search);
		const oauth_token = query.get('oauth_token');
		const oauth_verifier = query.get('oauth_verifier');

		const twitterVerify = async () => {
			setIsLoading(true);

			const oauth_token_secret = localStorage.getItem('twitter_oauth_token_secret');

			const { data } = await axios.get('http://127.0.0.1:8080/twitter/verify', {
				params: {
					oauth_token,
					oauth_token_secret,
					oauth_verifier
				}
			});

			if (data) {
				localStorage.setItem('twitter_info', JSON.stringify(data));
				document.location.href = '/';
			}

			setIsLoading(false);
		};

		const checkTwitterAccountStatus = async () => {
			if (
				null !== twitter_info.accessSecret
				&& null !== twitter_info.accessToken
				&& null !== twitter_info.userId
				&& null !== twitter_info.screenName) {
				setTwitterAccountStatus({
					isVerify: true,
					screenName: twitter_info.screenName
				});
			}
		};

		if (null !== oauth_token && null !== oauth_verifier)
			twitterVerify(oauth_token, oauth_verifier);

		if (null !== twitter_info)
			checkTwitterAccountStatus(twitter_info);
	}, [setTwitterAccountStatus]);

	return (
		<div>
			{
				twitterAccountStatus.isVerify
					? <button type="button" onClick={twitterLogout}>{`Sign out @${twitterAccountStatus.screenName}`}</button>
					: <button type="button" onClick={twitterAuth} disabled={isLoading}>Sign In with twitter</button>
			}
		</div>
	);
};

TwitterSignIn.propTypes = {
	twitterAccountStatus: PropTypes.exact({
		isVerify: PropTypes.bool.isRequired,
		screenName: PropTypes.string.isRequired
	}).isRequired,
	setTwitterAccountStatus: PropTypes.func.isRequired
};

export default TwitterSignIn;
