import bakedSpiget from '~/data/spiget.json';

const AUTHOR = 1229877;
const CACHE_KEY = 'gm-spiget-v1';
const TTL = 6 * 3600 * 1000;

export interface SpigetInfo {
	name?: string;
	downloads: number;
	average: number;
	count: number;
	vFirst: string;
	vLast: string;
	premium: boolean;
	review?: { message: string; rating: number } | null;
}

const baked = bakedSpiget as Record<string, SpigetInfo>;

export function useSpiget() {
	const live = useState<Record<string, Partial<SpigetInfo>>>('spiget', () => ({}));
	const loaded = useState<boolean>('spiget-loaded', () => false);

	async function load() {
		if (!import.meta.client || loaded.value) return;
		loaded.value = true;
		try {
			const raw = localStorage.getItem(CACHE_KEY);
			if (raw) {
				const { t, data } = JSON.parse(raw);
				live.value = data;
				if (Date.now() - t < TTL) return;
			}
		} catch {
			/* ignore */
		}
		try {
			const res = await fetch(
				`https://api.spiget.org/v2/authors/${AUTHOR}/resources?size=100&fields=id,name,downloads,rating,testedVersions,premium`
			).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
			const map: Record<string, Partial<SpigetInfo>> = {};
			for (const r of res) {
				const tv: string[] = r.testedVersions || [];
				map[r.id] = {
					downloads: r.downloads ?? 0,
					average: r.rating?.average ?? 0,
					count: r.rating?.count ?? 0,
					vFirst: tv[0] ?? '',
					vLast: tv[tv.length - 1] ?? '',
					premium: !!r.premium
				};
			}
			if (Object.keys(map).length) {
				live.value = map;
				try {
					localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data: map }));
				} catch {
					/* ignore */
				}
			}
		} catch {
			/* rate-limited or offline: baked values stand */
		}
	}

	function spigetFor(id?: number): SpigetInfo | undefined {
		if (id == null) return undefined;
		const b = baked[id];
		const l = live.value[id];
		if (!b && !l) return undefined;
		return { ...(b ?? ({} as SpigetInfo)), ...(l ?? {}) };
	}

	// aggregate across every resource, so the numbers never need hand-updating
	function totals() {
		const ids = new Set([...Object.keys(baked), ...Object.keys(live.value)]);
		let downloads = 0;
		let reviews = 0;
		let weighted = 0;
		for (const id of ids) {
			const r = spigetFor(Number(id));
			if (!r) continue;
			downloads += r.downloads || 0;
			reviews += r.count || 0;
			weighted += (r.average || 0) * (r.count || 0);
		}
		return {
			resources: ids.size,
			downloads,
			reviews,
			average: reviews ? Math.round((weighted / reviews) * 100) / 100 : 0
		};
	}

	return { load, spigetFor, totals };
}
