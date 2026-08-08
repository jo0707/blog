import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import { seoData } from '@/data';
import { postUrl } from '@/utils/helper';

const parser = new MarkdownIt({ html: false, linkify: true });

export async function GET(context: APIContext) {
  const posts = (await getCollection('blogs', ({ data }) => data.published))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const site = context.site ?? new URL(seoData.mySite);
  const siteBase = String(site).replace(/\/+$/, '');

  return rss({
    title: seoData.siteName,
    description: seoData.description,
    site,
    items: posts.map((post) => {
      // Render the full markdown body and absolutize root-relative
      // image/link paths so feed readers can resolve them.
      const content = parser
        .render(post.body ?? '')
        .replace(/(src|href)="\//g, `$1="${siteBase}/`);

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: postUrl(post.id),
        categories: post.data.tags,
        content,
      };
    }),
    customData: '<language>en</language>',
  });
}
