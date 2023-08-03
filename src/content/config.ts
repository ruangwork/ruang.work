import { defineCollection, reference, z } from 'astro:content'

const blog = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			draft: z.boolean().default(false).optional(),
			authors: z.array(z.string()).default(['anonymous']), // the same as the filename without the extension
			cover: image()
				.refine((img) => img.width >= 900, {
					message: 'Cover image must be at least 1080 pixels wide!',
				})
				.optional(),
			date: z.date(),
			excerpt: z.string().refine((string) => string.length <= 140, {
				message: 'excerpt must less than 155',
			}),
			topics: z.array(z.string()).default([]), // the same as the filename without the extension
			tags: z.array(z.string()).default([]),
		}),
})

const topics = defineCollection({
	schema: z.object({
		title: z.string(),
		excerpt: z
			.string()
			.refine((string) => string.length <= 140, {
				message: 'excerpt must less than 155',
			})
			.optional(),
	}),
})

const snippets = defineCollection({
	schema: z.object({
		title: z.string(),
		author: z.string(),
		excerpt: z
			.string()
			.refine((string) => string.length <= 140, {
				message: 'excerpt must less than 155',
			})
			.optional(),
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

const series = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			draft: z.boolean().default(false).optional(),
			authors: z.array(z.string()).default([]), // the same as the filename without the extension
			cover: image()
				.refine((img) => img.width >= 900, {
					message: 'Cover image must be at least 1080 pixels wide!',
				})
				.optional(),
			date: z.date(),
			excerpt: z.string().refine((string) => string.length <= 140, {
				message: 'excerpt must less than 155',
			}),
			articles: z.array(z.string()).default([]), // the same as the filename without the extension
		}),
})

export const collections = { author, blog, snippets, topics, series }
