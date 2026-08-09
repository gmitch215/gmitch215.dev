<template>
	<component
		:is="as"
		ref="el"
		:class="['reveal', { shown }]"
		:style="{ '--delay': `${delay}ms` }"
	>
		<slot />
	</component>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

withDefaults(defineProps<{ delay?: number; as?: string }>(), { delay: 0, as: 'div' });

const el = ref<HTMLElement | null>(null);
const shown = ref(false);
useIntersectionObserver(
	el,
	(e) => {
		if (e[0]?.isIntersecting) shown.value = true;
	},
	{ threshold: 0.15 }
);
</script>

<style scoped>
.reveal {
	opacity: 0;
	transform: translateY(26px);
	transition:
		opacity 0.45s ease,
		transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
	transition-delay: var(--delay);
}
.reveal.shown {
	opacity: 1;
	transform: none;
}
@media (prefers-reduced-motion: reduce) {
	.reveal {
		opacity: 1;
		transform: none;
		transition: none;
	}
}
</style>
