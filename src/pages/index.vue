<template>
    <main>
        <div class="flex flex-col items-center justify-center w-full">
            <img
                src="/pictures/gregory-engineering-2.png" 
                :alt=PERSON_NAME 
                :title=PERSON_NAME
                class="rounded-xl shadow-2xl shadow-green-300/70 dark:shadow-green-900/70
                motion-opacity-in-0 motion-translate-y-in-25 motion-duration-1500 motion-rotate-in-20
                hover:scale-110 cursor-pointer duration-800
                size-48 sm:size-64 md:size-80 lg:size-96"
                style="transition-property: scale;"
            />
            <h1 class="font-bold text-xl md:text-2xl lg:text-4xl xl:text-6xl mt-6 mb-6">{{ PERSON_NAME }}</h1>
            <h3 class="typewriter-[80+7s+1s] text-xs sm:text-sm lg:text-lg xl:text-xl mx-4 dark:text-primary text-dark-primary">{{ SITE_DESCRIPTION }}</h3>

            <div class="flex mt-4 flex-col sm:flex-row sm:mt-12">
                <div v-for="(popup, i) in popups" :key="i"
                    class="bg-green-100 dark:bg-green-900 text-gray-900 dark:text-white
                    px-4 py-2 rounded-lg m-2 shadow-lg shadow-green-300/70 dark:shadow-green-900/70
                    motion-opacity-in-0 motion-translate-y-in-25 motion-duration-1500 motion-delay-[5s]
                    hover:scale-110 cursor-pointer duration-800"
                    style="transition-property: scale;">
                    {{ popup }}
                </div>
            </div>

            <div class="flex flex-row items-center">
                <a v-for="(link, i) in iconLinks" :key="i"
                    :href="link.url"
                    class="relative bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white
                    size-16 lg:size-24 xl:size-32
                    flex items-center justify-center
                    px-4 py-2 rounded-lg m-4 shadow-lg shadow-gray-300/70 dark:shadow-gray-800/70
                    motion-opacity-in-0 motion-translate-y-in-25 motion-duration-1500 motion-delay-[6s]
                    hover:scale-110 transition-transform duration-500"
                >
                    <Icon 
                        :name="link.icon"
                        size="4.5em"
                    />
                </a>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { PERSON_NAME } from '~/composables/useConstants';

const popups = [
    '📍 Chicago, IL',
    '🖱️ 7+ Years Experience',
    '🏃🏾 Distance Runner'
]

const iconLinks = [
    {
        name: 'Patreon',
        url: 'https://www.patreon.com/gmitch215',
        icon: 'logos:patreon'
    },
    {
        name: 'Buy Me a Coffee',
        url: 'https://www.buymeacoffee.com/gmitch215',
        icon: 'cib:buy-me-a-coffee'
    }
]

definePageMeta({
    htmlAttrs: {
        lang: 'en',
        class: 'no-overflow'
    },
    bodyAttrs: {
        class: 'no-overflow'
    }
})

</script>