import { defineCollection, z } from "astro:content";
import { AUTHORS, type AuthorId } from "./config";

// Extract author IDs dynamically from AUTHORS object
const authorIds = Object.keys(AUTHORS) as [AuthorId, ...AuthorId[]];

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.enum(authorIds).default("ajmasia"),
    date: z.coerce.date(),
    heroImage: z.string().optional(),
    showHeroImage: z.boolean().default(true),
    tags: z.array(z.string()).optional(),
    lang: z.enum(["en", "es"]).default("es"),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog };
