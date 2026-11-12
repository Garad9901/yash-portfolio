import type { MetadataRoute } from 'next';
import { person } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: person.site, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }];
}
