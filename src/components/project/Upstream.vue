<template>
	<section>
		<ScrollReveal>
			<h2 class="font-display text-2xl font-bold sm:text-3xl">
				<span class="text-gradient-brand">Upstream</span>
			</h2>
			<p class="text-muted mt-3 max-w-2xl">
				Not everything I ship lands in a repository I own.
				{{ ECOSYSTEM.upstreamPRs }} pull requests into {{ ECOSYSTEM.upstreamOrgs }} organizations
				that are not mine, {{ ECOSYSTEM.upstreamIssues }} issues filed into roughly
				{{ ECOSYSTEM.upstreamProjects }} upstream projects, and the first one merged when I was
				{{ ECOSYSTEM.firstUpstreamAge }}.
			</p>
		</ScrollReveal>

		<ScrollReveal
			:delay="100"
			class="mt-6 grid gap-3 sm:grid-cols-2"
		>
			<a
				v-for="u in UPSTREAM"
				:key="u.repo"
				:href="u.url"
				target="_blank"
				rel="noopener noreferrer"
				class="border-default hover:border-primary/60 bg-default group flex flex-col rounded-xl border p-4 transition-colors"
			>
				<div class="flex items-baseline justify-between gap-3">
					<span class="text-highlighted font-mono text-sm font-semibold">{{ u.repo }}</span>
					<span class="text-dimmed shrink-0 font-mono text-xs">{{ u.year }}</span>
				</div>
				<span class="text-muted mt-1.5 text-sm">{{ u.what }}</span>
			</a>
		</ScrollReveal>

		<ScrollReveal
			:delay="180"
			class="plate mt-8 p-6 sm:p-8"
		>
			<h3 class="font-display text-highlighted text-lg font-semibold">
				And In the Other Direction
			</h3>
			<div class="mt-5 grid gap-6 sm:grid-cols-3">
				<div>
					<p class="text-gradient-brand font-mono text-3xl font-bold tabular-nums">
						{{ ECOSYSTEM.strangerIssues }}
					</p>
					<p class="text-muted mt-1 text-sm">
						issues opened on my projects by people who are not me
					</p>
				</div>
				<div>
					<p class="text-gradient-brand font-mono text-3xl font-bold tabular-nums">
						{{ ECOSYSTEM.inboundPRsMerged }}/{{ ECOSYSTEM.inboundPRs }}
					</p>
					<p class="text-muted mt-1 text-sm">
						outside contributors' pull requests reviewed and merged
					</p>
				</div>
				<div>
					<p class="text-gradient-brand font-mono text-3xl font-bold tabular-nums">
						{{ downloads.toLocaleString('en-US') }}
					</p>
					<p class="text-muted mt-1 text-sm">
						downloads on SpigotMC<template v-if="reviews"
							>, {{ average }}/5 across {{ reviews }} written reviews</template
						>
					</p>
				</div>
			</div>
			<p class="text-dimmed mt-5 text-sm">
				MobChip took 13 of those patches at a 100% merge rate. When I stopped maintaining it, its
				most active outside contributor forked it as
				<a
					href="https://github.com/datatags/MobChipLite"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-primary underline decoration-dotted"
					>MobChipLite</a
				>
				and is still shipping it today.
			</p>
		</ScrollReveal>
	</section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ECOSYSTEM, UPSTREAM } from '~/data/timeline';

const spiget = useSpiget();
const totals = computed(() => spiget.totals());
const downloads = computed(() => totals.value.downloads);
const reviews = computed(() => totals.value.reviews);
const average = computed(() => totals.value.average);
</script>
