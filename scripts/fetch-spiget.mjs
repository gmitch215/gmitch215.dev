import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const UA = 'gmitch215.dev-portfolio';
const AUTHOR = 1229877;
const OUT = new URL('../src/data/spiget.json', import.meta.url).pathname;

async function j(url) {
	const r = await fetch(url, { headers: { 'User-Agent': UA } });
	if (!r.ok) throw new Error(`${r.status} ${url}`);
	return r.json();
}
function decode(b64) {
	try {
		return Buffer.from(b64, 'base64')
			.toString('utf8')
			.replace(/<[^>]+>/g, '')
			.replace(/&quot;/g, '"')
			.replace(/&amp;/g, '&')
			.replace(/&#?\w+;/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();
	} catch {
		return '';
	}
}

const out = {};
try {
	const res = await j(
		`https://api.spiget.org/v2/authors/${AUTHOR}/resources?size=100&fields=id,name,tag,downloads,rating,testedVersions,premium`
	);
	for (const r of res) {
		let review = null;
		try {
			const rv = await j(`https://api.spiget.org/v2/resources/${r.id}/reviews?size=1&sort=-rating`);
			if (rv[0]?.message)
				review = {
					message: decode(rv[0].message).slice(0, 240),
					rating: rv[0].rating?.average ?? 0
				};
		} catch {
			/* no reviews */
		}
		const tv = r.testedVersions || [];
		out[r.id] = {
			name: r.name,
			downloads: r.downloads ?? 0,
			average: r.rating?.average ?? 0,
			count: r.rating?.count ?? 0,
			vFirst: tv[0] ?? '',
			vLast: tv[tv.length - 1] ?? '',
			premium: !!r.premium,
			review
		};
	}
	writeFileSync(OUT, JSON.stringify(out, null, 2));
	console.log(`wrote ${Object.keys(out).length} spiget resources -> ${OUT}`);
} catch (e) {
	console.warn(`[fetch-spiget] failed (${e.message}); keeping existing spiget.json`);
	if (!existsSync(OUT)) writeFileSync(OUT, '{}');
	else JSON.parse(readFileSync(OUT, 'utf8'));
}
