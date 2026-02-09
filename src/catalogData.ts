import type { Product, CatalogItem, CatalogMenu } from './types';
import { CATALOG_MANIFEST } from './data/catalogManifest';

export const toBrandSlug = (value: string) =>
  value
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s.-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/\./g, '');

const BRAND_LABELS: Record<string, string> = {
  BELENCO: 'Belenco',
  'BELENCO-SETA': 'Belenco Seta',
  'SILESTONE-POLISHED': 'Silestone-Polished',
  'SILESTONE-SV': 'Silestone S.V.',
  COANTE: 'Coante',
  CIMSTONE: 'Çimstone',
  GRANIT: 'Granit',
  LAMINAM: 'Laminam',
  NEOLITH: 'Neolith',
  DEKTON: 'Dekton',
  SAPIENSTONE: 'Sapienstone',
  INFINITY: 'Infinity',
  LEVEL: 'Level',
  MATERIA: 'Materia',
  MYTOP: 'Mytop',
  'T-ONE': 'T-One',
  FLORIM: 'Florim',
  FIANDRE: 'Fiandre',
  LAMAR: 'Lamar',
  MAXTONE: 'Maxtone',
  ANATOLIA: 'Anatolia',
  'NG-STONE': 'Ng Stone',
  INALCO: 'Inalco',
  'VERSACE-CERAMICS': 'Versace Ceramics',
};

const QUARTZ_BRANDS = ['BELENCO', 'BELENCO-SETA', 'SILESTONE-POLISHED', 'SILESTONE-SV', 'COANTE', 'CIMSTONE', 'GRANIT'];
const PORCELAIN_BRANDS = [
  'LAMINAM',
  'NEOLITH',
  'DEKTON',
  'SAPIENSTONE',
  'INFINITY',
  'LEVEL',
  'MATERIA',
  'MYTOP',
  'T-ONE',
  'FLORIM',
  'FIANDRE',
  'LAMAR',
  'MAXTONE',
  'ANATOLIA',
  'NG-STONE',
  'INALCO',
  'VERSACE-CERAMICS',
];

const r2PublicUrl = ((import.meta.env.PUBLIC_R2_PUBLIC_URL as string | undefined) || 'https://cdn.gurkayamermer.com/').replace(/\/$/, '');
const catalogPrefix = ((import.meta.env.PUBLIC_R2_CATALOG_PREFIX as string | undefined) || 'catalog-images').replace(/^\/+|\/+$/g, '');

const toFileUrl = (folder: string, fileName: string) =>
  `${r2PublicUrl}/${catalogPrefix}/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`;

const toModelName = (fileName: string) =>
  fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const buildProducts = (folder: string): Product[] => {
  const files = [...(CATALOG_MANIFEST[folder as keyof typeof CATALOG_MANIFEST] || [])];

  return files.map((file, index) => ({
    id: `${toBrandSlug(folder)}-${index}`,
    name: toModelName(file),
    brand: BRAND_LABELS[folder] || folder,
    image: toFileUrl(folder, file),
    popular: index === 0,
  }));
};

export const CATALOG_MENU_STRUCTURE: CatalogMenu[] = [
  {
    title: 'Kuvars',
    key: 'kuvars',
    items: QUARTZ_BRANDS.map((folder) => BRAND_LABELS[folder]),
  },
  {
    title: 'Porselen',
    key: 'porselen',
    items: PORCELAIN_BRANDS.map((folder) => BRAND_LABELS[folder]),
  },
];

const folderToCategory: Record<string, 'kuvars' | 'porselen'> = {};
for (const folder of QUARTZ_BRANDS) folderToCategory[folder] = 'kuvars';
for (const folder of PORCELAIN_BRANDS) folderToCategory[folder] = 'porselen';

export const CATALOG_DATA: Record<string, CatalogItem> = {};

Object.keys(folderToCategory).forEach((folder) => {
  const category = folderToCategory[folder];
  const brandTitle = BRAND_LABELS[folder] || folder;
  const id = toBrandSlug(brandTitle);
  const products = buildProducts(folder);
  const coverImage = products[0]?.image || `${r2PublicUrl}/site-images/fallback/catalog-cover.jpg`;

  CATALOG_DATA[id] = {
    id,
    title: brandTitle,
    category,
    description:
      category === 'kuvars'
        ? `${brandTitle} kuvars koleksiyonu, dayanıklılık ve estetiği bir araya getirir. Leke tutmayan yüzeyiyle mutfak ve banyo için idealdir.`
        : `${brandTitle} porselen koleksiyonu, yüksek ısı dayanımı ve modern yüzey seçenekleriyle mimari projeler için güçlü bir çözümdür.`,
    coverImage,
    products,
  };
});
