import { CollectionEntry, getCollection } from 'astro:content'

import i18next from 'i18next'

const filterNotDraftPublished = ({ id }: CollectionEntry<'topics'>) => id.startsWith(`${i18next.language}/`)

export const getTopics = async () => await getCollection('topics', filterNotDraftPublished)
