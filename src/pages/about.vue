<template>
    <div class="w-screen flex flex-col items-center justify-center mb-32">
        <img src="/pictures/gregory-thinking.png" alt="Gregory R. Mitchell" class="w-64 mb-8 rounded-lg shadow-xl shadow-red-600/50
        hover:scale-110 transition-transform duration-900" />
        <h1 class="text-2xl lg:text-4xl xl:text-5xl font-bold">About Gregory R. Mitchell</h1>
    </div>

    <div class="prose dark:prose-invert pb-8 w-screen">
        <ContentRenderer v-if="about" :value="about" class="pl-8 w-screen" />
        <div v-else class="flex items-center justify-center w-screen h-screen">
            <p class="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: about } = await useAsyncData('about', () => queryCollection('content').path('/about').first(), { server: false })

useHead({
    title: 'About Gregory R. Mitchell'
})
</script>