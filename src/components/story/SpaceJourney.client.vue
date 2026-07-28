<template>
	<TresCanvas
		clear-color="#04060b"
		:dpr="[1, settings.dprCap]"
		:antialias="settings.antialias"
		power-preference="high-performance"
	>
		<TresPerspectiveCamera
			:position="[0, 0, 6]"
			:fov="62"
		/>
		<TresDirectionalLight
			:position="[12, 7, 11]"
			:intensity="1.2"
			color="#fff4e2"
		/>
		<TresGroup
			:rotation-y="rotY"
			:rotation-x="rotX"
		>
			<Nebula />
			<Starfield :count="starCount" />
			<Comets :count="cometCount" />
			<Planet
				v-for="p in PLANETS"
				:key="p.order"
				:config="p"
				:progress="progress"
				:travel="TRAVEL"
				:octaves="octaves"
			/>
		</TresGroup>
	</TresCanvas>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PLANETS, TRAVEL } from '~/data/planets';

const props = withDefaults(defineProps<{ progress?: number }>(), { progress: 0 });
const { settings, tier } = useAdaptiveQuality();

const OCTAVES: Record<string, number> = { ultra: 6, high: 5, medium: 4, low: 3, off: 3 };
const octaves = computed(() => OCTAVES[tier.value] ?? 4);
const starCount = computed(() => Math.round(2400 * (settings.value.particleScale || 0.4)));
const cometCount = computed(() => (tier.value === 'low' ? 1 : tier.value === 'medium' ? 2 : 3));
const progress = computed(() => props.progress);

const { x: mx, y: my } = useMouse({ type: 'client' });
const { width, height } = useWindowSize();
const coarse = import.meta.client && matchMedia('(pointer: coarse)').matches;
const rotY = computed(() => (coarse ? 0 : (mx.value / (width.value || 1) - 0.5) * 0.12));
const rotX = computed(() => (coarse ? 0 : (my.value / (height.value || 1) - 0.5) * 0.08));
</script>
