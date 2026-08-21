import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'src', 'data', 'stars.json');

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
	'drupflare/phasm',
	'drupflare/durabledb',
	'earth-app/recess',
	'earth-app/smoke',
	'earth-app/strata'
];

const token = process.env.GITHUB_TOKEN;

function loadExisting() {
	if (!existsSync(OUT_FILE)) return {};
	try {
		return JSON.parse(readFileSync(OUT_FILE, 'utf8'));
	} catch {
		return {};
	}
}

async function fetchStars(repo) {
	const headers = {
		Accept: 'application/vnd.github+json',
		'User-Agent': 'gmitch215.dev'
	};
	if (token) headers.Authorization = `Bearer ${token}`;

	const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
	if (!res.ok) throw new Error(`HTTP ${res.status} for ${repo}`);

	const data = await res.json();
	if (typeof data.stargazers_count !== 'number') throw new Error(`no stargazers_count for ${repo}`);

	return data.stargazers_count;
}

async function main() {
	const stars = loadExisting();

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

	// sort keys for stable output
	const sorted = {};
	for (const key of Object.keys(stars).sort()) sorted[key] = stars[key];

	mkdirSync(dirname(OUT_FILE), { recursive: true });
	writeFileSync(OUT_FILE, JSON.stringify(sorted, null, 2) + '\n');
	console.log(`wrote ${Object.keys(sorted).length} repos to ${OUT_FILE}`);
}

main().catch((err) => {
	// never block a CI build
	console.warn(`warning: fetch-stars failed: ${err?.message ?? err}`);
	process.exit(0);
});
