<template>
	<div>
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
						class="ring-primary/50 motion-preset-fade motion-duration-500 mb-6 size-36 rounded-full object-cover shadow-2xl shadow-black/60 ring-4"
					/>
					<p
						class="text-dimmed motion-preset-fade motion-duration-500 mb-3 font-mono text-xs tracking-widest uppercase sm:text-sm"
					>
						b. 2008 / Chicago / Dartmouth '30
					</p>
					<h1
						class="font-display motion-preset-slide-up motion-duration-700 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl"
					>
						<span class="text-gradient-brand">Gregory Mitchell</span>
					</h1>
					<p
						class="text-toned motion-preset-fade motion-delay-200 motion-duration-500 mt-4 max-w-2xl text-base leading-relaxed drop-shadow-lg sm:text-lg"
					>
						The world's okayest developer, allegedly. I have been shipping code in public since I
						was eleven: plugins, game engines, and the plumbing other people's apps and AI quietly
						run on.
					</p>
					<p
						class="text-toned motion-preset-fade motion-delay-500 motion-duration-500 mt-3 max-w-xl text-sm drop-shadow-lg sm:text-base"
					>
						Now I am pointing all of it at one problem: making people feel a little less alone.
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

					<figure
						class="motion-preset-fade motion-delay-700 motion-duration-500 mt-10 flex flex-col items-center"
					>
						<NuxtImg
							src="/pictures/gregory-cpu.png"
							alt="Gregory examining a CPU die"
							width="160"
							height="160"
							sizes="160px"
							class="size-32 -rotate-2 rounded-lg border border-white/15 object-cover shadow-xl sm:size-40"
						/>
						<figcaption class="text-dimmed mt-3 max-w-xs font-mono text-xs italic">
							yes, that is me squinting at a CPU. i do that for fun.
						</figcaption>
					</figure>

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
