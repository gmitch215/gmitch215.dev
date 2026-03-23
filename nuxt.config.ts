import tailwindcss from '@tailwindcss/vite';
import { definePerson } from 'nuxt-schema-org/schema';

export default defineNuxtConfig({
	ssr: true,
	compatibilityDate: '2025-12-13',
	devtools: { enabled: process.env.NODE_ENV !== 'production' },
	srcDir: 'src',
	css: ['~/assets/css/main.css'],
	app: {
		head: {
			link: [
				{ rel: 'preconnect', href: 'https://cdn.gmitch215.dev' },
				{ rel: 'dns-prefetch', href: 'https://cdn.gmitch215.dev' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
				{ rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
				{ rel: 'preconnect', href: 'https://skillicons.dev' },
				{ rel: 'dns-prefetch', href: 'https://skillicons.dev' }
			]
		}
	},
	nitro: {
		preset: 'static',
		prerender: {
			crawlLinks: true,
			routes: ['/', '/sitemap.xml']
		}
	},
	vite: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		plugins: [tailwindcss() as any]
	},
	modules: [
		'@nuxt/content',
		'@nuxt/image',
		'@nuxtjs/robots',
		'@nuxtjs/sitemap',
		'nuxt-schema-org',
		'@nuxt/hints',
		[
			'@nuxtjs/google-fonts',
			{
				families: {
					'Noto+Sans': true
				}
			}
		],
		[
			'@nuxt/icon',
			{
				icon: {
					mode: 'css',
					cssLayer: 'base',
					size: '48px'
				}
			}
		]
	],
	experimental: {
		renderJsonPayloads: true,
		viewTransition: true
	},
	schemaOrg: {
		identity: definePerson({
			name: 'Gregory Mitchell',
			image: '/pictures/gregory-thinking.png',
			description: 'FullStack Software Engineer, Game Developer, Sunglasses Enthusiast',
			url: 'gmitch215.dev',
			sameAs: [
				'https://x.com/gmitch215',
				'https://github.com/gmitch215',
				'https://instagram.com/gmitch215'
			]
		})
	}
});
