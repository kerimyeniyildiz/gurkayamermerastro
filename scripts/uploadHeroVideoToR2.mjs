import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const requiredVars = ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_S3_ENDPOINT'];
for (const key of requiredVars) {
  if (!process.env[key]) throw new Error(`Eksik environment değişkeni: ${key}`);
}

const localPath = path.resolve(process.cwd(), process.env.R2_HERO_LOCAL_FILE || 'Hero.mp4');
if (!fs.existsSync(localPath)) {
  throw new Error(`Video dosyası bulunamadı: ${localPath}`);
}

const key = (process.env.R2_HERO_VIDEO_KEY || 'Hero.mp4').replace(/^\/+/, '');

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

await s3.send(
  new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: fs.createReadStream(localPath),
    ContentType: 'video/mp4',
    CacheControl: 'public, max-age=31536000, immutable',
  }),
);

const publicBase = (process.env.R2_PUBLIC_URL || 'https://cdn.gurkayamermer.com/').replace(/\/$/, '');
console.log(`Yüklendi: ${key}`);
console.log(`CDN URL: ${publicBase}/${key}`);
