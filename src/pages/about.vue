<template>
	<div class="page-atmos min-h-screen">
		<div class="mx-auto max-w-3xl px-6 py-16">
			<ScrollReveal>
				<div class="flex flex-col items-center text-center">
					<NuxtImg
						src="/pictures/gregory-thinking.png"
						alt="Gregory R. Mitchell"
						width="256"
						sizes="(max-width: 640px) 60vw, 240px"
						class="brand-glow mb-6 w-48 rounded-2xl sm:w-56"
					/>
					<h1 class="font-display text-3xl font-black sm:text-5xl">
						<span class="text-gradient-brand">About Gregory</span>
					</h1>
				</div>
			</ScrollReveal>

			<ScrollReveal
				:delay="100"
				class="plate plate-accent mt-8 p-6 sm:p-10"
			>
				<div class="prose dark:prose-invert max-w-none">
					<ContentRenderer
						v-if="about"
						:value="about"
					/>
				</div>
			</ScrollReveal>
		</div>
	</div>
</template>

<script setup lang="ts">
const { data: about } = await useAsyncData('about', () =>
	queryCollection('content').path('/about').first()
);

useSeoMeta({
	title: 'About',
	description:
		'The person behind the code: how Gregory Mitchell went from a Discord-server hustle to building software against the loneliness epidemic.'
});
</script>
