<template>
	<UDropdownMenu
		:items="items"
		:content="{ align: 'end' }"
		:ui="{ content: 'w-48' }"
	>
		<UButton
			color="neutral"
			variant="ghost"
			icon="i-lucide-gauge"
			:aria-label="`Graphics Quality: ${LABELS[pref]}`"
		>
			<span class="hidden text-xs font-medium sm:inline">{{
				pref === 'auto' ? tier.toUpperCase() : LABELS[pref]
			}}</span>
		</UButton>

		<template #item-label="{ item }">
			<span class="flex-1">{{ item.label }}</span>
		</template>

		<template #content-bottom>
			<div class="text-dimmed border-default border-t px-2 py-1.5 text-[11px] leading-snug">
				<template v-if="capabilities">
					{{ capabilities.cores }} cores<span v-if="capabilities.memory">
						/ {{ capabilities.memory }}GB</span
					>
					<span v-if="capabilities.reducedMotion"> / reduced-motion</span>
				</template>
				<template v-else>Detecting hardware...</template>
			</div>
		</template>
	</UDropdownMenu>
</template>

<script setup lang="ts">
import type { QualityPref } from '~/composables/useAdaptiveQuality';

const { pref, options, tier, capabilities, setQuality } = useAdaptiveQuality();

const LABELS: Record<QualityPref, string> = {
	auto: 'Automatic',
	ultra: 'Ultra',
	high: 'High',
	medium: 'Medium',
	low: 'Low',
	off: 'Off (Static)'
};

const ICONS: Record<QualityPref, string> = {
	auto: 'i-lucide-gauge',
	ultra: 'i-lucide-flame',
	high: 'i-lucide-sparkles',
	medium: 'i-lucide-diamond',
	low: 'i-lucide-minus',
	off: 'i-lucide-power'
};

const items = computed(() => [
	options.map((o) => ({
		label: LABELS[o],
		icon: ICONS[o],
		trailingIcon: pref.value === o ? 'i-lucide-check' : undefined,
		onSelect: () => setQuality(o)
	}))
]);
</script>
