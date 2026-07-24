<template>
	<primitive :object="group" />
</template>

<script setup lang="ts">
import { useLoop } from '@tresjs/core';
import * as THREE from 'three';

const { track } = useDisposables();

const specs = [
	{ c: 'rgba(73,120,0,0.5)', p: [-32, 10, -95], s: 75 },
	{ c: 'rgba(43,60,150,0.4)', p: [36, -16, -125], s: 95 },
	{ c: 'rgba(120,40,120,0.3)', p: [12, 26, -155], s: 85 }
];
const group = new THREE.Group();
const sprites: THREE.Sprite[] = [];
for (const sp of specs) {
	const s = new THREE.Sprite(
		track(
			new THREE.SpriteMaterial({
				map: track(
					radialTexture(
						[
							[0, sp.c],
							[1, 'rgba(0,0,0,0)']
						],
						256
					)
				),
				transparent: true,
				blending: THREE.AdditiveBlending,
				depthWrite: false
			})
		)
	);
	s.position.set(sp.p[0], sp.p[1], sp.p[2]);
	s.scale.setScalar(sp.s);
	group.add(s);
	sprites.push(s);
}

const { onBeforeRender } = useLoop();
onBeforeRender(({ elapsed }) => {
	group.rotation.z = elapsed * 0.005;
	sprites.forEach((s, i) => (s.position.y = specs[i].p[1] + Math.sin(elapsed * 0.05 + i) * 3));
});
</script>
