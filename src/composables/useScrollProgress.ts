import { useElementBounding, useWindowSize } from '@vueuse/core';
import { computed, type Ref } from 'vue';

/**
 * scroll progress of an element through the viewport, 0..1.
 * 0 = element top just reached the viewport bottom; 1 = element bottom just left the top.
 * drives scene params (camera, particle spread) as the user scrolls a chapter.
 */
export function useScrollProgress(target: Ref<HTMLElement | null>) {
	const { top, height } = useElementBounding(target);
	const { height: vh } = useWindowSize();

	const progress = computed(() => {
		const denom = vh.value + height.value;
		if (denom <= 0) return 0;
		return Math.min(1, Math.max(0, (vh.value - top.value) / denom));
	});

	return { progress };
}
