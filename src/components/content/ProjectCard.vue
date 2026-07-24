<template>
	<UButton
		:to="url"
		target="_blank"
		variant="outline"
		color="neutral"
		class="not-prose group my-3 block w-full rounded-xl p-4 no-underline transition-colors hover:border-primary"
	>
		<div class="flex items-center justify-between gap-2">
			<span class="text-highlighted font-display font-semibold">{{ name }}</span>
			<span
				v-if="stars"
				class="text-muted inline-flex items-center gap-1 font-mono text-sm"
			>
				<UIcon
					name="i-lucide-star"
					class="size-3.5 text-primary"
				/>
				{{ stars }}
			</span>
		</div>
		<p
			v-if="$slots.default"
			class="text-muted mt-1 text-sm"
		>
			<slot />
		</p>
		<div class="mt-3 flex flex-wrap items-center gap-1.5">
			<UBadge
				v-for="l in langs"
				:key="l"
				color="neutral"
				variant="soft"
				size="sm"
			>
				{{ l }}
			</UBadge>
			<span
				v-if="period"
				class="text-dimmed ml-auto text-xs"
				>{{ period }}</span
			>
		</div>
	</UButton>
</template>

<script setup lang="ts">
const props = defineProps<{
	name: string;
	url: string;
	stars?: number | string;
	languages?: string;
	period?: string;
}>();

const langs = computed(() =>
	(props.languages ?? '')
		.split(',')
		.map((l) => l.trim())
		.filter(Boolean)
);
</script>
