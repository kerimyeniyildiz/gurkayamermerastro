import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { CATALOG_DATA } from '../catalogData';

const SITE_URL = ((import.meta.env.PUBLIC_SITE_URL as string | undefined) || 'https://gurkayamermer.com').replace(/\/$/, '');

const staticPaths = ['/', '/kurumsal', '/iletisim', '/blog'];
const catalogPaths = Object.keys(CATALOG_DATA).map((brandId) => `/katalog/${brandId}`);

// MainLayout kanonik adresleri sondaki eğik çizgiyle üretiyor
// (ör. https://gurkayamermer.com/kurumsal/). Site haritası da aynı biçimi
// kullanmalı; aksi halde her sayfada kanonik ile site haritası çelişir.
const toUrlTag = (path: string) => {
  const normalized = path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`;
  const loc = `${SITE_URL}${normalized}`;
  return `<url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>${path === '/' ? '1.0' : '0.8'}</priority></url>`;
};

export const GET: APIRoute = async () => {
  // Blog yazıları artık repodaki markdown dosyalarından geliyor.
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  const blogPaths = posts.map((post) => `/blog/${post.id}`);

  const urls = [...staticPaths, ...catalogPaths, ...blogPaths].map(toUrlTag).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
