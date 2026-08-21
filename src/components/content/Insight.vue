<template>
	<div class="border-default bg-muted/40 not-prose my-6 flex gap-3 rounded-xl border p-4">
		<UIcon
			:name="icon || 'i-lucide-lightbulb'"
			class="text-primary mt-0.5 size-5 shrink-0"
		/>
		<div class="min-w-0 text-sm leading-relaxed [&_p]:my-0 [&_p~p]:mt-2.5">
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
