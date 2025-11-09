import tailwindcss from '@tailwindcss/vite';
import { definePerson } from 'nuxt-schema-org/schema';

export default defineNuxtConfig({
	ssr: true,
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	srcDir: 'src',
	css: ['~/assets/css/main.css'],
	nitro: {
		preset: 'static',
		prerender: {
			crawlLinks: true,
			routes: ['/', '/sitemap.xml']
		}
	},
	vite: {
		plugins: [tailwindcss()]
	},
	modules: [
		'@nuxt/content',
		'@nuxt/image',
		'@nuxtjs/robots',
		'@nuxtjs/sitemap',
		'nuxt-schema-org',
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
	schemaOrg: {
		identity: definePerson({
			name: 'Gregory Mitchell',
			image: '/pictures/gregory-thinking.png',
			description: 'FullStack Software Engineer & Game Developer',
			url: 'gmitch215.dev',
			sameAs: [
				'https://x.com/gmitch215',
				'https://github.com/gmitch215',
				'https://instagram.com/gmitch215'
			]
		})
	}
});
