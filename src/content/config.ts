import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    faq: z.array(z.object({
      q: z.string().optional(),
      a: z.string().optional(),
      question: z.string().optional(),
      answer: z.string().optional(),
    })).default([]),
  }),
});

export const collections = { posts };
