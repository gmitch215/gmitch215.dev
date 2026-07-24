<template>
	<div class="border-default bg-muted/40 my-6 flex gap-3 rounded-xl border p-4 not-prose">
		<UIcon
			:name="icon || 'i-lucide-lightbulb'"
			class="text-primary mt-0.5 size-5 shrink-0"
		/>
		<div class="min-w-0 text-sm leading-relaxed">
			<p
				v-if="title"
				class="text-highlighted mb-1 font-semibold"
			>
				{{ title }}
			</p>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	icon?: string;
	title?: string;
}>();
</script>
