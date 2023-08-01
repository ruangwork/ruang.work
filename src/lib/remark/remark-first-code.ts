import { visit } from 'unist-util-visit'

export function remarkFirstCode() {
	return async function (tree: any, { data }: any) {
		let found = false
		visit(tree, 'html', function (node) {
			if (!found) {
				data.astro.frontmatter.code = node ?? null
				found = true
			}
		})
	}
}
