export interface Product {
  id: string;
  name: string;
  brand: 'Granit' | 'Belenco' | 'Çimstone' | string;
  image: string;
  popular?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  comment: string;
  rating: number;
}

export interface ContactInfo {
  phone: string;
  displayPhone: string;
  whatsapp: string;
  address: string;
  email: string;
  mapLink: string;
}

// New Types for Catalog
export interface CatalogItem {
  id: string;
  title: string; // e.g. "Belenco", "Laminam"
  category: 'kuvars' | 'porselen';
  description?: string;
  coverImage?: string;
  products: Product[];
}

export interface CatalogMenu {
  title: string;
  key: 'kuvars' | 'porselen';
  items: string[]; // List of brand names
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[]; // Paragraphs
  date: string;
  image: string;
  category: string;
}
