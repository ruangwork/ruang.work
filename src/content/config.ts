import { defineCollection, reference, z } from 'astro:content'

const blog = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			draft: z.boolean().default(false).optional(),
			authors: z.array(reference('author')).default(['anonymous']), // the same as the filename without the extension
			cover: image()
				.refine((img) => img.width >= 900, {
					message: 'Cover image must be at least 1080 pixels wide!',
				})
				.optional(),
			date: z.date(),
			excerpt: z.string(),
			topics: z.array(z.string()).default([]), // the same as the filename without the extension
			tags: z.array(z.string()).default([]),
		}),
})

const topics = defineCollection({
	schema: z.object({
		title: z.string(),
	}),
})

const snippets = defineCollection({
	schema: z.object({
		title: z.string(),
		author: z.string(),
		date: z.date(),
	}),
})

const author = defineCollection({
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			avatar: image()
				.refine((img) => img.width >= 96, {
					message: 'Author avatar image must be at least 96 pixels wide!',
				})
				.optional(),
			// socials
			twitter: z.string().optional(),
			github: z.string().optional(),
			linkedin: z.string().optional(),
		}),
})

export const collections = { author, blog, snippets, topics }
