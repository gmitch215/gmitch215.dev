import * as THREE from 'three';

export type Surface = 'rock' | 'grass' | 'gas' | 'metal' | 'lava' | 'energy' | 'islands' | 'earth';

export interface PlanetTextures {
	map?: THREE.CanvasTexture;
	emissiveMap?: THREE.CanvasTexture;
	cloudMap?: THREE.CanvasTexture;
}

function rng(seed: number) {
	let a = seed >>> 0;
	return () => {
		a += 0x6d2b79f5;
		let t = a;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}
function seedOf(s: string) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
	return h >>> 0;
}
function surface(w = 512, h = 256) {
	const cv = document.createElement('canvas');
	cv.width = w;
	cv.height = h;
	return { cv, ctx: cv.getContext('2d')!, w, h };
}
function toTex(cv: HTMLCanvasElement, srgb = true) {
	const t = new THREE.CanvasTexture(cv);
	if (srgb) t.colorSpace = THREE.SRGBColorSpace;
	t.anisotropy = 4;
	return t;
}
function blobs(
	ctx: CanvasRenderingContext2D,
	w: number,
	h: number,
	r: () => number,
	colors: string[],
	count: number,
	min: number,
	max: number
) {
	for (let i = 0; i < count; i++) {
		ctx.globalAlpha = 0.35 + r() * 0.5;
		ctx.fillStyle = colors[Math.floor(r() * colors.length)];
		const x = r() * w;
		const y = r() * h;
		const rad = min + r() * (max - min);
		ctx.beginPath();
		ctx.ellipse(x, y, rad, rad * (0.6 + r() * 0.7), r() * Math.PI, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.globalAlpha = 1;
}

export function makePlanetTextures(kind: Surface, seedKey: string): PlanetTextures {
	const r = rng(seedOf(seedKey));
	const { cv, ctx, w, h } = surface();

	if (kind === 'earth') {
		ctx.fillStyle = '#0f4c81';
		ctx.fillRect(0, 0, w, h);
		blobs(ctx, w, h, r, ['#2f7d4f', '#3f8f3a', '#6b5a2e', '#2a6b45'], 26, 14, 42);
		ctx.fillStyle = '#eaf6ff';
		ctx.globalAlpha = 0.9;
		ctx.fillRect(0, 0, w, 14);
		ctx.fillRect(0, h - 14, w, 14);
		ctx.globalAlpha = 1;
		const lights = surface();
		lights.ctx.fillStyle = '#000';
		lights.ctx.fillRect(0, 0, w, h);
		lights.ctx.fillStyle = '#ffd27a';
		for (let i = 0; i < 260; i++) {
			lights.ctx.globalAlpha = 0.4 + r() * 0.6;
			lights.ctx.fillRect(r() * w, 20 + r() * (h - 40), 1.4, 1.4);
		}
		const clouds = surface();
		blobs(clouds.ctx, w, h, r, ['#ffffff', '#e8f2ff'], 22, 16, 46);
		return {
			map: toTex(cv),
			emissiveMap: toTex(lights.cv, false),
			cloudMap: toTex(clouds.cv, false)
		};
	}

	if (kind === 'grass') {
		ctx.fillStyle = '#4e9a45';
		ctx.fillRect(0, 0, w, h);
		blobs(ctx, w, h, r, ['#3c7d38', '#5fb054', '#6b8f3a'], 30, 12, 34);
		ctx.globalAlpha = 0.8;
		for (let i = 0; i < 26; i++) {
			ctx.fillStyle = ['#7a5a33', '#8a6a3a'][Math.floor(r() * 2)];
			const s = 8 + r() * 16;
			ctx.fillRect(r() * w, r() * h, s, s);
		}
		ctx.globalAlpha = 1;
		return { map: toTex(cv) };
	}

	if (kind === 'gas') {
		for (let y = 0; y < h; y++) {
			const t = 0.5 + 0.5 * Math.sin(y * 0.12 + Math.sin(y * 0.03) * 2);
			const c = new THREE.Color('#8a4e1e').lerp(new THREE.Color('#e6b366'), t);
			ctx.fillStyle = `#${c.getHexString()}`;
			ctx.fillRect(0, y, w, 1);
		}
		blobs(ctx, w, h, r, ['#c9863f', '#f0d7a0', '#7a4412'], 18, 20, 60);
		return { map: toTex(cv) };
	}

	if (kind === 'metal') {
		ctx.fillStyle = '#8a97a6';
		ctx.fillRect(0, 0, w, h);
		blobs(ctx, w, h, r, ['#79879a', '#9fb0c0'], 16, 20, 50);
		ctx.strokeStyle = '#4a545f';
		ctx.lineWidth = 1;
		for (let x = 0; x <= w; x += 32) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
			ctx.stroke();
		}
		for (let y = 0; y <= h; y += 32) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
			ctx.stroke();
		}
		const em = surface();
		em.ctx.fillStyle = '#000';
		em.ctx.fillRect(0, 0, w, h);
		em.ctx.strokeStyle = '#a2f213';
		em.ctx.lineWidth = 2;
		for (let i = 0; i < 6; i++) {
			const y = r() * h;
			em.ctx.beginPath();
			em.ctx.moveTo(0, y);
			em.ctx.lineTo(w, y + (r() - 0.5) * 30);
			em.ctx.stroke();
		}
		return { map: toTex(cv), emissiveMap: toTex(em.cv, false) };
	}

	if (kind === 'lava') {
		ctx.fillStyle = '#1a0e06';
		ctx.fillRect(0, 0, w, h);
		blobs(ctx, w, h, r, ['#2a160a', '#0f0804'], 22, 20, 50);
		const em = surface();
		em.ctx.fillStyle = '#000';
		em.ctx.fillRect(0, 0, w, h);
		em.ctx.strokeStyle = '#ff8a1e';
		for (let i = 0; i < 40; i++) {
			em.ctx.lineWidth = 1 + r() * 2.5;
			em.ctx.beginPath();
			let x = r() * w;
			let y = r() * h;
			em.ctx.moveTo(x, y);
			for (let s = 0; s < 5; s++) {
				x += (r() - 0.5) * 40;
				y += (r() - 0.5) * 40;
				em.ctx.lineTo(x, y);
			}
			em.ctx.stroke();
		}
		return { map: toTex(cv), emissiveMap: toTex(em.cv, false) };
	}

	if (kind === 'energy') {
		ctx.fillStyle = '#15220a';
		ctx.fillRect(0, 0, w, h);
		const em = surface();
		em.ctx.fillStyle = '#000';
		em.ctx.fillRect(0, 0, w, h);
		em.ctx.strokeStyle = '#bcff43';
		for (let i = 0; i < 30; i++) {
			em.ctx.lineWidth = 1 + r() * 2;
			em.ctx.beginPath();
			let x = r() * w;
			let y = r() * h;
			em.ctx.moveTo(x, y);
			for (let s = 0; s < 6; s++) {
				x += (r() - 0.5) * 60;
				y += (r() - 0.5) * 24;
				em.ctx.lineTo(x, y);
			}
			em.ctx.stroke();
		}
		return { map: toTex(cv), emissiveMap: toTex(em.cv, false) };
	}

	if (kind === 'islands') {
		ctx.fillStyle = '#14504a';
		ctx.fillRect(0, 0, w, h);
		blobs(ctx, w, h, r, ['#2fa89a', '#3fc0ae'], 18, 16, 40);
		blobs(ctx, w, h, r, ['#4fae4a', '#6bbf54'], 16, 8, 22);
		return { map: toTex(cv) };
	}

	ctx.fillStyle = '#6b6f5c';
	ctx.fillRect(0, 0, w, h);
	blobs(ctx, w, h, r, ['#585a48', '#7c8069', '#4a4c3c'], 26, 14, 40);
	for (let i = 0; i < 18; i++) {
		const x = r() * w;
		const y = r() * h;
		const rad = 4 + r() * 12;
		ctx.globalAlpha = 0.5;
		ctx.fillStyle = '#3a3c30';
		ctx.beginPath();
		ctx.arc(x, y, rad, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = '#8c9074';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(x, y, rad, 0, Math.PI * 2);
		ctx.stroke();
	}
	ctx.globalAlpha = 1;
	return { map: toTex(cv) };
}
