<template>
	<primitive :object="group" />
</template>

<script setup lang="ts">
import { useLoop } from '@tresjs/core';
import * as THREE from 'three';
import type { PlanetConfig } from '~/data/planets';

const props = withDefaults(
	defineProps<{
		config: PlanetConfig;
		progress: number;
		travel: number;
		detail?: number;
		textured?: boolean;
	}>(),
	{ detail: 32, textured: true }
);
const cfg = props.config;
const seg = Math.max(10, props.detail);
const { track } = useDisposables();

const group = new THREE.Group();
const spinner = new THREE.Group();
group.add(spinner);

const material = new THREE.MeshStandardMaterial({
	color: new THREE.Color(cfg.color),
	emissive: new THREE.Color(cfg.emissive || '#000000'),
	emissiveIntensity: cfg.emissiveIntensity ?? 0,
	roughness: cfg.roughness ?? 0.8,
	metalness: cfg.metalness ?? 0,
	flatShading: !!cfg.flatShading
});
track(material);
const pulses = cfg.surface === 'lava' || cfg.surface === 'energy';
let baseEmissive = material.emissiveIntensity;

if (props.textured) {
	const tex = makePlanetTextures(cfg.surface, cfg.name);
	if (tex.map) material.map = track(tex.map);
	if (tex.emissiveMap) {
		material.emissiveMap = track(tex.emissiveMap);
		material.emissive = new THREE.Color('#ffffff');
		material.emissiveIntensity = pulses ? 1.4 : 0.7;
		baseEmissive = material.emissiveIntensity;
	}
	if (tex.cloudMap) {
		spinner.add(
			new THREE.Mesh(
				track(new THREE.SphereGeometry(cfg.radius * 1.02, seg, seg)),
				track(
					new THREE.MeshStandardMaterial({
						color: new THREE.Color('#ffffff'),
						alphaMap: track(tex.cloudMap),
						transparent: true,
						opacity: 0.55,
						depthWrite: false
					})
				)
			)
		);
	}
}
spinner.add(new THREE.Mesh(track(new THREE.SphereGeometry(cfg.radius, seg, seg)), material));

if (cfg.atmosphere) {
	spinner.add(
		new THREE.Mesh(
			track(new THREE.SphereGeometry(cfg.radius * 1.16, seg, seg)),
			track(
				new THREE.MeshBasicMaterial({
					color: new THREE.Color(cfg.atmosphere),
					transparent: true,
					opacity: 0.16,
					side: THREE.BackSide
				})
			)
		)
	);
}

if (cfg.rings) {
	const ring = new THREE.Mesh(
		track(new THREE.RingGeometry(cfg.rings.inner, cfg.rings.outer, 80)),
		track(
			new THREE.MeshBasicMaterial({
				color: new THREE.Color(cfg.rings.color),
				transparent: true,
				opacity: 0.5,
				side: THREE.DoubleSide
			})
		)
	);
	ring.rotation.x = -Math.PI / 2 + 0.42;
	spinner.add(ring);
}

if (cfg.glow) {
	const sprite = new THREE.Sprite(
		track(
			new THREE.SpriteMaterial({
				map: track(
					radialTexture([
						[0, 'rgba(255,255,255,0.95)'],
						[0.28, cfg.emissive || cfg.color],
						[1, 'rgba(0,0,0,0)']
					])
				),
				color: new THREE.Color(cfg.emissive || cfg.color),
				transparent: true,
				blending: THREE.AdditiveBlending,
				depthWrite: false
			})
		)
	);
	sprite.scale.setScalar(cfg.radius * cfg.glow * 2.4);
	group.add(sprite);
}

const moonsGroup = new THREE.Group();
spinner.add(moonsGroup);
if (cfg.moons) {
	const mg = track(new THREE.SphereGeometry(cfg.radius * 0.14, 16, 16));
	const mm = track(new THREE.MeshStandardMaterial({ color: '#cfd8c4', roughness: 1 }));
	for (let i = 0; i < cfg.moons; i++) {
		const a = (i / cfg.moons) * Math.PI * 2;
		const r = cfg.radius * 1.9 + i * 0.35;
		const m = new THREE.Mesh(mg, mm);
		m.position.set(Math.cos(a) * r, Math.sin(a) * 0.5, Math.sin(a) * r);
		moonsGroup.add(m);
	}
}

const satGroup = new THREE.Group();
group.add(satGroup);
if (cfg.satellites) {
	const sg = track(new THREE.IcosahedronGeometry(cfg.radius * 0.11, 0));
	const sm = track(
		new THREE.MeshStandardMaterial({
			color: '#bcff43',
			emissive: '#3f7a00',
			emissiveIntensity: 0.5,
			flatShading: true
		})
	);
	for (let i = 0; i < cfg.satellites; i++) {
		const a = (i / cfg.satellites) * Math.PI * 2;
		const r = cfg.radius * 2.3;
		const s = new THREE.Mesh(sg, sm);
		s.position.set(Math.cos(a) * r, (i % 2 ? 1 : -1) * cfg.radius * 0.85, Math.sin(a) * r);
		satGroup.add(s);
	}
	satGroup.rotation.x = Math.PI * 0.16;
}

group.position.set(cfg.position[0], cfg.position[1], cfg.position[2]);

const { onBeforeRender } = useLoop();
onBeforeRender(({ delta, elapsed }) => {
	const targetZ = cfg.position[2] + props.progress * props.travel;
	group.position.z += (targetZ - group.position.z) * Math.min(1, delta * 2.6);
	group.position.x = cfg.position[0] + Math.sin(elapsed * 0.2 + cfg.order) * 0.4;
	spinner.rotation.y += delta * (cfg.spin ?? 0.12);
	moonsGroup.rotation.y += delta * 0.4;
	satGroup.rotation.y += delta * 0.3;
	if (pulses)
		material.emissiveIntensity =
			baseEmissive + Math.sin(elapsed * 2.2 + cfg.order) * 0.4 * baseEmissive;
});
</script>
