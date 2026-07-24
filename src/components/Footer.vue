<template>
	<footer class="border-default bg-muted/30 relative mt-24 border-t">
		<div class="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
			<!-- brand + mission -->
			<div class="sm:col-span-2 lg:col-span-1">
				<NuxtLink
					to="/"
					class="flex items-center gap-2.5"
				>
					<UAvatar
						:src="gravatarUrl(80)"
						alt="Gregory Mitchell"
						size="sm"
						class="ring-primary/40 ring-2"
					/>
					<span class="font-display text-highlighted text-lg font-bold">{{ SITE_NAME }}</span>
				</NuxtLink>
				<p class="text-muted mt-4 max-w-xs text-sm leading-relaxed">{{ MISSION }}</p>
			</div>

			<!-- explore -->
			<div>
				<p class="text-highlighted mb-3 text-sm font-semibold">Explore</p>
				<ul class="space-y-2">
					<li
						v-for="link in NAV_LINKS"
						:key="link.url"
					>
						<NuxtLink
							:to="link.url"
							:target="link.external ? '_blank' : undefined"
							:rel="link.external ? 'noopener noreferrer' : undefined"
							class="text-muted hover:text-primary text-sm transition"
						>
							{{ link.name }}
						</NuxtLink>
					</li>
					<li>
						<NuxtLink
							to="/commissions"
							class="text-muted hover:text-primary text-sm transition"
							>Commissions</NuxtLink
						>
					</li>
				</ul>
			</div>

			<!-- connect -->
			<div>
				<p class="text-highlighted mb-3 text-sm font-semibold">Connect</p>
				<ul class="space-y-2">
					<li
						v-for="s in SOCIALS"
						:key="s.name"
					>
						<NuxtLink
							:to="s.url"
							target="_blank"
							rel="noopener noreferrer"
							class="text-muted hover:text-primary inline-flex items-center gap-2 text-sm transition"
						>
							<Icon
								:name="s.icon!"
								class="size-4"
							/>
							{{ s.name }}
						</NuxtLink>
					</li>
					<li>
						<a
							:href="`mailto:${EMAIL}`"
							class="text-muted hover:text-primary inline-flex items-center gap-2 text-sm transition"
						>
							<UIcon
								name="i-lucide-mail"
								class="size-4"
							/>
							{{ EMAIL }}
						</a>
					</li>
				</ul>
			</div>

			<!-- support -->
			<div>
				<p class="text-highlighted mb-3 text-sm font-semibold">Support the Work</p>
				<div class="flex flex-col gap-2">
					<UButton
						v-for="link in SUPPORT_LINKS"
						:key="link.name"
						:to="link.url"
						target="_blank"
						rel="noopener noreferrer"
						color="neutral"
						variant="outline"
						size="sm"
						block
						class="justify-start"
					>
						<Icon
							:name="link.icon!"
							class="size-4"
						/>
						{{ link.name }}
					</UButton>
				</div>
			</div>
		</div>

		<div
			class="border-default text-dimmed mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 border-t px-6 py-5 text-xs sm:flex-row"
		>
			<p>Copyright &copy; {{ year }} {{ PERSON_SHORT }}. All rights reserved.</p>
			<p class="flex items-center gap-1.5">
				<span class="text-gradient-brand font-medium">Keep Moving Forward.</span>
				<span aria-hidden="true">&middot;</span>
				<span>Built with Nuxt, three.js &amp; no sleep</span>
			</p>
		</div>
	</footer>
</template>

<script setup lang="ts">
const year = 2026;
</script>
