<template>
	<div
		v-if="loading"
		class="text-dimmed text-sm"
	>
		Loading from GitHub...
	</div>
	<p
		v-else-if="!html"
		class="text-dimmed text-sm"
	>
		No preview available.
	</p>
	<div
		v-else
		ref="body"
		class="project-doc prose prose-sm dark:prose-invert max-w-none"
		@click="onClick"
		v-html="html"
	/>
</template>

<script setup lang="ts">
const props = defineProps<{ repo: string; file: string }>();

const { fetchDoc } = useGitHub();
const html = ref('');
const loading = ref(true);
const body = ref<HTMLElement | null>(null);

const slug = (text: string) =>
	text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-');

const ALERTS = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i;

function resolve(url: string, base: string) {
	try {
		return new URL(url, base).href;
	} catch {
		return url;
	}
}

async function render(md: string) {
	const [{ marked }, { default: DOMPurify }] = await Promise.all([
		import('marked'),
		import('dompurify')
	]);
	const dir = props.file.includes('/') ? props.file.slice(0, props.file.lastIndexOf('/') + 1) : '';
	const rawBase = `https://raw.githubusercontent.com/${props.repo}/HEAD/${dir}`;
	const blobBase = `https://github.com/${props.repo}/blob/HEAD/${dir}`;

	const dirty = await marked.parse(md, { gfm: true });
	const doc = new DOMParser().parseFromString(
		DOMPurify.sanitize(dirty, { FORBID_ATTR: ['style'], FORBID_TAGS: ['style', 'form'] }),
		'text/html'
	);

	doc.querySelectorAll('img').forEach((img) => {
		const src = img.getAttribute('src');
		if (src) img.setAttribute('src', resolve(src, rawBase));
		img.setAttribute('loading', 'lazy');
	});
	doc.querySelectorAll('source').forEach((s) => {
		const set = s.getAttribute('srcset');
		if (set) s.setAttribute('srcset', resolve(set.split(/\s+/)[0]!, rawBase));
	});
	doc.querySelectorAll('a').forEach((a) => {
		const href = a.getAttribute('href');
		if (!href || href.startsWith('#')) return;
		a.setAttribute('href', resolve(href, blobBase));
		a.setAttribute('target', '_blank');
		a.setAttribute('rel', 'noopener noreferrer');
	});
	doc.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => {
		h.id = slug(h.textContent ?? '');
	});
	doc.querySelectorAll('blockquote > p:first-child').forEach((p) => {
		const m = p.textContent?.match(ALERTS);
		if (!m) return;
		const label = m[1]![0] + m[1]!.slice(1).toLowerCase();
		p.innerHTML = `<strong>${label}</strong><br>${p.innerHTML.replace(ALERTS, '')}`;
	});
	return doc.body.innerHTML;
}

function onClick(e: MouseEvent) {
	const a = (e.target as HTMLElement).closest('a');
	const href = a?.getAttribute('href');
	if (!href?.startsWith('#')) return;
	e.preventDefault();
	body.value?.querySelector(`[id="${CSS.escape(href.slice(1))}"]`)?.scrollIntoView();
}

watch(
	() => [props.repo, props.file],
	async () => {
		loading.value = true;
		const md = await fetchDoc(props.repo, props.file);
		html.value = md ? await render(md) : '';
		loading.value = false;
	},
	{ immediate: true }
);
</script>

<style>
.project-doc img {
	display: inline;
	margin: 0;
}
.project-doc [align='center'] {
	text-align: center;
}
.project-doc pre {
	overflow-x: auto;
}
.project-doc table {
	display: block;
	overflow-x: auto;
}
</style>
