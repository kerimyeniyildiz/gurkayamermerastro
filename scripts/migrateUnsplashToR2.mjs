import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const requiredVars = ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_S3_ENDPOINT'];
for (const key of requiredVars) {
  if (!process.env[key]) throw new Error(`Eksik environment değişkeni: ${key}`);
}

const items = [
  { source: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop', key: 'site-images/hero/home-hero.jpg' },
  { source: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200&auto=format&fit=crop', key: 'site-images/corporate/corporate-cover.jpg' },
  { source: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop', key: 'site-images/contact/map-cover.jpg' },
  { source: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', key: 'site-images/portfolio/project-2.jpg' },
  { source: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&auto=format&fit=crop', key: 'site-images/portfolio/project-3.jpg' },
  { source: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop', key: 'site-images/portfolio/project-4.jpg' },
  { source: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop', key: 'site-images/blog/post-1.jpg' },
  { source: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop', key: 'site-images/blog/post-2.jpg' },
  { source: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop', key: 'site-images/blog/post-3.jpg' },
  { source: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?q=80&w=1200&auto=format&fit=crop', key: 'site-images/fallback/catalog-cover.jpg' },
];

const downloadRoot = path.resolve(process.cwd(), 'ExternalImages', 'unsplash');
fs.mkdirSync(downloadRoot, { recursive: true });

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const toContentType = (fileName, responseType) => {
  if (responseType && responseType.startsWith('image/')) return responseType;
  const ext = path.extname(fileName).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  return 'application/octet-stream';
};

for (const item of items) {
  const localPath = path.join(downloadRoot, item.key.replace(/^site-images\//, ''));
  fs.mkdirSync(path.dirname(localPath), { recursive: true });

  const response = await fetch(item.source);
  if (!response.ok) throw new Error(`İndirme başarısız: ${item.source} (${response.status})`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(localPath, buffer);

  const contentType = toContentType(localPath, response.headers.get('content-type'));
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: item.key,
      Body: fs.createReadStream(localPath),
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );

  console.log(`İndirildi + yüklendi: ${item.key}`);
}

console.log(`Tamamlandı. Toplam dosya: ${items.length}`);
