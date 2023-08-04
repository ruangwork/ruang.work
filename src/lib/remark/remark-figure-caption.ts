import { visit } from 'unist-util-visit'

export function remarkFigureCaption() {
	return async function (tree: any) {
		visit(tree, 'paragraph', (node, index, parent) => {
			if (!hasImages(node)) {
				return
			}

			const figureNodes = node.children.map((child: any) => {
				if (child.type === 'mdxJsxFlowElement' && child.name === '__AstroImage__') {
					const { attributes } = child
					const titleAttr = attributes.find((attr: any) => attr.name === 'title')
					const captionText = titleAttr ? titleAttr.value : ''

					if (captionText === '') {
						return child
					}

					const figcaptionNode = {
						type: 'mdxJsxFlowElement',
						name: 'figcaption',
						attributes: [],
						children: [{ type: 'text', value: captionText }],
						position: child.position,
					}

					return {
						type: 'mdxJsxFlowElement',
						name: 'figure',
						attributes: [],
						children: [child, figcaptionNode],
						position: child.position,
					}
				} else {
					return child
				}
			})

			node.children = figureNodes
		})
	}
}
const hasImages = (node: any) => {
	return node.children.some((child: any) => child.type === 'mdxJsxFlowElement' && child.name === '__AstroImage__')
}
