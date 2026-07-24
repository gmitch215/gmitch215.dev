import { defineCollection, defineContentConfig, z } from '@nuxt/content';

const flagship = z.object({
	name: z.string(),
	url: z.string(),
	stars: z.number().optional(),
	description: z.string().optional()
});

export default defineContentConfig({
	collections: {
		content: defineCollection({
			type: 'page',
			source: {
				include: '**/*.md',
				exclude: ['story/**', 'projects/**'],
				cwd: './src/content'
			},
			schema: z.object({
				title: z.string().optional(),
				description: z.string().optional(),
				updated: z.string().optional()
			})
		}),
		story: defineCollection({
			type: 'page',
			source: {
				include: 'story/**/*.md',
				cwd: './src/content'
			},
			schema: z.object({
				order: z.number(),
				year: z.string(),
				era: z.string(),
				headline: z.string(),
				tagline: z.string().optional(),
				commits: z.number().optional(),
				scene: z
					.enum(['none', 'globe', 'curve', 'stack', 'constellation', 'handle'])
					.default('none'),
				image: z.string().optional(),
				accent: z.string().optional(),
				flagship: flagship.optional()
			})
		}),
		projects: defineCollection({
			type: 'page',
			source: {
				include: 'projects/**/*.md',
				cwd: './src/content'
			},
			schema: z.object({
				name: z.string(),
				repo: z.string().optional(),
				url: z.string(),
				stars: z.number().optional(),
				period: z.string().optional(),
				era: z.string().optional(),
				languages: z.array(z.string()).default([]),
				category: z.string().optional(),
				categories: z.array(z.string()).default([]),
				spiget: z.number().optional(),
				featured: z.boolean().default(false),
				archived: z.boolean().default(false),
				order: z.number().default(0)
			})
		})
	}
});
