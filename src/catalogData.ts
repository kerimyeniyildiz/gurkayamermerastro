import type { CatalogItem, CatalogMenu } from './types';

const toBrandSlug = (value: string) =>
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

export const CATALOG_MENU_STRUCTURE: CatalogMenu[] = [
  {
    title: 'Kuvars',
    key: 'kuvars',
    items: [
      'Belenco',
      'Belenco Seta',
      'Silestone-Polished',
      'Silestone S.V.',
      'Coante',
      'Çimstone',
      'Granit'
    ]
  },
  {
    title: 'Porselen',
    key: 'porselen',
    items: [
      'Laminam',
      'Neolith',
      'Dekton',
      'Sapienstone',
      'Infinity',
      'Level',
      'Materia',
      'Mytop',
      'T-One',
      'Florim',
      'Fiandre',
      'Lamar',
      'Anatolia',
      'Ng Stone',
      'Inalco',
      'Versace Ceramics'
    ]
  }
];

// Helper to generate mock products for any brand
const generateProducts = (brandName: string, count: number, startImageIndex: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${toBrandSlug(brandName)}-${i}`,
    name: `${brandName} Model ${i + 1}`,
    brand: brandName,
    image: `https://images.unsplash.com/photo-${startImageIndex + i}?q=80&w=600&auto=format&fit=crop`,
    popular: i === 0
  }));
};

// Database imitating the content for each page
export const CATALOG_DATA: Record<string, CatalogItem> = {};

// Populate Kuvars Data
CATALOG_MENU_STRUCTURE[0].items.forEach((brand, index) => {
  const id = toBrandSlug(brand);
  CATALOG_DATA[id] = {
    id,
    title: brand,
    category: 'kuvars',
    description: `${brand} kuvars yüzeyler, mutfak ve banyolarınız için üstün dayanıklılık ve estetik sunar. Leke tutmaz, çizilmez ve hijyeniktir.`,
    coverImage: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?q=80&w=1200&auto=format&fit=crop',
    products: generateProducts(brand, 6, 1567225557590 + index) // Randomizing images slightly
  };
});

// Populate Porselen Data
CATALOG_MENU_STRUCTURE[1].items.forEach((brand, index) => {
  const id = toBrandSlug(brand);
  CATALOG_DATA[id] = {
    id,
    title: brand,
    category: 'porselen',
    description: `${brand} porselen serisi, İtalyan estetiğini ve ileri teknolojiyi bir araya getiriyor. Isıya dayanıklı, geniş ebatlı ve mimari projeler için mükemmeldir.`,
    coverImage: 'https://images.unsplash.com/photo-1615971677499-54678dd53f7d?q=80&w=1200&auto=format&fit=crop',
    products: generateProducts(brand, 8, 1615971677490 + index)
  };
});
