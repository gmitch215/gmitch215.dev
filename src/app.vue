<template>
	<UApp>
		<div class="bg-default text-default flex min-h-screen w-full flex-col">
			<NavBar />
			<main class="flex-1 pt-16">
				<NuxtPage />
			</main>
			<Footer />
		</div>
	</UApp>
</template>

<script setup>
useHead({
	htmlAttrs: {
		lang: 'en'
	},
	meta: [
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ name: 'application-name', content: SITE_NAME },
		{ name: 'description', content: SITE_DESCRIPTION },
		{ name: 'author', content: PERSON_NAME },
		{ name: 'theme-color', content: THEME_COLOR },
		{ name: 'color-scheme', content: 'dark light' },
		{ name: 'apple-mobile-web-app-capable', content: 'yes' },
		{ name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
		{ name: 'mobile-web-app-capable', content: 'yes' },
		{ name: 'msapplication-TileColor', content: THEME_COLOR }
	],
	link: [
		{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		{ rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon-180.png' },
		{ rel: 'manifest', href: '/site.webmanifest' }
	]
});

useSeoMeta({
	titleTemplate: (title) =>
		title ? `${title} | ${SITE_NAME}` : `${PERSON_NAME} | ${SITE_DESCRIPTION}`,
	description: SITE_DESCRIPTION,
	ogTitle: `${PERSON_NAME}`,
	ogDescription: SITE_DESCRIPTION,
	ogImage: `${SITE_URL}/og.png`,
	ogImageWidth: 1200,
	ogImageHeight: 630,
	ogLocale: 'en_US',
	ogType: 'website',
	ogSiteName: SITE_NAME,
	ogUrl: SITE_URL,
	twitterTitle: PERSON_NAME,
	twitterDescription: SITE_DESCRIPTION,
	twitterImage: `${SITE_URL}/og.png`,
	twitterCard: 'summary_large_image',
	twitterCreator: '@gmitch215'
});
</script>
