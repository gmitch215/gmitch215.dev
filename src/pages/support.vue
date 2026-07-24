<template>
	<div class="page-atmos min-h-screen">
		<div class="mx-auto max-w-3xl px-6 py-16">
			<ScrollReveal class="plate plate-accent p-8 text-center sm:p-10">
				<img
					:src="gravatarUrl(160)"
					alt="Gregory Mitchell"
					width="88"
					height="88"
					class="ring-primary/50 brand-glow mx-auto mb-6 size-22 rounded-full ring-4"
				/>
				<h1 class="font-display text-3xl font-black sm:text-5xl">
					<span class="text-gradient-brand">Support the Work</span>
				</h1>
				<div
					v-if="page"
					class="prose dark:prose-invert mx-auto mt-6 max-w-none"
				>
					<ContentRenderer :value="page" />
				</div>
			</ScrollReveal>

			<div class="mt-10 grid gap-4 sm:grid-cols-3">
				<ScrollReveal
					v-for="(link, i) in SUPPORT_LINKS"
					:key="link.name"
					:delay="i * 100"
				>
					<NuxtLink
						v-tilt
						:to="link.url"
						target="_blank"
						rel="noopener noreferrer"
						class="border-default bg-default hover:border-primary group flex h-full flex-col items-center gap-3 rounded-2xl border p-6 text-center transition-all"
					>
						<span
							class="flex size-14 items-center justify-center rounded-full transition-transform group-hover:scale-110"
							:style="{ backgroundColor: `${link.color}22` }"
						>
							<Icon
								:name="link.icon!"
								class="size-7"
								:style="{ color: link.color }"
							/>
						</span>
						<span class="font-display text-highlighted font-semibold">{{ link.name }}</span>
						<span class="text-muted text-sm">{{ link.blurb }}</span>
						<span
							class="text-primary mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium"
						>
							Open
							<UIcon
								name="i-lucide-arrow-up-right"
								class="size-3.5"
							/>
						</span>
					</NuxtLink>
				</ScrollReveal>
			</div>

			<p class="text-muted mt-10 text-center text-sm">
				Prefer to just say hi? Reach me at
				<a
					:href="`mailto:${EMAIL}`"
					class="text-primary hover:underline"
					>{{ EMAIL }}</a
				>.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('support', () =>
	queryCollection('content').path('/support').first()
);

useSeoMeta({
	title: 'Support the Work',
	description:
		'Back Gregory Mitchell via GitHub Sponsors, Patreon, or Buy Me a Coffee. Support funds open-source work and The Earth App mission.'
});
</script>
