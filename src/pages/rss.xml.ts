import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE } from "../config.ts";

export async function GET(context: APIContext) {
  const posts = await getCollection(
    "blog",
    ({ data }) => data.draft !== true && data.lang === "es",
  );

  // Sort posts by date (most recent first)
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: SITE.title,
    description: SITE.description || `Blog de ${SITE.author}`,
    site: context.site?.toString() || SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description || "",
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
