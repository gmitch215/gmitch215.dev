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
		<TresAmbientLight
			:color="ambientColor"
			:intensity="0.42"
		/>
		<TresDirectionalLight
			:position="[14, 12, 8]"
			:intensity="1.15"
			color="#fff4e2"
		/>
		<TresPointLight
			:position="[0, 0, -9]"
			:intensity="1.9"
			color="#ffb45a"
			:distance="150"
		/>
		<TresFogExp2
			attach="fog"
			:args="['#04060b', 0.0055]"
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
				:detail="detail"
				:textured="textured"
			/>
		</TresGroup>
	</TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { computed } from 'vue';
import { PLANETS, TRAVEL } from '~/data/planets';

const props = withDefaults(defineProps<{ progress?: number }>(), { progress: 0 });
const { settings, tier } = useAdaptiveQuality();

const DETAIL: Record<string, number> = { ultra: 48, high: 40, medium: 28, low: 18, off: 18 };
const detail = computed(() => DETAIL[tier.value] ?? 28);
const textured = computed(() => ['medium', 'high', 'ultra'].includes(tier.value));
const starCount = computed(() => Math.round(2400 * (settings.value.particleScale || 0.4)));
const cometCount = computed(() => (tier.value === 'low' ? 1 : tier.value === 'medium' ? 2 : 3));
const progress = computed(() => props.progress);

const { x: mx, y: my } = useMouse({ type: 'client' });
const { width, height } = useWindowSize();
const coarse = import.meta.client && matchMedia('(pointer: coarse)').matches;
const rotY = computed(() => (coarse ? 0 : (mx.value / (width.value || 1) - 0.5) * 0.12));
const rotX = computed(() => (coarse ? 0 : (my.value / (height.value || 1) - 0.5) * 0.08));

const cA = new THREE.Color('#183a24');
const cB = new THREE.Color('#3a2a10');
const cC = new THREE.Color('#12303a');
const scratch = new THREE.Color();
const ambientColor = computed(() => {
	const p = progress.value;
	if (p < 0.6) scratch.copy(cA).lerp(cB, p / 0.6);
	else scratch.copy(cB).lerp(cC, (p - 0.6) / 0.4);
	return `#${scratch.getHexString()}`;
});
</script>
