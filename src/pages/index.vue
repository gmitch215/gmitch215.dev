<template>
	<div>
		<ClientOnly>
			<CursorTrail />
		</ClientOnly>
		<JourneyHud :progress="journey" />

		<div
			ref="region"
			class="relative"
		>
			<div class="pointer-events-none sticky top-0 h-screen overflow-hidden">
				<SpaceScene :progress="journey" />
			</div>

			<div class="relative z-10 mt-[-100vh]">
				<section
					class="flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16 text-center"
				>
					<img
						:src="gravatarUrl(240)"
						alt="Gregory R. Mitchell"
						width="144"
						height="144"
						class="ring-primary/50 motion-preset-fade motion-duration-1000 mb-8 size-36 rounded-full object-cover shadow-2xl shadow-black/60 ring-4"
					/>
					<h1
						class="font-display motion-preset-slide-up motion-duration-700 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl"
					>
						<span class="text-shimmer">Gregory Mitchell</span>
					</h1>
					<p
						class="text-muted motion-preset-fade motion-delay-200 motion-duration-1000 mt-4 max-w-xl text-base drop-shadow-lg sm:text-xl"
					>
						{{ SITE_DESCRIPTION }}
					</p>
					<p
						class="motion-preset-fade motion-delay-500 motion-duration-1000 mt-4 max-w-lg text-sm text-white/90 drop-shadow-lg sm:text-base"
					>
						{{ MISSION }}
					</p>

					<div class="mt-9 flex flex-wrap items-center justify-center gap-3">
						<UButton
							to="#story"
							size="lg"
							color="primary"
							icon="i-lucide-rocket"
							@click="warp()"
							>Begin the Journey</UButton
						>
						<UButton
							to="/cv"
							size="lg"
							color="neutral"
							variant="outline"
							icon="i-lucide-file-text"
							>View CV</UButton
						>
						<UButton
							to="/support"
							size="lg"
							color="neutral"
							variant="ghost"
							icon="i-lucide-heart"
							>Support</UButton
						>
					</div>

					<NuxtLink
						to="#story"
						aria-label="Scroll to story"
						class="text-dimmed hover:text-primary absolute bottom-8 animate-bounce transition"
					>
						<UIcon
							name="i-lucide-chevrons-down"
							class="size-6"
						/>
					</NuxtLink>
				</section>

				<section class="mx-auto max-w-6xl px-6 py-10">
					<div
						class="plate plate-accent grid grid-cols-2 gap-y-10 p-8 sm:grid-cols-3 lg:grid-cols-5"
					>
						<StatCounter
							v-for="s in STATS"
							:key="s.label"
							:value="statValue(s)"
							:prefix="s.prefix"
							:suffix="s.suffix"
							:label="s.label"
							:footnote="s.footnote"
						/>
					</div>
				</section>

				<div
					id="story"
					class="scroll-mt-16"
				>
					<template v-if="story">
						<div
							v-for="c in story"
							:id="`chapter-${c.order}`"
							:key="c.id ?? c.order"
							class="scroll-mt-16"
						>
							<Chapter :chapter="c as any" />
						</div>
					</template>
				</div>
			</div>
		</div>

		<section class="mx-auto max-w-4xl px-6 py-24">
			<ScrollReveal class="text-center">
				<p class="text-primary font-mono text-sm tracking-widest uppercase">Telemetry</p>
				<h2 class="font-display mt-2 text-3xl font-bold sm:text-4xl">The Curve Tells the Story</h2>
				<p class="text-muted mx-auto mt-3 max-w-xl">
					A trickle at eleven, a plateau near 1,800 a year through the pre-AI era, then the ceiling
					breaks: more commits in seven months of 2026 than in any prior full year.
				</p>
			</ScrollReveal>
			<ScrollReveal
				:delay="120"
				class="plate plate-accent mt-8 p-4 sm:p-8"
			>
				<CommitCurve />
			</ScrollReveal>
		</section>

		<section class="relative mx-auto max-w-3xl px-6 pb-24 text-center">
			<ScrollReveal>
				<h2 class="font-display text-3xl font-bold sm:text-4xl">
					<span class="text-gradient-brand">Keep Moving Forward.</span>
				</h2>
				<p class="text-muted mx-auto mt-4 max-w-xl">
					Eleven thousand commits, and the one that matters most I have not written yet. If any of
					this resonates, the best way to follow along is right here.
				</p>
				<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
					<UButton
						to="/projects"
						size="lg"
						color="primary"
						icon="i-lucide-folder-git-2"
						>Explore the Projects</UButton
					>
					<UButton
						to="/support"
						size="lg"
						color="neutral"
						variant="outline"
						icon="i-lucide-heart"
						>Support the Work</UButton
					>
				</div>
			</ScrollReveal>
		</section>
	</div>
</template>

<script setup lang="ts">
import { STATS } from '~/data/timeline';

const { data: story } = await useAsyncData('story-chapters', () =>
	queryCollection('story').order('order', 'ASC').all()
);

const { warp } = useWarp();

const gh = useGitHub();
onMounted(() => gh.load());
const statValue = (s: (typeof STATS)[number]) =>
	s.label.includes('Top Library')
		? (gh.starsFor('gmitch215/MobChip', s.value) ?? s.value)
		: s.value;

const region = ref<HTMLElement | null>(null);
const { top, height } = useElementBounding(region);
const { height: vh } = useWindowSize();
const journey = computed(() => {
	const dist = height.value - vh.value;
	return dist > 0 ? Math.min(1, Math.max(0, -top.value / dist)) : 0;
});

useSeoMeta({
	title: '',
	description: `${PERSON_NAME}. ${SITE_DESCRIPTION}. ${MISSION}`
});
</script>
