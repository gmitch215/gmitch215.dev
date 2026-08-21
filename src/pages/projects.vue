<template>
	<div class="page-atmos min-h-screen">
		<div class="mx-auto max-w-6xl px-6 py-16">
			<ScrollReveal>
				<h1 class="font-display text-3xl font-black sm:text-5xl">
					<span class="text-gradient-brand">Projects</span>
				</h1>
				<p class="text-muted mt-3 max-w-2xl">
					Libraries, tools, and products I have shipped across the JVM, native C, and the edge, from
					Minecraft internals to a PHP interpreter compiled to WebAssembly. Star counts and metadata
					are live from GitHub. Tap any project for the details.
				</p>
			</ScrollReveal>

			<div class="mt-8 flex flex-wrap gap-2">
				<UButton
					v-for="c in categories"
					:key="c"
					size="sm"
					:color="active === c ? 'primary' : 'neutral'"
					:variant="active === c ? 'solid' : 'outline'"
					@click="active = c"
				>
					{{ c }}
				</UButton>
			</div>

			<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<button
					v-for="p in filtered"
					:key="p.id ?? (p.name as string)"
					type="button"
					class="group bg-default flex flex-col rounded-2xl border p-5 text-left transition-colors"
					:class="
						p.featured
							? 'border-primary/40 hover:border-primary'
							: 'border-default hover:border-primary/60'
					"
					@click="openProject(p)"
				>
					<div class="flex items-start justify-between gap-2">
						<h2 class="font-display text-highlighted font-semibold">{{ p.name }}</h2>
						<div class="text-muted flex shrink-0 items-center gap-3 font-mono text-sm">
							<span
								v-if="fmtDownloads(spigetOf(p)?.downloads)"
								class="inline-flex items-center gap-1"
								title="SpigotMC downloads"
							>
								<UIcon
									name="i-lucide-download"
									class="text-primary size-3.5"
								/>
								{{ fmtDownloads(spigetOf(p)?.downloads) }}
							</span>
							<span
								v-if="starsOf(p)"
								class="inline-flex items-center gap-1"
							>
								<UIcon
									name="i-lucide-star"
									class="text-primary size-3.5"
								/>
								{{ starsOf(p) }}
							</span>
						</div>
					</div>

					<div class="text-muted mt-2 flex-1 text-sm">
						<ContentRenderer
							:value="p"
							class="line-clamp-3"
						/>
					</div>

					<div class="mt-4 flex flex-wrap items-center gap-1.5">
						<span
							v-for="l in p.languages as string[]"
							:key="l"
							class="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium"
							:style="badgeStyle(l)"
						>
							<span
								class="size-1.5 rounded-full"
								:style="{ backgroundColor: languageColor(l) }"
							/>
							{{ l }}
						</span>
						<UBadge
							v-if="p.archived"
							color="neutral"
							variant="subtle"
							size="sm"
							class="ml-auto"
							>Archived</UBadge
						>
					</div>
				</button>
			</div>

			<Upstream class="mt-20" />
		</div>

		<UModal
			v-model:open="open"
			:title="(selected?.name as string) ?? 'Project'"
			:ui="{ content: 'sm:max-w-2xl' }"
		>
			<template #body>
				<div
					v-if="selected"
					class="space-y-4"
				>
					<div class="text-muted flex flex-wrap items-center gap-4 text-sm">
						<span
							v-if="meta?.stars ?? selected.stars"
							class="inline-flex items-center gap-1 font-mono"
						>
							<UIcon
								name="i-lucide-star"
								class="text-primary size-4"
							/>
							{{ meta?.stars ?? selected.stars }}
						</span>
						<span
							v-if="meta?.forks"
							class="inline-flex items-center gap-1 font-mono"
						>
							<UIcon
								name="i-lucide-git-fork"
								class="size-4"
							/>
							{{ meta.forks }}
						</span>
						<span
							v-if="selected.period"
							class="font-mono"
							>{{ selected.period }}</span
						>
					</div>

					<p
						v-if="meta?.description"
						class="text-toned"
					>
						{{ meta.description }}
					</p>

					<div class="flex flex-wrap gap-1.5">
						<span
							v-for="l in selected.languages as string[]"
							:key="l"
							class="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium"
							:style="badgeStyle(l)"
						>
							<span
								class="size-1.5 rounded-full"
								:style="{ backgroundColor: languageColor(l) }"
							/>
							{{ l }}
						</span>
						<UBadge
							v-for="t in meta?.topics?.slice(0, 6)"
							:key="t"
							color="neutral"
							variant="soft"
							size="sm"
							>{{ t }}</UBadge
						>
					</div>

					<div
						v-if="spig"
						class="border-default rounded-lg border p-3"
					>
						<p
							class="text-muted mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase"
						>
							<UIcon
								name="i-lucide-package"
								class="size-3.5"
							/>
							SpigotMC
						</p>
						<div class="text-muted flex flex-wrap items-center gap-4 font-mono text-sm">
							<span class="inline-flex items-center gap-1">
								<UIcon
									name="i-lucide-download"
									class="text-primary size-4"
								/>
								{{ spig.downloads.toLocaleString('en-US') }}
							</span>
							<span
								v-if="spig.count"
								class="inline-flex items-center gap-1"
							>
								<UIcon
									name="i-lucide-star"
									class="text-primary size-4"
								/>
								{{ spig.average }}/5
								<span class="text-dimmed">({{ spig.count }})</span>
							</span>
							<span
								v-if="spig.vFirst"
								class="text-dimmed text-xs"
								>MC {{ spig.vFirst
								}}{{ spig.vLast && spig.vLast !== spig.vFirst ? `-${spig.vLast}` : '' }}</span
							>
						</div>
						<blockquote
							v-if="spig.review?.message"
							class="text-muted border-primary/40 mt-3 border-l-2 pl-3 text-sm italic"
						>
							"{{ spig.review.message }}"
						</blockquote>
						<UButton
							:to="`https://www.spigotmc.org/resources/${selected.spiget}`"
							target="_blank"
							rel="noopener noreferrer"
							color="neutral"
							variant="link"
							size="xs"
							class="mt-1 px-0"
							>View on SpigotMC</UButton
						>
					</div>

					<div class="border-default border-t pt-3">
						<p
							class="text-muted mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase"
						>
							<UIcon
								name="i-lucide-book-open"
								class="size-3.5"
							/>
							README
						</p>
						<div
							v-if="readmeLoading"
							class="text-dimmed text-sm"
						>
							Loading from GitHub...
						</div>
						<p
							v-else-if="readme"
							class="text-muted bg-muted/40 max-h-64 overflow-y-auto rounded-lg p-3 text-sm leading-relaxed whitespace-pre-line"
						>
							{{ readme }}
						</p>
						<p
							v-else
							class="text-dimmed text-sm"
						>
							No README preview available.
						</p>
					</div>

					<div class="flex flex-wrap gap-2 pt-1">
						<UButton
							:to="selected.url as string"
							target="_blank"
							rel="noopener noreferrer"
							color="primary"
							icon="i-lucide-arrow-up-right"
							>View on GitHub</UButton
						>
						<UButton
							v-if="meta?.homepage"
							:to="meta.homepage"
							target="_blank"
							rel="noopener noreferrer"
							color="neutral"
							variant="outline"
							icon="i-lucide-globe"
							>Website</UButton
						>
					</div>
				</div>
			</template>
		</UModal>
	</div>
