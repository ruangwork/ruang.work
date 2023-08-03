import { CollectionEntry, getCollection } from 'astro:content'

import i18next from 'i18next'

const filterNotDraftPublished = ({ id, data }: CollectionEntry<'blog'>) =>
	id.startsWith(`${i18next.language}/`) && !data.draft && new Date(data.date).getTime() < new Date().getTime()

export const getArticles = async () => await getCollection('blog', filterNotDraftPublished)

export const recentArticle = (collections: CollectionEntry<'blog'>[]) => {
	return collections.sort((a, b) => {
		if (!a?.data?.date && !b?.data?.date) {
			return 0 // neither object has a date property
		}
		if (!a?.data?.date) {
			return 1 // a is missing date, so b should come first
		}
		if (!b?.data?.date) {
			return -1 // b is missing date, so a should come first
		}

		return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
	})
}
