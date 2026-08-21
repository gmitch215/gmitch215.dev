import { definePerson } from 'nuxt-schema-org/schema';

export default defineNuxtConfig({
	ssr: true,
	compatibilityDate: '2025-12-13',
	devtools: { enabled: process.env.NODE_ENV !== 'production' },
	srcDir: 'src',
	site: {
		url: 'https://gmitch215.dev',
		name: 'Gregory R. Mitchell'
	},
	css: ['~/assets/css/main.css'],
	components: [{ path: '~/components', pathPrefix: false }],
	app: {
		head: {
			link: [
				{ rel: 'preconnect', href: 'https://cdn.gmitch215.dev' },
				{ rel: 'dns-prefetch', href: 'https://cdn.gmitch215.dev' },
				{ rel: 'preconnect', href: 'https://gravatar.com' },
				{ rel: 'dns-prefetch', href: 'https://gravatar.com' }
			]
		}
	},
	nitro: {
		preset: 'static',
		prerender: {
			crawlLinks: true,
			routes: ['/', '/sitemap.xml'],
			ignore: ['/gregory-mitchell-cv.pdf']
		}
	},
	modules: [
		'@nuxt/ui',
		'@vueuse/nuxt',
		'@tresjs/nuxt',
		'@nuxt/content',
		'@nuxt/image',
		'@nuxtjs/robots',
		'@nuxtjs/sitemap',
		'nuxt-schema-org',
		'@nuxt/hints'
	],
	colorMode: {
		preference: 'dark',
		fallback: 'dark'
	},
	image: {
		format: ['avif', 'webp'],
		quality: 80,
		domains: ['skillicons.dev', 'cdn.gmitch215.dev']
	},
	icon: {
		clientBundle: {
			scan: true,
			sizeLimitKb: 512,
			icons: [
				'lucide:sparkles',
				'lucide:folder-git-2',
				'lucide:file-text',
				'lucide:pen-line',
				'lucide:user',
				'lucide:heart',
				'lucide:gauge',
				'lucide:flame',
				'lucide:diamond',
				'lucide:minus',
				'lucide:power',
				'lucide:check',
				'lucide:boxes',
				'lucide:bot',
				'lucide:cloud',
				'lucide:coffee',
				'lucide:terminal',
				'lucide:cpu',
				'lucide:arrow-down',
				'lucide:arrow-up-right',
				'lucide:chevrons-down',
				'lucide:menu',
				'lucide:mail',
				'lucide:star',
				'lucide:download',
				'lucide:quote',
				'lucide:layers',
				'lucide:package',
				'lucide:badge-check',
				'lucide:book-open',
				'lucide:git-fork',
				'lucide:globe',
				'lucide:house',
				'lucide:rocket',
				'lucide:git-pull-request'
			]
		}
	},
	experimental: {
		renderJsonPayloads: true,
		viewTransition: true
	},
	schemaOrg: {
		identity: definePerson({
			name: 'Gregory Mitchell',
			image: '/pictures/gregory-thinking.png',
			description: 'FullStack Software Engineer, Game Developer, Sunglasses Enthusiast',
			url: 'https://gmitch215.dev',
			jobTitle: 'Software Engineer',
			alumniOf: 'Dartmouth College',
			knowsAbout: [
				'Kotlin',
				'Java',
				'TypeScript',
				'C',
				'Cloudflare Workers',
				'Full-Stack Development',
				'Developer Tooling'
			],
			award: 'Congressional App Challenge 2025 Winner (Illinois 2nd District)',
			sameAs: [
				'https://github.com/gmitch215',
				'https://x.com/gmitch215',
				'https://instagram.com/gmitch215',
				'https://www.linkedin.com/in/gmitch215',
				'https://wakatime.com/@gmitch215'
			]
		})
	}
});
