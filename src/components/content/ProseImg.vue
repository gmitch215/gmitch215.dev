<template>
	<NuxtImg
		:src="src"
		:alt="alt"
		:width="width"
		:height="height"
		loading="lazy"
		class="rounded-xl shadow-lg"
	/>
</template>

<script setup lang="ts">
defineProps<{
	src: string;
	alt?: string;
	width?: string | number;
	height?: string | number;
}>();
</script>
