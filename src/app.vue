<template>
   <div class="min-h-screen min-w-screen h-full w-full
   bg-gray-200 text-gray-900 
   dark:bg-gray-900 dark:text-white">
        <NuxtLayout>
            <NavBar />
            <NuxtPage />
        </NuxtLayout>
   </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';

useHead({
    meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'application-name', content: SITE_NAME },
        { name: 'description', content: SITE_DESCRIPTION },
        { name: 'keywords', content: 'gmitch215' },
        { name: 'author', content: 'Gregory Mitchell' },
        { name: 'theme-color', content: THEME_COLOR },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'msapplication-TileColor', content: THEME_COLOR },
        { name: 'msapplication-TileImage', content: '/favicon.png' }
    ],
    link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' },
    ]
})

useSeoMeta({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    ogTitle: SITE_NAME,
    ogDescription: SITE_DESCRIPTION,
    ogImage: 'https://cdn.gmitch215.dev/gregory.png',
    ogLocale: 'en_US',
    ogType: 'website',
    ogSiteName: SITE_NAME,
    ogUrl: 'https://gmitch215.dev',
    twitterTitle: SITE_NAME,
    twitterDescription: SITE_DESCRIPTION,
    twitterCard: 'summary_large_image',
    twitterCreator: '@gmitch215'
})
</script>