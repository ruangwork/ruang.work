import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import astroI18next from 'astro-i18next'
import { defineConfig, sharpImageService } from 'astro/config'
import { h } from 'hastscript'
import { toString } from 'mdast-util-to-string'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkExpressiveCode from 'remark-expressive-code'

import { remarkFirstCode } from './src/lib/remark/remark-first-code'
import { remarkReadingTime } from './src/lib/remark/remark-reading-time'

// https://astro.build/config
export default defineConfig({
	base: '/',
	site: 'https://ruang.work',
	experimental: {
		assets: true,
	},
	image: {
		service: sharpImageService(),
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'en',
				// All urls that don't contain `es` or `fr` after `https://stargazers.club/` will be treated as default locale, i.e. `en`
				locales: {
					en: 'en-US',
					// The `defaultLocale` value must present in `locales` keys
					id: 'id-ID',
				},
			},
		}),
		astroI18next(),
		tailwind(),
		mdx({
			remarkPlugins: [remarkExpressiveCode, remarkReadingTime, remarkFirstCode],
			syntaxHighlight: 'shiki',
			extendMarkdownConfig: true,
			rehypePlugins: [
				rehypeHeadingIds,
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'before',
						content: (node: unknown) => {
							return [h('span.sr-only', `go to ${toString(node)} section`)]
						},
					},
				],
			],
		}),
		react(),
	],
})
