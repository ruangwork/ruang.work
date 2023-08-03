import { getCollection } from 'astro:content'

import rss from '@astrojs/rss'

export async function get(context) {
	const blog = await getCollection('blog')
	return rss({
		title: 'Buzz’s Blog',
		description: 'A humble Astronaut’s guide to the stars',
		site: context.site,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.excerpt,
			// Compute RSS link from post `slug`
			// This example assumes all posts are rendered as `/blog/[slug]` routes
			link: `/${post.slug}`,
		})),
	})
}
