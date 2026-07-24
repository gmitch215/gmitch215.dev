<template>
	<canvas
		v-if="enabled"
		ref="canvas"
		class="pointer-events-none fixed inset-0 z-30"
		aria-hidden="true"
	/>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

const TRAIL = 14;
const HEAD_R = 4;
const EASE = 0.32;

const enabled = ref(false);
const canvas = ref<HTMLCanvasElement | null>(null);

let ctx: CanvasRenderingContext2D | null = null;
let raf = 0;
let dpr = 1;
let cssW = 0;
let cssH = 0;

const pointer = { x: 0, y: 0 };
const prevHead = { x: 0, y: 0 };
const trail = Array.from({ length: TRAIL }, () => ({ x: 0, y: 0 }));
let seeded = false;
let intensity = 0;

function resize() {
	if (!canvas.value || !ctx) return;
	dpr = Math.min(window.devicePixelRatio || 1, 2);
	cssW = window.innerWidth;
	cssH = window.innerHeight;
	canvas.value.width = Math.round(cssW * dpr);
	canvas.value.height = Math.round(cssH * dpr);
	canvas.value.style.width = `${cssW}px`;
	canvas.value.style.height = `${cssH}px`;
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function onMove(e: PointerEvent) {
	pointer.x = e.clientX;
	pointer.y = e.clientY;
	// seed the chain on first move so it never streaks in from the origin
	if (!seeded) {
		for (const p of trail) {
			p.x = pointer.x;
			p.y = pointer.y;
		}
		prevHead.x = pointer.x;
		prevHead.y = pointer.y;
		seeded = true;
	}
}

function frame() {
	if (!ctx) return;

	const head = trail[0];
	head.x += (pointer.x - head.x) * EASE;
	head.y += (pointer.y - head.y) * EASE;
	for (let i = 1; i < trail.length; i++) {
		trail[i].x += (trail[i - 1].x - trail[i].x) * EASE;
		trail[i].y += (trail[i - 1].y - trail[i].y) * EASE;
	}

	// intensity tracks recent speed so the trail fades out when idle
	const moved = Math.hypot(head.x - prevHead.x, head.y - prevHead.y);
	prevHead.x = head.x;
	prevHead.y = head.y;
	intensity += (Math.min(1, moved / 6) - intensity) * 0.12;

	ctx.clearRect(0, 0, cssW, cssH);
	if (seeded && intensity > 0.02) {
		ctx.lineCap = 'round';
		for (let i = 0; i < trail.length - 1; i++) {
			const t = 1 - i / trail.length;
			ctx.beginPath();
			ctx.moveTo(trail[i].x, trail[i].y);
			ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
			ctx.lineWidth = HEAD_R * 2 * t;
			ctx.strokeStyle = `rgba(162, 242, 19, ${0.55 * t * intensity})`;
			ctx.stroke();
		}
		ctx.beginPath();
		ctx.arc(head.x, head.y, HEAD_R, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(198, 255, 120, ${0.9 * intensity})`;
		ctx.shadowColor = 'rgba(162, 242, 19, 0.9)';
		ctx.shadowBlur = 14;
		ctx.fill();
		ctx.shadowBlur = 0;
	}

	raf = requestAnimationFrame(frame);
}

onMounted(async () => {
	// disabled for reduced-motion and touch (coarse) pointers
	if (
		window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
		window.matchMedia('(pointer: coarse)').matches
	) {
		return;
	}
	enabled.value = true;
	await nextTick();
	if (!canvas.value) return;
	ctx = canvas.value.getContext('2d');
	if (!ctx) return;
	resize();
	window.addEventListener('pointermove', onMove, { passive: true });
	window.addEventListener('resize', resize);
	raf = requestAnimationFrame(frame);
});

onBeforeUnmount(() => {
	if (raf) cancelAnimationFrame(raf);
	raf = 0;
	window.removeEventListener('pointermove', onMove);
	window.removeEventListener('resize', resize);
	ctx = null;
});
</script>
