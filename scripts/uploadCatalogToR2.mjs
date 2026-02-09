import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const requiredVars = [
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET_NAME',
  'R2_S3_ENDPOINT',
];

for (const key of requiredVars) {
  if (!process.env[key]) {
    throw new Error(`Eksik environment değişkeni: ${key}`);
  }
}

const catalogRoot = path.resolve(process.cwd(), 'CatalogImages');
if (!fs.existsSync(catalogRoot)) {
  throw new Error(`CatalogImages klasörü bulunamadı: ${catalogRoot}`);
}

const keyPrefix = (process.env.R2_CATALOG_PREFIX || 'catalog-images').replace(/^\/+|\/+$/g, '');

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const contentType = (fileName) => {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.avif') return 'image/avif';
  if (ext === '.mp4') return 'video/mp4';
  return 'application/octet-stream';
};

const folders = fs.readdirSync(catalogRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
let uploaded = 0;

for (const folder of folders) {
  const folderPath = path.join(catalogRoot, folder.name);
  const files = fs.readdirSync(folderPath, { withFileTypes: true }).filter((entry) => entry.isFile());

  for (const file of files) {
    const ext = path.extname(file.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp', '.avif', '.mp4'].includes(ext)) continue;

    const fullPath = path.join(folderPath, file.name);
    const key = `${keyPrefix}/${folder.name}/${file.name}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: fs.createReadStream(fullPath),
        ContentType: contentType(file.name),
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );

    uploaded += 1;
    if (uploaded % 25 === 0) {
      console.log(`Yüklendi: ${uploaded}`);
    }
  }
}

console.log(`Tamamlandı. Toplam yüklenen dosya: ${uploaded}`);
