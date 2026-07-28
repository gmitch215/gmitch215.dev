<template>
	<primitive :object="group" />
</template>

<script setup lang="ts">
import { useLoop } from '@tresjs/core';
import * as THREE from 'three';

const { track } = useDisposables();

const specs = [
	{ c: 'rgba(73,120,0,0.34)', p: [-30, 12, -100], s: 58 },
	{ c: 'rgba(43,60,150,0.26)', p: [34, -16, -140], s: 70 },
	{ c: 'rgba(120,40,120,0.16)', p: [12, 26, -172], s: 52 }
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
