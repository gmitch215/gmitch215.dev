import { useIntersectionObserver } from '@vueuse/core';
import { ref, type Ref } from 'vue';

/**
 * true while `target` is near/in the viewport. scenes use this to mount 3D lazily
 * and to pause work (and the FPS watchdog) when off-screen.
 */
export function useSceneVisibility(target: Ref<HTMLElement | null>, rootMargin = '200px') {
	const isVisible = ref(false);
	useIntersectionObserver(
		target,
		(entries) => {
			isVisible.value = entries[0]?.isIntersecting ?? false;
		},
		{ rootMargin, threshold: 0 }
	);
	return { isVisible };
}
