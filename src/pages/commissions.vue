<template>
	<div class="page-atmos min-h-screen">
		<div class="mx-auto max-w-3xl px-6 py-16">
			<ScrollReveal>
				<h1 class="font-display text-3xl font-black sm:text-5xl">
					<span class="text-gradient-brand">Commissions</span>
				</h1>
			</ScrollReveal>
			<ScrollReveal
				:delay="100"
				class="plate plate-accent mt-8 p-6 sm:p-10"
			>
				<div class="prose dark:prose-invert max-w-none">
					<ContentRenderer
						v-if="commissions"
						:value="commissions"
					/>
				</div>
			</ScrollReveal>
		</div>
	</div>
</template>

<script setup lang="ts">
const { data: commissions } = await useAsyncData('commissions', () =>
	queryCollection('content').path('/commissions').first()
);

useSeoMeta({
	title: 'Commissions',
	description:
		'Commission custom software from Gregory Mitchell. Terms, pricing, and how to get in touch.'
});
</script>
