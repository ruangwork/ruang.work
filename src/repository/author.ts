import { CollectionEntry, getCollection, getEntries, getEntryBySlug } from 'astro:content'

import i18next from 'i18next'

const filter = ({ id }: CollectionEntry<'author'>) => id.startsWith(`${i18next.language}/`)

export const getAuthors = async () => await getCollection('author', filter)

export const getAuthorsBySlugs = async (collection: string, authors: string[]) =>
	await getEntries(
		// @ts-ignore
		authors.map((author) => {
			return { collection, slug: `${i18next.language}/${author}` }
		})
	)
