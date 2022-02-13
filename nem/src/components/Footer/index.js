import './footer.scss';
import DiscordIcon from '../../assets/images/icon-discord.png';
import ExplorerIcon from '../../assets/images/icon-explorer.png';
import GithubIcon from '../../assets/images/icon-github.png';
import TwitterIcon from '../../assets/images/icon-twitter.png';
import React from 'react';

const Footer = function () {
	const footerItems = [{
		icon: ExplorerIcon,
		link: 'https://testnet-explorer.nemtool.com',
		text: 'Explorer'
	}, {
		icon: DiscordIcon,
		link: 'https://discord.gg/fjkWXyf',
		text: 'Discord'
	}, {
		icon: GithubIcon,
		link: 'https://github.com/NemProject',
		text: 'Github'
	}, {
		icon: TwitterIcon,
		link: 'https://twitter.com/NEMofficial',
		text: 'Twitter'
	}];

	return (
		<div className="footer">
			{footerItems.map(item => (
				<div key={item.text}>
					<a target="_blank" href={item.link} rel="noreferrer">
						<img
							src={item.icon}
							alt={item.text}
							width={48}
							height={48}
						/>
						<div className="linkText">{item.text}</div>
					</a>
				</div>
			))}
		</div>
	);
};

export default Footer;
