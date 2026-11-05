import bakedDownloads from '~/data/downloads.json';
import bakedNpm from '~/data/npm.json';

const baked = bakedDownloads as Record<string, number>;
const npm = bakedNpm as Record<string, number>;

export interface Downloads {
	github: number;
	spigot: number;
	npm: number;
	total: number;
}

/**
 * Distribution counts merged across the channels a project can ship through:
 * GitHub release assets and npm (both baked at build time) and SpigotMC (live, via useSpiget).
 * Each channel serves different installs, so the counts are additive.
 */
export function useDownloads() {
	const { spigetFor, totals: spigetTotals } = useSpiget();

	function githubFor(repo?: string) {
		return repo ? (baked[repo] ?? 0) : 0;
	}

	function npmFor(repo?: string) {
		return repo ? (npm[repo.toLowerCase()] ?? 0) : 0;
	}

	function downloadsFor(project?: { repo?: string; spiget?: number }): Downloads | undefined {
		if (!project) return undefined;
		const github = githubFor(project.repo);
		const npmCount = npmFor(project.repo);
		const spigot = spigetFor(project.spiget)?.downloads ?? 0;
		const total = github + npmCount + spigot;
		if (!total) return undefined;
		return { github, spigot, npm: npmCount, total };
	}

	const totals = computed<Downloads & { repos: number }>(() => {
		const github = Object.values(baked).reduce((sum, n) => sum + n, 0);
		const npmTotal = Object.values(npm).reduce((sum, n) => sum + n, 0);
		const spigot = spigetTotals().downloads;
		return {
			github,
			spigot,
			npm: npmTotal,
			total: github + spigot + npmTotal,
			repos: Object.keys(baked).length
		};
	});

	return { downloadsFor, githubFor, npmFor, totals };
}
