import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const UA = 'gmitch215.dev-portfolio';
const OUT = new URL('../src/data/npm.json', import.meta.url).pathname;
const MAINTAINER = 'gmitch215';
const DAY = 86400000;

const REPO_FOR_PACKAGE = {
	'@earth-app/moho': 'earth-app/moho',
	'levelz-js': 'LevelZ-File',
	'super-dictionary': 'gmitch215/super-dictionary'
};

async function j(url) {
	const r = await fetch(url, { headers: { 'User-Agent': UA } });
	if (!r.ok) throw new Error(`${r.status} ${url}`);
	return r.json();
}

const day = (t) => new Date(t).toISOString().slice(0, 10);

async function totalDownloads(name) {
	const meta = await j(`https://registry.npmjs.org/${name.replace('/', '%2F')}`);
	const start = Date.parse(meta.time?.created ?? '2020-01-01');
	const end = Date.now();
	let sum = 0;
	// the point endpoint clamps any range to 18 months, so walk it in year-long windows
	for (let from = start; from < end; from += 365 * DAY) {
		const to = Math.min(from + 364 * DAY, end);
		const res = await j(
			`https://api.npmjs.org/downloads/point/${day(from)}:${day(to)}/${name.replace('/', '%2F')}`
		);
		sum += res.downloads ?? 0;
	}
	return sum;
}

function repoOf(pkg) {
	if (REPO_FOR_PACKAGE[pkg.name]) return REPO_FOR_PACKAGE[pkg.name];
	const m = String(pkg.links?.repository ?? '').match(/github\.com[/:]([^/]+\/[^/.]+)/);
	return m?.[1];
}

try {
	const search = await j(
		`https://registry.npmjs.org/-/v1/search?text=maintainer:${MAINTAINER}&size=250`
	);
	const out = {};
	for (const { package: pkg } of search.objects) {
		const repo = repoOf(pkg);
		const n = await totalDownloads(pkg.name);
		const key = repo ? repo.toLowerCase() : `npm:${pkg.name}`;
		out[key] = (out[key] ?? 0) + n;
	}
	const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
	writeFileSync(OUT, JSON.stringify(sorted, null, 2) + '\n');
	console.log(`wrote ${Object.keys(sorted).length} npm repos -> ${OUT}`);
} catch (e) {
	console.warn(`[fetch-npm] failed (${e.message}); keeping existing npm.json`);
	if (!existsSync(OUT)) writeFileSync(OUT, '{}\n');
	else JSON.parse(readFileSync(OUT, 'utf8'));
}
