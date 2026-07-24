<template>
	<primitive :object="points" />
</template>

<script setup lang="ts">
import { useLoop } from '@tresjs/core';
import * as THREE from 'three';

const props = withDefaults(defineProps<{ count?: number }>(), { count: 2000 });
const n = Math.max(200, Math.floor(props.count));
const { track } = useDisposables();

const pos = new Float32Array(n * 3);
const col = new Float32Array(n * 3);
const c = new THREE.Color();
const green = new THREE.Color('#a2f213');
const white = new THREE.Color('#eafff0');
for (let i = 0; i < n; i++) {
	pos[i * 3] = (Math.random() - 0.5) * 320;
	pos[i * 3 + 1] = (Math.random() - 0.5) * 220;
	pos[i * 3 + 2] = 40 - Math.random() * 280;
	c.copy(Math.random() < 0.14 ? green : white).multiplyScalar(0.45 + Math.random() * 0.55);
	col[i * 3] = c.r;
	col[i * 3 + 1] = c.g;
	col[i * 3 + 2] = c.b;
}

const geometry = track(new THREE.BufferGeometry());
geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(col, 3));
const material = track(
	new THREE.PointsMaterial({
		map: track(
			radialTexture(
				[
					[0, 'rgba(255,255,255,1)'],
					[0.5, 'rgba(255,255,255,0.55)'],
					[1, 'rgba(255,255,255,0)']
				],
				64
			)
		),
		size: 1.1,
		sizeAttenuation: true,
		vertexColors: true,
		transparent: true,
		opacity: 0.95,
		depthWrite: false,
		blending: THREE.AdditiveBlending
	})
);
const points = new THREE.Points(geometry, material);

const { warping } = useWarp();
const { onBeforeRender } = useLoop();
onBeforeRender(({ delta }) => {
	const boost = warping.value ? 24 : 1;
	points.rotation.y += delta * 0.006 * boost;
	points.rotation.x += delta * 0.002 * boost;
	const targetSize = warping.value ? 2.8 : 1.1;
	material.size += (targetSize - material.size) * Math.min(1, delta * 6);
});
</script>
