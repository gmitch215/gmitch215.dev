<template>
	<primitive :object="group" />
</template>

<script setup lang="ts">
import { useLoop } from '@tresjs/core';
import * as THREE from 'three';

const props = withDefaults(defineProps<{ count?: number }>(), { count: 3 });
const n = Math.max(0, Math.floor(props.count));
const { track } = useDisposables();

const group = new THREE.Group();
const up = new THREE.Vector3(0, 1, 0);
const tex = n
	? track(
			radialTexture(
				[
					[0, 'rgba(255,255,255,1)'],
					[0.4, 'rgba(190,255,120,0.85)'],
					[1, 'rgba(0,0,0,0)']
				],
				64
			)
		)
	: null;

interface Comet {
	g: THREE.Group;
	from: THREE.Vector3;
	to: THREE.Vector3;
	period: number;
	phase: number;
	dur: number;
}
const comets: Comet[] = [];

for (let i = 0; i < n; i++) {
	const g = new THREE.Group();
	const head = new THREE.Sprite(
		track(
			new THREE.SpriteMaterial({
				map: tex!,
				color: new THREE.Color('#eafff0'),
				transparent: true,
				blending: THREE.AdditiveBlending,
				depthWrite: false
			})
		)
	);
	head.scale.setScalar(2.4);
	const from = new THREE.Vector3(-48, 26 - i * 16, -28 - i * 12);
	const to = new THREE.Vector3(48, -18 + i * 10, -52 - i * 8);
	const dir = to.clone().sub(from).normalize();
	const tail = new THREE.Mesh(
		track(new THREE.ConeGeometry(0.5, 6, 10, 1, true)),
		track(
			new THREE.MeshBasicMaterial({
				color: new THREE.Color('#a2f213'),
				transparent: true,
				opacity: 0.32,
				blending: THREE.AdditiveBlending,
				depthWrite: false,
				side: THREE.DoubleSide
			})
		)
	);
	tail.quaternion.setFromUnitVectors(up, dir.clone().multiplyScalar(-1));
	tail.position.copy(dir.clone().multiplyScalar(-3));
	g.add(head, tail);
	g.visible = false;
	group.add(g);
	comets.push({ g, from, to, period: 9 + i * 3.5, phase: i * 3.2 + 2, dur: 3.6 });
}

const { onBeforeRender } = useLoop();
const tmp = new THREE.Vector3();
onBeforeRender(({ elapsed }) => {
	for (const c of comets) {
		const t = (elapsed + c.phase) % c.period;
		if (t < c.dur) {
			const f = t / c.dur;
			c.g.position.copy(tmp.copy(c.from).lerp(c.to, f));
			c.g.visible = true;
			c.g.scale.setScalar(0.6 + Math.sin(f * Math.PI) * 0.8);
		} else {
			c.g.visible = false;
		}
	}
});
</script>
