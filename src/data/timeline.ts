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
	{ year: 2021, commits: 363, era: 'Beginnings', headline: 'The Minecraft awakening' },
	{
		year: 2022,
		commits: 1849,
		era: 'Craftsman',
		headline: 'Gradle, NMS abstraction, the Big 4',
		flagship: { name: 'MobChip', stars: 88 }
	},
	{
		year: 2023,
		commits: 1869,
		era: 'Toolmaker',
		headline: 'Tools that build tools, and the rebrand',
		flagship: { name: 'InceptusNMS', stars: 5 }
	},
	{
		year: 2024,
		commits: 2127,
		era: 'Breadth',
		headline: 'Ten languages, five registries',
		flagship: { name: 'benchmarks', stars: 6 }
	},
	{
		year: 2025,
		commits: 2184,
		era: 'Architect',
		headline: 'cmdfx, teaching, and the mission',
		flagship: { name: 'cmdfx', stars: 16 }
	},
	{
		year: 2026,
		commits: 4810,
		era: 'Force-Multiplier',
		headline: 'The layer beneath AI, and Drupal on the edge',
		annualized: 7570,
		flagship: { name: 'phasm', stars: 1 }
	}
];

export const TOTAL_COMMITS = ERAS.reduce((sum, e) => sum + e.commits, 0);

// 2026 is a partial year; every figure above was recounted by script on this date
export const CENSUS_DATE = 'August 20, 2026';
export const CENSUS_MONTHS = 8;
export const REPOS_COUNTED = 82;
export const CONTRIBUTIONS_12MO = 6755;

// participation in other people's projects; GitHub API reads on the census date
export const ECOSYSTEM = {
	upstreamPRs: 29,
	upstreamOrgs: 19,
	upstreamIssues: 91,
	upstreamProjects: 45,
	firstUpstreamAge: 12,
	inboundIssues: 95,
	strangerIssues: 69,
	inboundPRs: 22,
	inboundPRsMerged: 19
};

export interface Upstream {
	repo: string;
	url: string;
	what: string;
	year: string;
}

// merged patches into repositories he does not own
export const UPSTREAM: Upstream[] = [
	{
		repo: 'raysan5/raylib',
		url: 'https://github.com/raysan5/raylib/pull/5397',
		what: 'Fixed SHA-1 computation for messages longer than 31 bytes',
		year: '2025'
	},
	{
		repo: 'actions/setup-java',
		url: 'https://github.com/actions/setup-java/pull/637',
		what: 'Added support for the JetBrains Runtime',
		year: '2024'
	},
	{
		repo: 'doxygen/doxygen',
		url: 'https://github.com/doxygen/doxygen/pull/11468',
		what: 'Added Linux ARM to CI',
		year: '2025'
	},
	{
		repo: 'SchemaStore/schemastore',
		url: 'https://github.com/SchemaStore/schemastore/pull/2982',
		what: 'Added the paper-plugin.yml schema',
		year: '2023'
	},
	{
		repo: 'speechanddebate/tabroom',
		url: 'https://github.com/speechanddebate/tabroom/pull/54',
		what: 'Linked tournament names to their information page',
		year: '2025'
	},
	{
		repo: 'mfnalex/Spigot-UpdateChecker',
		url: 'https://github.com/mfnalex/Spigot-UpdateChecker/pull/31',
		what: 'Added HangarMC support',
		year: '2023'
	},
	{
		repo: 'js-org/js.org',
		url: 'https://github.com/js-org/js.org/pull/6360',
		what: 'Two domain registrations',
		year: '2021'
	}
];

// the pre-AI control sample: everything below predates agentic tooling (adopted 2026)
export const PRE_AI = {
	minecraftCommits: 4345,
	minecraftRepos: 18,
	throughEnd2024: 6332,
	spigotJoined: 'March 2021',
	lastMinecraftCommit: 'June 2024'
};

export interface Language {
	name: string;
	icon: string;
	pct?: number;
	recent?: number;
	hours?: number;
	note?: string;
}

// all-time percentages and hours are live WakaTime reads; recent = trailing twelve months
export const LANGUAGES: Language[] = [
	{ name: 'Java', icon: 'logos:java', pct: 27, hours: 1246 },
	{ name: 'Kotlin', icon: 'logos:kotlin-icon', pct: 17.5, hours: 806, recent: 7.1 },
	{ name: 'TypeScript', icon: 'logos:typescript-icon', pct: 11.4, hours: 527, recent: 30.5 },
	{ name: 'Vue', icon: 'logos:vue', pct: 6.5, hours: 297, recent: 20.2 },
	{ name: 'PHP', icon: 'logos:php', pct: 3.2, hours: 149, recent: 11.3 },
	{ name: 'C', icon: 'logos:c', pct: 2.6, hours: 118, recent: 0.7 },
	{ name: 'C++', icon: 'logos:c-plusplus', note: 'PendulumFX, Terminal Miner' },
	{ name: 'JavaScript', icon: 'logos:javascript', note: 'the first language' },
	{ name: 'Python', icon: 'logos:python', note: 'doc2lora, LevelZ bindings' },
	{ name: 'Rust', icon: 'logos:rust', note: 'systems experiments' }
];

export const WAKATIME = {
	since: 'February 2022',
	totalHours: 4134,
	dailyAverage: '2 hrs 46 mins',
	recentHours: 1294,
	recentDailyAverage: '3 hrs 49 mins'
};

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
	{
		value: WAKATIME.totalHours,
		suffix: '+ hrs',
		label: 'Measured Editor Time',
		footnote: `tracked by WakaTime since ${WAKATIME.since}, not self-reported`
	},
	{
		value: ECOSYSTEM.upstreamPRs,
		label: 'Upstream Pull Requests',
		footnote: `into ${ECOSYSTEM.upstreamOrgs} organizations I do not own, the first at age ${ECOSYSTEM.firstUpstreamAge}`
	}
];

export const REGISTRIES = ['Maven Central', 'Gradle Plugin Portal', 'npm', 'PyPI', 'Homebrew'];
