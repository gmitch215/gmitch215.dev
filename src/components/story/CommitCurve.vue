<template>
	<div
		ref="root"
		class="relative w-full"
	>
		<svg
			:viewBox="`0 0 ${W} ${H}`"
			class="w-full"
			role="img"
			:aria-label="`Commits per year from 2019 to 2026, totalling ${TOTAL_COMMITS.toLocaleString('en-US')}. A trickle at age 11, a plateau near 1,800 per year, then 3,336 in the first seven months of 2026.`"
			@mouseleave="hovered = null"
		>
			<defs>
				<linearGradient
					id="barGrad"
					x1="0"
					y1="0"
					x2="0"
					y2="1"
				>
					<stop
						offset="0%"
						stop-color="var(--color-brand-400)"
					/>
					<stop
						offset="100%"
						stop-color="var(--color-brand-700)"
					/>
				</linearGradient>
				<linearGradient
					id="barGrad2026"
					x1="0"
					y1="0"
					x2="0"
					y2="1"
				>
					<stop
						offset="0%"
						stop-color="var(--color-brand-200)"
					/>
					<stop
						offset="100%"
						stop-color="var(--color-brand-500)"
					/>
				</linearGradient>
			</defs>

			<g class="text-dimmed">
				<template
					v-for="g in gridLines"
					:key="g"
				>
					<line
						:x1="padL"
						:x2="W - padR"
						:y1="yFor(g)"
						:y2="yFor(g)"
						stroke="currentColor"
						stroke-opacity="0.15"
						stroke-dasharray="3 5"
					/>
					<text
						:x="padL - 8"
						:y="yFor(g) + 4"
						text-anchor="end"
						class="fill-current text-[11px]"
						fill-opacity="0.5"
					>
						{{ g / 1000 }}k
					</text>
				</template>
				<line
					:x1="padL"
					:x2="W - padR"
					:y1="baseline"
					:y2="baseline"
					stroke="currentColor"
					stroke-opacity="0.3"
				/>
			</g>

			<g :class="['bars', { revealed }]">
				<g
					v-for="b in bars"
					:key="b.i"
					class="bar"
					:style="{ '--i': b.i }"
					@mouseenter="hovered = b.i"
				>
					<rect
						:x="b.x"
						:y="b.y"
						:width="b.w"
						:height="b.h"
						rx="5"
						:fill="b.bright ? 'url(#barGrad2026)' : 'url(#barGrad)'"
						:opacity="hovered === null || hovered === b.i ? 1 : 0.5"
						:class="b.bright ? 'brand-glow-bar' : ''"
					/>
					<text
						:x="b.cx"
						:y="b.y - 8"
						text-anchor="middle"
						class="fill-current font-mono text-[11px] font-semibold"
						:fill-opacity="b.bright ? 0.95 : 0.7"
					>
						{{ b.era.commits.toLocaleString() }}
					</text>
					<text
						:x="b.cx"
						:y="baseline + 20"
						text-anchor="middle"
						class="fill-current text-[12px] font-medium"
						fill-opacity="0.6"
					>
						{{ b.era.year }}
					</text>
					<rect
						:x="padL + slot * b.i"
						:y="padT"
						:width="slot"
						:height="plotH"
						fill="transparent"
					/>
				</g>
			</g>
		</svg>

		<Transition name="fade">
			<div
				v-if="tip"
				class="border-default bg-default/95 pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg border px-3 py-2 text-xs shadow-lg backdrop-blur"
				:style="{ left: `${(tip.cx / W) * 100}%`, top: `${(tip.y / H) * 100}%` }"
			>
				<p class="text-highlighted font-display font-bold">{{ tip.era.era }}</p>
				<p class="text-muted">{{ tip.era.headline }}</p>
				<p class="text-primary mt-1 font-mono">
					{{ tip.era.commits.toLocaleString() }} commits<span v-if="tip.era.annualized">
						&middot; ~{{ tip.era.annualized.toLocaleString() }}/yr pace</span
					>
				</p>
				<p
					v-if="tip.era.flagship"
					class="text-dimmed mt-0.5"
				>
					{{ tip.era.flagship.name
					}}<span v-if="tip.era.flagship.stars"> &middot; {{ tip.era.flagship.stars }}★</span>
				</p>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { computed, ref } from 'vue';
import { ERAS, TOTAL_COMMITS } from '~/data/timeline';

const W = 880;
const H = 340;
const padL = 44;
const padR = 20;
const padT = 28;
const padB = 46;
const plotW = W - padL - padR;
const plotH = H - padT - padB;
const MAX = 3600;
const baseline = padT + plotH;

const slot = plotW / ERAS.length;
const barW = slot * 0.5;

const bars = computed(() =>
	ERAS.map((e, i) => {
		const h = (e.commits / MAX) * plotH;
		const cx = padL + slot * i + slot / 2;
		return {
			i,
			era: e,
			x: cx - barW / 2,
			cx,
			y: baseline - h,
			h,
			w: barW,
			bright: e.year === 2026
		};
	})
);

const gridLines = [1000, 2000, 3000];
const yFor = (v: number) => baseline - (v / MAX) * plotH;

const root = ref<HTMLElement | null>(null);
const revealed = ref(false);
const hovered = ref<number | null>(null);

useIntersectionObserver(
	root,
	(entries) => {
		if (entries[0]?.isIntersecting) revealed.value = true;
	},
	{ threshold: 0.25 }
);

const tip = computed(() => (hovered.value === null ? null : bars.value[hovered.value]));
</script>

<style scoped>
.bar rect:first-of-type {
	transform: scaleY(0);
	transform-box: fill-box;
	transform-origin: center bottom;
	transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
	transition-delay: calc(var(--i) * 70ms);
}
.bars.revealed .bar rect:first-of-type {
	transform: scaleY(1);
}
.bar text {
	opacity: 0;
	transition: opacity 0.5s ease;
	transition-delay: calc(var(--i) * 70ms + 300ms);
}
.bars.revealed .bar text {
	opacity: 1;
}
.brand-glow-bar {
	filter: drop-shadow(0 0 10px var(--color-brand-500));
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
	.bar rect:first-of-type,
	.bar text {
		transition: none;
		transform: none;
		opacity: 1;
	}
}
</style>
