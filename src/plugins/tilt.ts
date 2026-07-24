import { defineNuxtPlugin } from '#app';

type TiltEl = HTMLElement & { __tiltCleanup?: () => void };

const MAX = 7;

function isDisabled() {
	return (
		window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
		window.matchMedia('(pointer: coarse)').matches
	);
}

function enable(el: TiltEl) {
	if (el.__tiltCleanup) return;
	el.style.transformStyle = 'preserve-3d';
	el.style.transition = 'transform 150ms ease-out';

	const onMove = (e: PointerEvent) => {
		const r = el.getBoundingClientRect();
		if (!r.width || !r.height) return;
		const px = (e.clientX - r.left) / r.width;
		const py = (e.clientY - r.top) / r.height;
		const rx = ((py - 0.5) * 2 * MAX).toFixed(2);
		const ry = ((0.5 - px) * 2 * MAX).toFixed(2);
		el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
	};
	const onLeave = () => {
		el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
	};

	el.addEventListener('pointermove', onMove);
	el.addEventListener('pointerleave', onLeave);
	el.__tiltCleanup = () => {
		el.removeEventListener('pointermove', onMove);
		el.removeEventListener('pointerleave', onLeave);
		el.style.transform = '';
		el.style.transition = '';
		el.style.transformStyle = '';
	};
}

function disable(el: TiltEl) {
	el.__tiltCleanup?.();
	el.__tiltCleanup = undefined;
}

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('tilt', {
		mounted(el: TiltEl) {
			if (isDisabled()) return;
			enable(el);
		},
		beforeUnmount(el: TiltEl) {
			disable(el);
		}
	});
});
