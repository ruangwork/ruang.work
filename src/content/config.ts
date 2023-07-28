import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).default(["anonymous"]), // the same as the filename without the extension
    image: z.string().optional(),
    date: z.date(),
    desc: z.string(),
    topics: z.array(z.string()).default([]), // the same as the filename without the extension
    tags: z.array(z.string()).default([]),
  }),
});

const topic = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

const snippet = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.date(),
  }),
});

const author = defineCollection({
  schema: ({ image }) =>
    z.object({
      firstname: z.string(),
      lastname: z.string(),
      avatar: image().refine((img) => img.width >= 96, {
        message: "Author avatar image must be at least 96 pixels wide!",
      }),
      // socials
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
    }),
});

export const collections = { author, blog, snippet, topic };
