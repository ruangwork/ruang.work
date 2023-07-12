import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import { remarkReadingTime } from "./src/lib/remark/remark-reading-time";

import image from "@astrojs/image";
import { toString } from "mdast-util-to-string";

// https://astro.build/config
export default defineConfig({
  integrations: [
    astroI18next(),
    tailwind(),
    mdx({
      remarkPlugins: [remarkReadingTime],
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
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
