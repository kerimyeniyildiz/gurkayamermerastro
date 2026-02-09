import type { APIRoute } from 'astro';
import { CATALOG_DATA } from '../catalogData';

const SITE_URL = ((import.meta.env.PUBLIC_SITE_URL as string | undefined) || 'https://gurkayamermer.com').replace(/\/$/, '');

const staticPaths = ['/', '/kurumsal', '/iletisim', '/blog'];
const catalogPaths = Object.keys(CATALOG_DATA).map((brandId) => `/katalog/${brandId}`);

const toUrlTag = (path: string) => {
  const loc = `${SITE_URL}${path === '/' ? '' : path}`;
  return `<url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>${path === '/' ? '1.0' : '0.8'}</priority></url>`;
};

export const GET: APIRoute = async () => {
  const urls = [...staticPaths, ...catalogPaths].map(toUrlTag).join('');
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
