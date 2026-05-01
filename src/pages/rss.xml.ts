import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { seoData } from '@/data';
import { postUrl } from '@/utils/helper';

export async function GET() {
  const posts = (await getCollection('blogs', ({ data }) => data.published))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: seoData.siteName,
    description: seoData.description,
    site: seoData.mySite,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post.id),
    })),
    customData: '<language>en</language>',
  });
}
