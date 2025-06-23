<template>
    <div class="prose dark:prose-invert pb-8 w-screen">
        <ContentRenderer v-if="commissions" :value="commissions" class="pl-8 w-screen" />
        <div v-else class="flex items-center justify-center w-screen h-screen">
            <p class="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: commissions } = await useAsyncData('commissions', () => queryCollection('content').path('/commissions').first(), { server: false })

useHead({
    title: 'Commisions'
})
</script>