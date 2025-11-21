import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().default("ajmasia"),
    date: z.coerce.date(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    lang: z.enum(["en", "es"]).default("es"),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog };
