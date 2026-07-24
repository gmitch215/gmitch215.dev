<template>
	<div
		ref="el"
		class="flex flex-col items-center text-center"
	>
		<span class="text-gradient-brand font-mono text-4xl font-bold tabular-nums sm:text-5xl">
			{{ prefix }}{{ fmt(display) }}{{ suffix }}
		</span>
		<span
			v-if="label"
			class="text-muted mt-2 text-sm font-medium tracking-wide"
			>{{ label }}</span
		>
		<span
			v-if="footnote"
			class="text-dimmed mt-1 max-w-[22ch] text-[11px] leading-snug"
			>{{ footnote }}</span
		>
	</div>
</template>

<script setup lang="ts">
import { useIntersectionObserver, usePreferredReducedMotion } from '@vueuse/core';
import { ref } from 'vue';

const props = withDefaults(
	defineProps<{
		value: number;
		prefix?: string;
		suffix?: string;
		label?: string;
		footnote?: string;
		duration?: number;
	}>(),
	{ duration: 1600 }
);

const el = ref<HTMLElement | null>(null);
const display = ref(props.value);
const reduced = usePreferredReducedMotion();
let done = false;

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

useIntersectionObserver(
	el,
	(entries) => {
		if (!entries[0]?.isIntersecting || done) return;
		done = true;
		if (reduced.value === 'reduce') return;
		const start = performance.now();
		const from = 0;
		const step = (now: number) => {
			const t = Math.min(1, (now - start) / props.duration);
			const eased = 1 - Math.pow(1 - t, 3);
			display.value = from + (props.value - from) * eased;
			if (t < 1) requestAnimationFrame(step);
			else display.value = props.value;
		};
		display.value = 0;
		requestAnimationFrame(step);
	},
	{ threshold: 0.4 }
);
</script>