</template>

<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () =>
	queryCollection('projects').order('order', 'ASC').all()
);

const gh = useGitHub();
const spiget = useSpiget();
onMounted(() => {
	gh.load();
	spiget.load();
});
const starsOf = (p: Record<string, unknown>) =>
	gh.starsFor(p.repo as string | undefined, p.stars as number | undefined);
const spigetOf = (p: Record<string, unknown>) => spiget.spigetFor(p.spiget as number | undefined);
const fmtDownloads = (n?: number) =>
	n == null ? '' : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;

const badgeStyle = (l: string) => ({
	color: languageColor(l),
	borderColor: `${languageColor(l)}66`,
	backgroundColor: `${languageColor(l)}14`
});

const catsOf = (p: Record<string, unknown>): string[] => {
	const c = p.categories as string[] | undefined;
	if (c && c.length) return c;
	return p.category ? [p.category as string] : [];
};

const categories = computed(() => {
	const set = new Set<string>();
	for (const p of projects.value ?? []) for (const c of catsOf(p)) set.add(c);
	return ['All', ...Array.from(set).sort()];
});

const active = ref('All');
const filtered = computed(() =>
	(projects.value ?? []).filter((p) => active.value === 'All' || catsOf(p).includes(active.value))
);

const open = ref(false);
const selected = ref<Record<string, unknown> | null>(null);
const readme = ref('');
const readmeLoading = ref(false);
const meta = computed(() => gh.metaFor(selected.value?.repo as string | undefined));
const spig = computed(() => spiget.spigetFor(selected.value?.spiget as number | undefined));

function cleanReadme(md: string): string {
	return md
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/<[^>]+>/g, '')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/^[>#*_`\-|]+/gm, '')
		.replace(/`/g, '')
		.replace(/\n{3,}/g, '\n\n')
		.trim()
		.slice(0, 1200);
}

async function openProject(p: Record<string, unknown>) {
	selected.value = p;
	open.value = true;
	readme.value = '';
	const repo = p.repo as string | undefined;
	if (!repo) return;
	readmeLoading.value = true;
	const md = await gh.fetchReadme(repo);
	readme.value = md ? cleanReadme(md) : '';
	readmeLoading.value = false;
}

useSeoMeta({
	title: 'Projects',
	description:
		'A galaxy of shipped work: libraries, tools, and products across the JVM, native C, and the edge. From MobChip (88 stars) to CollegeDB, edgeport, and Drupal on Cloudflare Workers.'
});
</script>
