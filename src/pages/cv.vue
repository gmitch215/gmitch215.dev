<template>
	<div class="w-screen flex flex-col items-center justify-center">
		<img
			src="/pictures/gregory-engineering.jpeg"
			alt="Gregory R. Mitchell"
			class="w-80 mb-8 rounded-lg shadow-xl shadow-amber-400/50 hover:scale-110 transition-transform duration-900"
		/>
		<h1 class="text-2xl lg:text-4xl xl:text-5xl font-bold mb-4">Gregory R. Mitchell</h1>

		<img
			src="https://skillicons.dev/icons?i=kotlin,java,cpp,c,ts,nodejs,js,html,css,vue,svelte,py"
			,
			alt="Languages"
			class="md:my-4 h-12"
		/>
		<img
			src="https://skillicons.dev/icons?i=github,git,idea,clion,webstorm,vscode,gradle,npm,bun,yarn,maven,blender,photoshop"
			alt="Skills"
			class="mb-8 h-12"
		/>
	</div>

	<div class="prose dark:prose-invert pb-8 w-screen">
		<ContentRenderer
			v-if="cv"
			:value="cv"
			class="pl-8 w-screen"
		/>
		<div
			v-else
			class="flex items-center justify-center w-screen h-screen"
		>
			<p class="text-gray-500 dark:text-gray-400">Loading...</p>
		</div>
	</div>
</template>

<script setup lang="ts">
const { data: cv } = await useAsyncData(
	'cv',
	() => queryCollection('content').path('/cv').first(),
	{ server: false }
);

useHead({
	title: 'Curriculum Vitae'
});
</script>
