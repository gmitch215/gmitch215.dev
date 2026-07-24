<template>
	<div class="page-atmos min-h-screen">
		<div class="cv-page mx-auto max-w-3xl px-6 py-16">
			<header class="plate plate-accent flex flex-col items-center p-8 text-center">
				<img
					:src="gravatarUrl(200)"
					alt="Gregory R. Mitchell"
					width="112"
					height="112"
					class="ring-primary/50 brand-glow mb-5 size-28 rounded-full ring-4"
				/>
				<h1 class="font-display text-3xl font-black sm:text-4xl">Gregory R. Mitchell</h1>
				<p class="text-muted mt-1">{{ SITE_DESCRIPTION }}</p>

				<div class="no-print mt-4 flex flex-wrap justify-center gap-2">
					<UButton
						to="/gregory-mitchell-cv.pdf"
						target="_blank"
						external
						download
						color="primary"
						icon="i-lucide-download"
						>Download PDF</UButton
					>
					<UButton
						to="https://github.com/gmitch215"
						target="_blank"
						rel="noopener noreferrer"
						color="neutral"
						variant="outline"
					>
						<Icon
							name="uil:github"
							class="size-4"
						/>
						GitHub
					</UButton>
				</div>
			</header>

			<section class="mt-10">
				<h2 class="text-muted mb-3 text-xs font-semibold tracking-widest uppercase">
					Editor Time (WakaTime)
				</h2>
				<div class="space-y-3">
					<div
						v-for="l in featured"
						:key="l.name"
					>
						<div class="flex items-center justify-between text-sm">
							<span class="inline-flex items-center gap-1.5">
								<Icon
									:name="l.icon"
									class="size-4"
								/>
								{{ l.name }}
							</span>
							<span class="text-muted font-mono text-xs">{{ l.pct }}%</span>
						</div>
						<div class="bg-muted mt-1 h-2 overflow-hidden rounded-full">
							<div
								class="bg-brand-gradient h-full rounded-full transition-[width] duration-700"
								:style="{ width: `${l.pct}%` }"
							/>
						</div>
					</div>
				</div>

				<h2 class="text-muted mt-6 mb-3 text-xs font-semibold tracking-widest uppercase">
					Also Ships In
				</h2>
				<div class="flex flex-wrap gap-2">
					<span
						v-for="l in others"
						:key="l.name"
						class="border-default bg-muted/40 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm"
					>
						<Icon
							:name="l.icon"
							class="size-4"
						/>
						{{ l.name }}
					</span>
				</div>

				<h2 class="text-muted mt-6 mb-3 text-xs font-semibold tracking-widest uppercase">Tools</h2>
				<div class="flex flex-wrap gap-2">
					<span
						v-for="t in tools"
						:key="t.name"
						class="border-default bg-muted/40 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm"
					>
						<Icon
							:name="t.icon"
							class="size-4"
						/>
						{{ t.name }}
					</span>
				</div>
			</section>

			<div class="prose dark:prose-invert mt-10 max-w-none">
				<ContentRenderer
					v-if="cv"
					:value="cv"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { LANGUAGES } from '~/data/timeline';

const { data: cv } = await useAsyncData('cv', () => queryCollection('content').path('/cv').first());

const featured = computed(() => LANGUAGES.filter((l) => l.pct));
const others = computed(() => LANGUAGES.filter((l) => !l.pct));

const tools = [
	{ name: 'IntelliJ IDEA', icon: 'logos:intellij-idea' },
	{ name: 'WebStorm', icon: 'logos:webstorm' },
	{ name: 'VS Code', icon: 'logos:visual-studio-code' },
	{ name: 'Git', icon: 'logos:git-icon' },
	{ name: 'Gradle', icon: 'logos:gradle' },
	{ name: 'npm', icon: 'logos:npm-icon' },
	{ name: 'Bun', icon: 'logos:bun' },
	{ name: 'Docker', icon: 'logos:docker-icon' },
	{ name: 'Cloudflare', icon: 'logos:cloudflare' },
	{ name: 'Nuxt', icon: 'logos:nuxt-icon' }
];

useSeoMeta({
	title: 'Curriculum Vitae',
	description:
		'Gregory R. Mitchell. Eight years shipping software, ten languages, published to five registries. Dartmouth Class of 2030, CS + Psychology.'
});
</script>
