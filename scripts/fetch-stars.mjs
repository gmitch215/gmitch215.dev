import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'src', 'data', 'stars.json');
const DOWNLOADS_FILE = join(__dirname, '..', 'src', 'data', 'downloads.json');

// curated repos as owner/name
const REPOS = [
	'gmitch215/MobChip',
	'earth-app/CollegeDB',
	'gmitch215/cmdfx',
	'Team-Inceptus/Novaconomy',
	'gmitch215/SocketMC',
	'gmitch215/StarCosmetics',
	'gmitch215/MyMCP',
	'gmitch215/KotlinMC',
	'gmitch215/benchmarks',
	'Team-Inceptus/InceptusNMS',
	'gmitch215/nuxtpress',
	'gmitch215/BattleCards',
	'CalculusGames/Kray',
	'gmitch215/edgeport',
	'gmitch215/gitle',
	'gmitch215/TabroomAPI',
	'gmitch215/kasciffy',
	'gmitch215/SuperAdvancements',
	'gmitch215/Terminal-Miner',
	'gmitch215/MyLoRA',
	'earth-app/doc2lora',
	'gmitch215/QuantumPen',
	'brightplum/nodejs-notebook',
	'Team-Inceptus/PlasmaEnchants',
	'CodeMC/API',
	'drupflare/worker',
	'drupflare/drupflare',
	'drupflare/rom',
	'drupflare/cartridge',
	'drupflare/phasm',
	'drupflare/durabledb',
	'earth-app/recess',
	'earth-app/smoke',
	'earth-app/strata',
	'earth-app/moho',
	'gmitch215/bytebox',
	'gmitch215/tinyimg',
	'gmitch215/gmux',
	'drupflare/burrow',
	'drupflare/bastion',
	'drupflare/workforce',
	'drupflare/drangler',
	'gmitch215/SuperAdvancements'
];

const token = process.env.GITHUB_TOKEN;

function loadExisting(file) {
	if (!existsSync(file)) return {};
	try {
		return JSON.parse(readFileSync(file, 'utf8'));
	} catch {
		return {};
	}
}

function headers() {
	const h = { Accept: 'application/vnd.github+json', 'User-Agent': 'gmitch215.dev' };
	if (token) h.Authorization = `Bearer ${token}`;
	return h;
}

// release asset downloads; the binary half of distribution, alongside SpigotMC
async function fetchDownloads(repo) {
	const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`, {
		headers: headers()
	});
	if (!res.ok) throw new Error(`HTTP ${res.status} for ${repo} releases`);

	const data = await res.json();
	if (!Array.isArray(data)) throw new Error(`bad releases payload for ${repo}`);

	return data.reduce(
		(sum, rel) => sum + (rel.assets ?? []).reduce((n, a) => n + (a.download_count ?? 0), 0),
		0
	);
}

async function fetchStars(repo) {
	const res = await fetch(`https://api.github.com/repos/${repo}`, { headers: headers() });
	if (!res.ok) throw new Error(`HTTP ${res.status} for ${repo}`);

	const data = await res.json();
	if (typeof data.stargazers_count !== 'number') throw new Error(`no stargazers_count for ${repo}`);

	return data.stargazers_count;
}

async function main() {
	const stars = loadExisting(OUT_FILE);
	const downloads = loadExisting(DOWNLOADS_FILE);

	// dedupe while preserving order
	const seen = new Set();
	const repos = REPOS.filter((r) => {
		const k = r.toLowerCase();
		if (seen.has(k)) return false;
		seen.add(k);
		return true;
	});

	const results = await Promise.allSettled(repos.map((repo) => fetchStars(repo)));

	results.forEach((result, i) => {
		const repo = repos[i];
		const key = repo.split('/')[1].toLowerCase();
		if (result.status === 'fulfilled') {
			stars[key] = result.value;
		} else {
			// keep prior value if present, otherwise skip
			console.warn(
				`warning: could not fetch stars for ${repo}: ${result.reason?.message ?? result.reason}`
			);
			if (!(key in stars)) console.warn(`warning: no prior value for ${key}, omitting`);
		}
	});

	const dlResults = await Promise.allSettled(repos.map((repo) => fetchDownloads(repo)));

	dlResults.forEach((result, i) => {
		const repo = repos[i];
		if (result.status === 'fulfilled') {
			// only repos that ship assets; a zero would be noise in the merged total
			if (result.value > 0) downloads[repo] = result.value;
			else delete downloads[repo];
		} else {
			console.warn(
				`warning: could not fetch downloads for ${repo}: ${result.reason?.message ?? result.reason}`
			);
		}
	});

	writeSorted(OUT_FILE, stars, 'repos');
	writeSorted(DOWNLOADS_FILE, downloads, 'repos with release downloads');
}

function writeSorted(file, obj, label) {
	const sorted = {};
	for (const key of Object.keys(obj).sort()) sorted[key] = obj[key];
	mkdirSync(dirname(file), { recursive: true });
	writeFileSync(file, JSON.stringify(sorted, null, 2) + '\n');
	console.log(`wrote ${Object.keys(sorted).length} ${label} to ${file}`);
}

main().catch((err) => {
	// never block a CI build
	console.warn(`warning: fetch-github failed: ${err?.message ?? err}`);
	process.exit(0);
});
