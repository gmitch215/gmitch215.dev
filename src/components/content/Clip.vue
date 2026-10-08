<template>
	<figure class="not-prose my-8">
		<video
			:src="src"
			:poster="poster"
			:aria-label="alt || caption"
			controls
			muted
			playsinline
			preload="metadata"
			class="brand-glow mx-auto w-full max-w-xs rounded-xl"
		/>
		<figcaption
			v-if="caption"
			class="text-muted mt-2 text-center text-sm"
		>
			{{ caption }}
		</figcaption>
	</figure>
</template>

<script setup lang="ts">
defineProps<{
	src: string;
	poster?: string;
	alt?: string;
	caption?: string;
}>();
</script>
