import * as THREE from 'three';

export function radialTexture(stops: [number, string][], size = 128, srgb = false) {
	const cv = document.createElement('canvas');
	cv.width = cv.height = size;
	const ctx = cv.getContext('2d')!;
	const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
	for (const [o, c] of stops) g.addColorStop(o, c);
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, size, size);
	const t = new THREE.CanvasTexture(cv);
	if (srgb) t.colorSpace = THREE.SRGBColorSpace;
	return t;
}
