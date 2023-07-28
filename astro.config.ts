import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import { remarkFirstCode } from "./src/lib/remark/remark-first-code";
import { remarkReadingTime } from "./src/lib/remark/remark-reading-time";
import image from "@astrojs/image";
import { toString } from "mdast-util-to-string";
import remarkExpressiveCode from "remark-expressive-code";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  integrations: [
    astroI18next(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx({
      remarkPlugins: [remarkExpressiveCode, remarkReadingTime, remarkFirstCode],
      syntaxHighlight: "shiki",
      extendMarkdownConfig: true,
      rehypePlugins: [
        rehypeHeadingIds,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "before",
            content: (node: unknown) => {
              return [h("span.sr-only", `go to ${toString(node)} section`)];
            },
          },
        ],
      ],
    }),
    react(),
  ],
});
