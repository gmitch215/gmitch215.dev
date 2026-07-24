<template>
	<nav
		class="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 lg:block"
		aria-label="Journey"
	>
		<div
			class="border-default/60 bg-default/40 flex flex-col items-center gap-3 rounded-full border px-2 py-3 backdrop-blur"
		>
			<button
				v-for="p in PLANETS"
				:key="p.order"
				type="button"
				class="group relative flex size-4 items-center justify-center"
				:aria-label="`${p.order}. ${p.name}`"
				@click="go(p.order)"
			>
				<span
					class="rounded-full transition-all duration-300"
					:style="dot(p)"
				/>
				<span
					class="border-default bg-default/90 text-highlighted pointer-events-none absolute right-7 rounded-md border px-2 py-0.5 text-xs whitespace-nowrap opacity-0 transition group-hover:opacity-100"
				>
					{{ p.name }}
				</span>
			</button>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PLANETS, type PlanetConfig } from '~/data/planets';

const props = defineProps<{ progress: number }>();
const activeOrder = computed(() =>
	Math.min(PLANETS.length, Math.max(1, Math.round(props.progress * (PLANETS.length - 1)) + 1))
);

function dot(p: PlanetConfig) {
	const active = p.order === activeOrder.value;
	return {
		width: active ? '13px' : '9px',
		height: active ? '13px' : '9px',
		background: p.color,
		boxShadow: active ? `0 0 12px ${p.color}` : 'none',
		opacity: active ? '1' : '0.5'
	};
}
function go(order: number) {
	document
		.getElementById(`chapter-${order}`)
		?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
</script>
