import { CollectionEntry, getCollection } from 'astro:content'

import i18next from 'i18next'

const filterPublished = ({ id, data }: CollectionEntry<'snippets'>) =>
	id.startsWith(`${i18next.language}/`) && new Date(data.date).getTime() < new Date().getTime()

export const getSnippets = async () => await getCollection('snippets', filterPublished)
