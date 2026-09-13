<template>
	<figure class="not-prose my-8">
		<NuxtImg
			:src="src"
			:alt="alt || caption || ''"
			:width="width"
			:height="height"
			sizes="(max-width: 640px) 88vw, 560px"
			loading="lazy"
			class="brand-glow w-full rounded-xl"
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
	alt?: string;
	caption?: string;
	width?: string | number;
	height?: string | number;
}>();
</script>
