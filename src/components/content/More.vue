<template>
	<div class="not-prose mt-5">
		<UModal
			v-model:open="open"
			:title="title"
			:ui="{ content: 'sm:max-w-2xl' }"
		>
			<UButton
				color="neutral"
				variant="outline"
				size="sm"
				trailing-icon="i-lucide-book-open"
				class="hover:border-primary"
			>
				Read More
			</UButton>
			<template #body>
				<div class="prose prose-sm dark:prose-invert max-w-none">
					<slot />
				</div>
			</template>
		</UModal>
	</div>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>();
const open = ref(false);
</script>
