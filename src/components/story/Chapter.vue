<template>
	<section
		class="relative mx-auto flex min-h-screen max-w-6xl items-center px-5 py-20 sm:px-6"
		:class="finale ? 'justify-center' : ''"
	>
		<ScrollReveal
			class="w-full"
			:class="finale ? 'mx-auto max-w-2xl' : flip ? 'max-w-xl lg:ml-auto' : 'max-w-xl lg:mr-auto'"
		>
			<div
				class="plate plate-accent p-6 sm:p-8"
				:class="finale ? 'brand-glow ring-primary/30 text-center ring-1' : ''"
			>
				<div
					class="mb-4 flex items-center gap-2"
					:class="finale ? 'justify-center' : ''"
				>
					<span
						class="border-primary/40 text-primary rounded-full border px-2.5 py-0.5 font-mono text-xs"
						:class="finale ? 'animate-pulse' : ''"
						>{{ chapter.year }}</span
					>
					<span class="text-muted text-sm font-medium tracking-widest uppercase">{{
						chapter.era
					}}</span>
					<span
						v-if="planet"
						class="text-dimmed inline-flex items-center gap-1.5 font-mono text-xs"
						:title="`This era is the planet ${planet.name}`"
					>
						<span
							class="size-2 rounded-full"
							:style="{ background: planet.color }"
						/>
						{{ planet.name }}
					</span>
					<span
						v-if="chapter.commits"
						class="text-dimmed ml-auto font-mono text-xs"
						>{{ chapter.commits.toLocaleString('en-US') }} commits</span
					>
				</div>

				<h2
					class="font-display text-highlighted font-bold"
					:class="finale ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-3xl'"
				>
					<span :class="finale ? 'text-gradient-brand' : ''">{{ chapter.headline }}</span>
				</h2>
				<p
					v-if="chapter.tagline"
					class="text-muted mt-1.5"
					:class="finale ? 'text-lg' : ''"
				>
					{{ chapter.tagline }}
				</p>

				<NuxtImg
					v-if="chapter.image"
					:src="chapter.image"
					:alt="`Gregory Mitchell, ${chapter.era} era (${chapter.year})`"
					sizes="(max-width: 640px) 88vw, 560px"
					class="mt-5 w-full rounded-xl border border-white/10 object-cover"
					:class="finale ? 'mx-auto max-w-md' : ''"
				/>

				<div
					class="prose prose-sm dark:prose-invert mt-5 max-w-none"
					:class="finale ? 'prose-p:text-toned mx-auto' : ''"
				>
					<ContentRenderer :value="chapter" />
				</div>

				<UButton
					v-if="chapter.flagship"
					:to="chapter.flagship.url"
					target="_blank"
					rel="noopener noreferrer"
					color="neutral"
					variant="outline"
					class="hover:border-primary mt-5"
				>
					<Icon
						name="uil:github"
						class="size-4"
					/>
					<span class="font-mono">{{ chapter.flagship.name }}</span>
					<span
						v-if="chapter.flagship.stars"
						class="text-primary"
						>{{ chapter.flagship.stars }}&#9733;</span
					>
				</UButton>
			</div>
		</ScrollReveal>
	</section>
</template>

<script setup lang="ts">
import { PLANETS } from '~/data/planets';

interface Flagship {
	name: string;
	url: string;
	stars?: number;
	description?: string;
}
interface StoryDoc {
	order: number;
	year: string;
	era: string;
	headline: string;
	tagline?: string;
	commits?: number;
	image?: string;
	flagship?: Flagship;
}

const props = defineProps<{ chapter: StoryDoc & Record<string, unknown> }>();
const flip = computed(() => props.chapter.order % 2 === 0);
const finale = computed(() => props.chapter.era === 'Mission' || props.chapter.year === 'Now');
const planet = computed(() => PLANETS.find((p) => p.order === props.chapter.order));
</script>
