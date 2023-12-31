import { CollectionEntry, getCollection } from 'astro:content'

import i18next from 'i18next'

const filterLangNotDraftPublished = ({ id, data }: CollectionEntry<'series'>) =>
	id.startsWith(`${i18next.language}/`) && !data.draft && new Date(data.date).getTime() < new Date().getTime()

export const filterNotDraftPublished = ({ data }: CollectionEntry<'series'>) =>
	!data.draft && new Date(data.date).getTime() < new Date().getTime()

export const getSeries = async () => await getCollection('series', filterLangNotDraftPublished)

export const recentSeries = (collections: CollectionEntry<'series'>[]) => {
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
