<template>
	<NuxtLink
		:href="href"
		:target="target || (isExternal ? '_blank' : undefined)"
		:rel="isExternal ? 'noopener noreferrer' : undefined"
		class="text-primary decoration-primary/30 hover:decoration-primary font-medium underline underline-offset-2 transition-colors"
	>
		<slot />
	</NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
	href?: string;
	target?: string;
}>();

const isExternal = computed(() => /^https?:\/\//.test(props.href ?? ''));
</script>
