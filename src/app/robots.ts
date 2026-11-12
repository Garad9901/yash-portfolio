import type { MetadataRoute } from 'next';
import { person } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${person.site}/sitemap.xml` };
}
