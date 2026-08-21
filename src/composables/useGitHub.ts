import fallbackStars from '~/data/stars.json';

const baked = fallbackStars as Record<string, number>;
const SOURCES = [
	'users/gmitch215',
	'orgs/earth-app',
	'orgs/Team-Inceptus',
	'orgs/CalculusGames',
	'orgs/brightplum',
	'orgs/CodeMC',
	'orgs/LevelZ-File',
	'orgs/drupflare'
];
const CACHE_KEY = 'gm-gh-v1';
const TTL = 6 * 3600 * 1000;

export interface RepoMeta {
	stars: number;
	forks: number;
	watchers: number;
	description: string;
	language: string | null;
	topics: string[];
	pushedAt: string;
	homepage: string | null;
}

export function useGitHub() {
	const repos = useState<Record<string, RepoMeta>>('gh-repos', () => ({}));
	const loaded = useState<boolean>('gh-loaded', () => false);

	function readCache(): { t: number; data: Record<string, RepoMeta> } | null {
		try {
			const raw = localStorage.getItem(CACHE_KEY);
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	}
	function writeCache(data: Record<string, RepoMeta>) {
		try {
			localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }));
		} catch {
			/* storage full or unavailable */
		}
	}

	async function load() {
		if (!import.meta.client || loaded.value) return;
		loaded.value = true;
		const cached = readCache();
		if (cached?.data) {
			repos.value = cached.data;
			if (Date.now() - cached.t < TTL) return;
		}
		try {
			const res = await Promise.allSettled(
				SOURCES.map((s) =>
					fetch(`https://api.github.com/${s}/repos?per_page=100&type=public&sort=updated`, {
						headers: { Accept: 'application/vnd.github+json' }
					}).then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
				)
			);
			const map: Record<string, RepoMeta> = {};
			for (const r of res) {
				if (r.status === 'fulfilled' && Array.isArray(r.value)) {
					for (const repo of r.value) {
						if (!repo?.full_name) continue;
						map[repo.full_name.toLowerCase()] = {
							stars: repo.stargazers_count ?? 0,
							forks: repo.forks_count ?? 0,
							watchers: repo.subscribers_count ?? repo.watchers_count ?? 0,
							description: repo.description ?? '',
							language: repo.language ?? null,
							topics: repo.topics ?? [],
							pushedAt: repo.pushed_at ?? '',
							homepage: repo.homepage ?? null
						};
					}
				}
			}
			if (Object.keys(map).length) {
				repos.value = map;
				writeCache(map);
			}
		} catch {
			/* rate-limited or offline: keep cached/baked values */
		}
	}

	function starsFor(repo?: string, bakedValue?: number): number | undefined {
		if (repo) {
			const key = repo.toLowerCase();
			if (repos.value[key]) return repos.value[key].stars;
			const short = key.split('/')[1];
			if (short && baked[short] != null) return baked[short];
		}
		return bakedValue;
	}
	function metaFor(repo?: string): RepoMeta | undefined {
		return repo ? repos.value[repo.toLowerCase()] : undefined;
	}
	async function fetchReadme(repo: string): Promise<string> {
		const key = `gm-gh-readme:${repo.toLowerCase()}`;
		try {
			const c = localStorage.getItem(key);
			if (c) {
				const { t, md } = JSON.parse(c);
				if (Date.now() - t < TTL) return md;
			}
		} catch {
			/* ignore */
		}
		try {
			const r = await fetch(`https://api.github.com/repos/${repo}/readme`, {
				headers: { Accept: 'application/vnd.github.raw' }
			});
			if (!r.ok) return '';
			const md = await r.text();
			try {
				localStorage.setItem(key, JSON.stringify({ t: Date.now(), md }));
			} catch {
				/* ignore */
			}
			return md;
		} catch {
			return '';
		}
	}

	const topStars = computed(
		() => Object.values(repos.value).reduce((m, r) => Math.max(m, r.stars), 0) || undefined
	);
	const totalStars = computed(
		() => Object.values(repos.value).reduce((s, r) => s + r.stars, 0) || undefined
	);

	return { load, starsFor, metaFor, fetchReadme, repos, topStars, totalStars };
}
