<template>
	<span class="not-prose inline-flex flex-col items-center px-3 py-1 text-center">
		<span class="text-gradient-brand font-mono text-3xl font-bold sm:text-4xl">
			{{ prefix }}{{ value }}{{ suffix }}
		</span>
		<span class="text-muted mt-1 text-xs tracking-wide uppercase">{{ label }}</span>
	</span>
</template>

<script setup lang="ts">
defineProps<{
	value: string | number;
	label: string;
	prefix?: string;
	suffix?: string;
}>();
</script>
