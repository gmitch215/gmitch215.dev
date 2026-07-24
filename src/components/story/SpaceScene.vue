<template>
	<div
		ref="root"
		class="absolute inset-0 bg-[#04060b]"
	>
		<ClientOnly>
			<LazySpaceJourney
				v-if="show3D"
				:progress="progress"
			/>
			<SpaceStatic v-else />
			<template #fallback>
				<SpaceStatic />
			</template>
		</ClientOnly>
		<div
			class="pointer-events-none absolute inset-0 bg-linear-to-b from-[#04060b]/30 via-transparent to-[#04060b]/70"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, onScopeDispose, ref, watch } from 'vue';

const props = withDefaults(defineProps<{ progress?: number }>(), { progress: 0 });
const { settings, registerScene } = useAdaptiveQuality();
const root = ref<HTMLElement | null>(null);
const { isVisible } = useSceneVisibility(root, '0px');
const show3D = computed(() => import.meta.client && settings.value.render3D && isVisible.value);
const progress = computed(() => props.progress);

let release: (() => void) | undefined;
watch(
	show3D,
	(v) => {
		if (v && !release) release = registerScene();
		else if (!v && release) {
			release();
			release = undefined;
		}
	},
	{ immediate: true }
);
onScopeDispose(() => release?.());
</script>
