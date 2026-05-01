import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blogs' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    date: z.coerce.date(),
    description: z.string(),
    seoDescription: z.string().optional(),
    image: z.string().default('/not-found.jpg'),
    alt: z.string().default('Blog post image'),
    ogImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(true),
  }),
});

export const collections = { blogs };
