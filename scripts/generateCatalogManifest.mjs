import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), 'CatalogImages');
const outFile = path.resolve(process.cwd(), 'src/data/catalogManifest.ts');

if (!fs.existsSync(root)) {
  throw new Error(`CatalogImages klasoru bulunamadi: ${root}`);
}

const dirs = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort((a, b) => a.localeCompare(b, 'tr'));

const manifest = {};

for (const dir of dirs) {
  const full = path.join(root, dir);
  const files = fs
    .readdirSync(full, { withFileTypes: true })
    .filter((f) => f.isFile())
    .map((f) => f.name)
    .filter((name) => /\.(jpg|jpeg|png|webp|avif)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, 'tr'));

  manifest[dir] = files;
}

const content = `export const CATALOG_MANIFEST = ${JSON.stringify(manifest, null, 2)} as const;\n`;
fs.writeFileSync(outFile, content, 'utf8');
console.log(`Manifest olusturuldu: ${outFile}`);
