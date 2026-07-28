<template>
	<primitive :object="group" />
</template>

<script setup lang="ts">
import { useLoop } from '@tresjs/core';
import * as THREE from 'three';
import { watch } from 'vue';
import type { PlanetConfig } from '~/data/planets';

const props = withDefaults(
	defineProps<{
		config: PlanetConfig;
		progress: number;
		travel: number;
		octaves?: number;
	}>(),
	{ octaves: 4 }
);
const cfg = props.config;
const { track } = useDisposables();

const group = new THREE.Group();
const spinner = new THREE.Group();
group.add(spinner);
group.position.set(cfg.position[0], cfg.position[1], cfg.position[2]);

const material = track(makePlanetMaterial(cfg.surface, cfg.order, props.octaves, cfg.atmosphere));
const planet = new THREE.Mesh(sharedSphere(), material);
planet.scale.setScalar(cfg.radius);
spinner.add(planet);

if (cfg.rings) {
	const ring = new THREE.Mesh(
		track(new THREE.RingGeometry(cfg.rings.inner, cfg.rings.outer, 96)),
		track(
			new THREE.MeshBasicMaterial({
				color: new THREE.Color(cfg.rings.color),
				transparent: true,
				opacity: 0.45,
				side: THREE.DoubleSide,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			})
		)
	);
	ring.rotation.x = -Math.PI / 2 + 0.42;
	spinner.add(ring);
}

const moonsGroup = new THREE.Group();
spinner.add(moonsGroup);
if (cfg.moons) {
	const inst = new THREE.InstancedMesh(
		track(new THREE.SphereGeometry(cfg.radius * 0.14, 14, 14)),
		track(new THREE.MeshLambertMaterial({ color: '#cfd8c4', emissive: '#20241a' })),
		cfg.moons
	);
	const m = new THREE.Matrix4();
	for (let i = 0; i < cfg.moons; i++) {
		const a = (i / cfg.moons) * Math.PI * 2;
		const r = cfg.radius * 1.9 + i * 0.35;
		m.makeTranslation(Math.cos(a) * r, Math.sin(a) * 0.5, Math.sin(a) * r);
		inst.setMatrixAt(i, m);
	}
	inst.instanceMatrix.needsUpdate = true;
	inst.frustumCulled = false;
	moonsGroup.add(inst);
}

const satGroup = new THREE.Group();
group.add(satGroup);
if (cfg.satellites) {
	const inst = new THREE.InstancedMesh(
		track(new THREE.IcosahedronGeometry(cfg.radius * 0.11, 0)),
		track(
			new THREE.MeshLambertMaterial({
				color: '#bcff43',
				emissive: '#3f7a00',
				emissiveIntensity: 0.7,
				flatShading: true
			})
		),
		cfg.satellites
	);
	const m = new THREE.Matrix4();
	for (let i = 0; i < cfg.satellites; i++) {
		const a = (i / cfg.satellites) * Math.PI * 2;
		const r = cfg.radius * 2.3;
		m.makeTranslation(Math.cos(a) * r, (i % 2 ? 1 : -1) * cfg.radius * 0.85, Math.sin(a) * r);
		inst.setMatrixAt(i, m);
	}
	inst.instanceMatrix.needsUpdate = true;
	inst.frustumCulled = false;
	satGroup.add(inst);
	satGroup.rotation.x = Math.PI * 0.16;
}

watch(
	() => props.octaves,
	(o) => (material.uniforms.uOctaves.value = o)
);

const { onBeforeRender } = useLoop();
onBeforeRender(({ delta, elapsed }) => {
	const targetZ = cfg.position[2] + props.progress * props.travel;
	group.position.z += (targetZ - group.position.z) * Math.min(1, delta * 2.6);
	group.position.x = cfg.position[0] + Math.sin(elapsed * 0.2 + cfg.order) * 0.4;
	spinner.rotation.y += delta * (cfg.spin ?? 0.12);
	moonsGroup.rotation.y += delta * 0.4;
	satGroup.rotation.y += delta * 0.3;
	material.uniforms.uTime.value = elapsed;
});
</script>
