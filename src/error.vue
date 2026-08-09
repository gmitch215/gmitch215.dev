<template>
	<div
		class="page-atmos flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 text-center"
	>
		<img
			src="/404.jpg"
			:alt="`Error ${error?.statusCode ?? ''}`"
			class="mb-8 w-64 rounded-xl shadow-2xl shadow-black/50 md:w-96"
		/>
		<p class="text-primary font-mono text-xs tracking-widest uppercase sm:text-sm">
			Error {{ error?.statusCode ?? '' }}
		</p>
		<h1 class="font-display mt-2 text-3xl font-bold sm:text-5xl">Johnny!</h1>
		<p class="text-muted mt-3 max-w-md">{{ message }}</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<UButton
				size="lg"
				color="primary"
				icon="i-lucide-house"
				@click="go('/')"
				>Back Home</UButton
			>
			<UButton
				size="lg"
				color="neutral"
				variant="outline"
				icon="i-lucide-folder-git-2"
				@click="go('/projects')"
				>See the Projects</UButton
			>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	error: { statusCode?: number; statusMessage?: string; message?: string };
}>();

const message = computed(() =>
	props.error?.statusCode === 404
		? 'We got lost looking for a page that is not here. It happens; the good stuff is one click away.'
		: 'Something broke on this end, not yours. Head back and try again.'
);

const go = (to: string) => clearError({ redirect: to });

useHead({ title: `Error ${props.error?.statusCode ?? ''}` });
</script>
