export interface Era {
	year: number;
	commits: number;
	era: string;
	headline: string;
	flagship?: { name: string; stars?: number };
	annualized?: number;
}

export const ERAS: Era[] = [
	{ year: 2019, commits: 86, era: 'Origin', headline: 'First real code, age 11' },
	{ year: 2020, commits: 38, era: 'Off-GitHub', headline: 'The Replit Discord-bot era' },
	{ year: 2021, commits: 352, era: 'Beginnings', headline: 'The Minecraft awakening' },
	{
		year: 2022,
		commits: 1839,
		era: 'Craftsman',
		headline: 'Gradle, NMS abstraction, the Big 4',
		flagship: { name: 'MobChip', stars: 88 }
	},
	{
		year: 2023,
		commits: 1912,
		era: 'Toolmaker',
		headline: 'Tools that build tools, and the rebrand',
		flagship: { name: 'InceptusNMS', stars: 5 }
	},
	{
		year: 2024,
		commits: 1805,
		era: 'Breadth',
		headline: 'Ten languages, five registries',
		flagship: { name: 'benchmarks', stars: 6 }
	},
	{
		year: 2025,
		commits: 2123,
		era: 'Architect',
		headline: 'cmdfx, teaching, and the mission',
		flagship: { name: 'cmdfx', stars: 15 }
	},
	{
		year: 2026,
		commits: 3336,
		era: 'Force-Multiplier',
		headline: 'Building the layer beneath AI',
		annualized: 5700,
		flagship: { name: 'edgeport', stars: 2 }
	}
];

export const TOTAL_COMMITS = ERAS.reduce((sum, e) => sum + e.commits, 0);

export interface Language {
	name: string;
	icon: string;
	pct?: number;
	note?: string;
}

export const LANGUAGES: Language[] = [
	{ name: 'Java', icon: 'logos:java', pct: 28 },
	{ name: 'Kotlin', icon: 'logos:kotlin-icon', pct: 18 },
	{ name: 'TypeScript', icon: 'logos:typescript-icon', pct: 10 },
	{ name: 'Vue', icon: 'logos:vue', note: 'The Earth App frontends' },
	{ name: 'PHP', icon: 'logos:php', note: 'Drupal backend + the family trade' },
	{ name: 'C', icon: 'logos:c', note: 'cmdfx, hand-written low-level' },
	{ name: 'C++', icon: 'logos:c-plusplus', note: 'PendulumFX, Terminal Miner' },
	{ name: 'JavaScript', icon: 'logos:javascript', note: 'the first language' },
	{ name: 'Python', icon: 'logos:python', note: 'doc2lora, LevelZ bindings' },
	{ name: 'Rust', icon: 'logos:rust', note: 'systems experiments' }
];

export interface Stat {
	value: number;
	suffix?: string;
	prefix?: string;
	label: string;
	footnote?: string;
}

export const STATS: Stat[] = [
	{
		value: TOTAL_COMMITS,
		label: 'Commits Since 2019',
		footnote: 'volume and consistency; not every day was deep work, and I am the first to say so'
	},
	{
		value: 88,
		suffix: '★',
		label: 'Stars on My Top Library',
		footnote: 'MobChip, later adopted by another maintainer'
	},
	{ value: 10, suffix: '+', label: 'Languages Shipped in Production' },
	{
		value: 5,
		label: 'Package Registries Published To',
		footnote: 'Maven Central, Gradle Portal, npm, PyPI, Homebrew'
	},
	{ value: 8, suffix: ' yrs', label: 'Building in Public' }
];

export const REGISTRIES = ['Maven Central', 'Gradle Plugin Portal', 'npm', 'PyPI', 'Homebrew'];
