export const SITE_NAME = 'gmitch215';
export const PERSON_NAME = 'Gregory R. Mitchell';
export const PERSON_SHORT = 'Gregory Mitchell';
export const SITE_DESCRIPTION =
	'Fullstack Software Engineer, Game Developer, Sunglasses Enthusiast';
export const THEME_COLOR = '#0e2100';
export const SITE_URL = 'https://gmitch215.dev';
export const EMAIL = 'me@gmitch215.xyz';

export const MISSION = 'Building software so people feel a little less alone.';

export interface LinkItem {
	name: string;
	url: string;
	icon?: string;
	external?: boolean;
}

export const NAV_LINKS: LinkItem[] = [
	{ name: 'Story', url: '/', icon: 'i-lucide-sparkles' },
	{ name: 'Projects', url: '/projects', icon: 'i-lucide-folder-git-2' },
	{ name: 'CV', url: '/cv', icon: 'i-lucide-file-text' },
	{ name: 'Blog', url: 'https://gmitch215.blog', icon: 'i-lucide-pen-line', external: true },
	{ name: 'About', url: '/about', icon: 'i-lucide-user' },
	{ name: 'Support', url: '/support', icon: 'i-lucide-heart' }
];

export const SOCIALS: LinkItem[] = [
	{ name: 'GitHub', icon: 'uil:github', url: 'https://github.com/gmitch215' },
	{ name: 'LinkedIn', icon: 'uil:linkedin', url: 'https://www.linkedin.com/in/gmitch215' },
	{ name: 'Instagram', icon: 'uil:instagram', url: 'https://instagram.com/gmitch215' },
	{
		name: 'Discord',
		icon: 'ic:baseline-discord',
		url: 'https://discord.com/users/572173428086538270'
	},
	{ name: 'Twitter', icon: 'uil:twitter', url: 'https://x.com/gmitch215' }
];

export interface SupportItem extends LinkItem {
	blurb: string;
	color: string;
}

export const SUPPORT_LINKS: SupportItem[] = [
	{
		name: 'GitHub Sponsors',
		url: 'https://github.com/sponsors/gmitch215',
		icon: 'uil:github',
		color: '#db61a2',
		blurb: 'Recurring or one-time, right where the open-source work lives.'
	},
	{
		name: 'Patreon',
		url: 'https://www.patreon.com/gmitch215',
		icon: 'logos:patreon',
		color: '#ff424d',
		blurb: 'Back the mission monthly and follow the build in progress.'
	},
	{
		name: 'Buy Me a Coffee',
		url: 'https://www.buymeacoffee.com/gmitch215',
		icon: 'cib:buy-me-a-coffee',
		color: '#ffdd00',
		blurb: 'The quick, no-strings way to say thanks.'
	}
];
