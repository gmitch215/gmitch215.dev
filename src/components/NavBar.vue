<template>
    <div id="navbar" class="flex items-center p-4 w-full border-b-6 mb-8
        bg-green-100 border-b-green-200 
        dark:bg-green-900 dark:border-b-green-950">
        <div class="flex items-center">
            <a href="/" class="text-2xl font-bold text-gray-900 dark:text-white
            hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                <img src="/favicon.png" alt="Logo" class="hidden xl:inline-block size-12 mr-2 rounded-full border-black dark:border-white border-2">
                {{ SITE_NAME }}
            </a>
            <div class="ml-2 sm:ml-4 md:ml-8 lg:ml-24 justify-center md:text-lg xl:text-xl
            hidden sm:flex">
                <a 
                    v-for="(link, i) in links"
                    :key="i"
                    :name="link.name"
                    :title="link.name"
                    :href="link.url"
                    :target="link.external ? '_blank' : '_self'"
                    class="mx-1 md:mx-2 lg:mx-6 xl:mx-8 font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                    {{ link.name }}
                </a>
            </div>
        </div>

        <div class="ml-auto space-x-4
        hidden sm:flex">
            <a v-for="(social, i) in socials"
                :key="i"
                :href="social.url"
                :title="social.name"
                target="_blank"
                rel="noopener noreferrer"
                class="md:mx-2 lg:mx-4 xl:mx-6 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors
                text-xl sm:text-2xl md:text-3xl lg:text-4xl"
            >
                <Icon :name="social.icon" class="hover:scale-110 transition-transform duration-400" />
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
    const links = [
        {
            name: 'Blog',
            url: 'https://gmitch215.blog',
            external: true
        },
        {
            name: 'CV',
            url: '/cv',
            external: false
        },
        {
            name: 'Commissions',
            url: '/commissions',
            external: false
        },
        {
            name: 'About',
            url: '/about',
            external: false
        }
    ]

    const socials = [
        {
            name: 'GitHub',
            icon: 'uil:github',
            url: 'https://github.com/gmitch215',
        },
        {
            name: 'Instagram',
            icon: 'uil:instagram',
            url: 'https://instagram.com/gmitch215',
        },
        {
            name: 'Discord',
            icon: 'ic:baseline-discord',
            url: 'https://discord.com/users/572173428086538270',
        },
        {
            name: 'Twitter',
            icon: 'uil:twitter',
            url: 'https://x.com/gmitch215',
        },
        {
            name: 'LinkedIn',
            icon: 'uil:linkedin',
            url: 'https://www.linkedin.com/in/gmitch215/',
        }
    ]
</script>