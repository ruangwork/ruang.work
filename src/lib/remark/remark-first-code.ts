import { visit } from 'unist-util-visit'

export function remarkFirstCode() {
	return async function (tree: any, { data }: any) {
		visit(tree, 'html', function (node, index) {
			if (index == 1) {
				data.astro.frontmatter.code = node ?? null
			}
		})
	}
}
