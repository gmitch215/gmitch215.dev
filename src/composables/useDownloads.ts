import bakedDownloads from '~/data/downloads.json';

const baked = bakedDownloads as Record<string, number>;

export interface Downloads {
	github: number;
	spigot: number;
	total: number;
}

/**
 * Distribution counts merged across both channels a project can ship through:
 * GitHub release assets (baked at build time) and SpigotMC (live, via useSpiget).
 * A plugin published in both places is genuinely downloaded from one or the other,
 * so the two are additive.
 */
export function useDownloads() {
	const { spigetFor, totals: spigetTotals } = useSpiget();

	function githubFor(repo?: string) {
		return repo ? (baked[repo] ?? 0) : 0;
	}

	function downloadsFor(project?: { repo?: string; spiget?: number }): Downloads | undefined {
		if (!project) return undefined;
		const github = githubFor(project.repo);
		const spigot = spigetFor(project.spiget)?.downloads ?? 0;
		if (!github && !spigot) return undefined;
		return { github, spigot, total: github + spigot };
	}

	const totals = computed<Downloads & { repos: number }>(() => {
		const github = Object.values(baked).reduce((sum, n) => sum + n, 0);
		const spigot = spigetTotals().downloads;
		return { github, spigot, total: github + spigot, repos: Object.keys(baked).length };
	});

	return { downloadsFor, githubFor, totals };
}
