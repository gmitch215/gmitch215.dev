<template>
	<header
		class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
		:class="
			solid
				? 'border-default bg-default/80 border-b shadow-sm backdrop-blur-md'
				: 'border-b border-transparent'
		"
	>
		<nav class="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
			<NuxtLink
				to="/"
				class="group flex items-center gap-2.5"
				aria-label="Home"
			>
				<UAvatar
					:src="gravatarUrl(80)"
					alt="Gregory Mitchell"
					size="sm"
					class="ring-primary/40 group-hover:ring-primary ring-2 ring-offset-2 ring-offset-transparent transition"
				/>
				<span class="font-display text-highlighted text-lg font-bold tracking-tight">
					{{ SITE_NAME }}
				</span>
			</NuxtLink>

			<div class="ml-4 hidden items-center gap-1 lg:flex">
				<UButton
					v-for="link in NAV_LINKS"
					:key="link.url"
					:to="link.url"
					:target="link.external ? '_blank' : undefined"
					:rel="link.external ? 'noopener noreferrer' : undefined"
					variant="ghost"
					size="sm"
					:color="isActive(link.url) ? 'primary' : 'neutral'"
					:class="isActive(link.url) ? 'font-semibold' : ''"
				>
					{{ link.name }}
					<UIcon
						v-if="link.external"
						name="i-lucide-arrow-up-right"
						class="size-3 opacity-60"
					/>
				</UButton>
			</div>

			<div class="ml-auto flex items-center gap-1">
				<UButton
					to="https://github.com/gmitch215"
					target="_blank"
					rel="noopener noreferrer"
					color="neutral"
					variant="ghost"
					aria-label="GitHub"
					class="hidden sm:inline-flex"
				>
					<Icon
						name="uil:github"
						class="size-5"
					/>
				</UButton>

				<ClientOnly>
					<QualityToggle />
					<template #fallback>
						<div class="size-8" />
					</template>
				</ClientOnly>

				<ClientOnly>
					<UColorModeButton />
					<template #fallback>
						<div class="size-8" />
					</template>
				</ClientOnly>

				<UButton
					color="primary"
					variant="solid"
					size="sm"
					to="/support"
					class="ml-1 hidden md:inline-flex"
					icon="i-lucide-heart"
				>
					Support
				</UButton>

				<UButton
					color="neutral"
					variant="ghost"
					icon="i-lucide-menu"
					class="lg:hidden"
					aria-label="Open Menu"
					@click="open = true"
				/>
			</div>
		</nav>

		<USlideover
			v-model:open="open"
			title="gmitch215"
			side="right"
		>
			<template #body>
				<div class="flex flex-col gap-1">
					<UButton
						v-for="link in NAV_LINKS"
						:key="link.url"
						:to="link.url"
						:target="link.external ? '_blank' : undefined"
						:rel="link.external ? 'noopener noreferrer' : undefined"
						variant="ghost"
						size="lg"
						block
						class="justify-start"
						:color="isActive(link.url) ? 'primary' : 'neutral'"
						:icon="link.icon"
					>
						{{ link.name }}
					</UButton>

					<UButton
						color="primary"
						variant="solid"
						size="lg"
						block
						to="/support"
						icon="i-lucide-heart"
						class="mt-2"
					>
						Support the Work
					</UButton>

					<div class="border-default mt-4 flex items-center justify-between border-t pt-4">
						<div class="flex items-center gap-3">
							<NuxtLink
								v-for="s in SOCIALS"
								:key="s.name"
								:to="s.url"
								target="_blank"
								rel="noopener noreferrer"
								:aria-label="s.name"
								class="text-muted hover:text-primary transition"
							>
								<Icon
									:name="s.icon!"
									class="size-5"
								/>
							</NuxtLink>
						</div>
						<div class="flex items-center gap-1">
							<QualityToggle />
							<UColorModeButton />
						</div>
					</div>
				</div>
			</template>
		</USlideover>
	</header>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';

const route = useRoute();
const { y } = useWindowScroll();
const open = ref(false);

const solid = computed(() => y.value > 24 || route.path !== '/');

const isActive = (url: string) => !url.startsWith('http') && route.path === url;

watch(
	() => route.path,
	() => (open.value = false)
);
</script>
