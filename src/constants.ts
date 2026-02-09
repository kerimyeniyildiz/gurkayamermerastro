import type { ContactInfo, Product, Testimonial } from './types';

export const CONTACT_INFO: ContactInfo = {
  phone: '+905358740960',
  displayPhone: '0535 874 09 60',
  whatsapp: '905358740960',
  email: 'gurkayamermergranitt@gmail.com',
  address: 'Malkoçoğlu Mah. Eski Edirne Asfaltı 817-819/C Sultangazi, İstanbul',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Malkoçoğlu+Mah.+Eski+Edirne+Asfaltı+817-819/C+Sultangazi,+İstanbul',
};

const CDN_BASE = 'https://cdn.gurkayamermer.com/catalog-images';

export const PRODUCTS: Product[] = [
  // Granit
  { id: 'g1', name: 'Absolute Black A', brand: 'Granit', image: `${CDN_BASE}/GRANIT/Absolute-Black-A-Klt.jpg`, popular: true },
  { id: 'g2', name: 'Bianco Carrara A', brand: 'Granit', image: `${CDN_BASE}/GRANIT/Bianco-Carrara-A-Klt.jpg` },
  { id: 'g3', name: 'Kashmir White', brand: 'Granit', image: `${CDN_BASE}/GRANIT/Kashmir-White.jpg` },
  { id: 'g4', name: 'Star Galaxy Extra A', brand: 'Granit', image: `${CDN_BASE}/GRANIT/Star-Galaxy-Extra-A-Kalite.jpg` },
  { id: 'g5', name: 'Verde Ubaduba Gold', brand: 'Granit', image: `${CDN_BASE}/GRANIT/Verde-Ubaduba-Gold.jpg` },
  { id: 'g6', name: 'Crema Perla', brand: 'Granit', image: `${CDN_BASE}/GRANIT/Crema-Perla.jpg` },

  // Belenco
  { id: 'b1', name: 'Perla White', brand: 'Belenco', image: `${CDN_BASE}/BELENCO/Perla-White.jpg`, popular: true },
  { id: 'b2', name: 'Fairy White', brand: 'Belenco', image: `${CDN_BASE}/BELENCO/Fairy-White.jpg` },
  { id: 'b3', name: 'Kashmera White', brand: 'Belenco', image: `${CDN_BASE}/BELENCO/Kashmera-White.jpg` },
  { id: 'b4', name: 'Calacatta Venezia', brand: 'Belenco', image: `${CDN_BASE}/BELENCO/Calacatta-Venezia.jpg` },
  { id: 'b5', name: 'Statuario Vera', brand: 'Belenco', image: `${CDN_BASE}/BELENCO/Statuario-Vera.jpg` },
  { id: 'b6', name: 'Volcano Black', brand: 'Belenco', image: `${CDN_BASE}/BELENCO/Volcano-Black.jpg` },

  // Çimstone
  { id: 'c1', name: 'Arcadia', brand: 'Çimstone', image: `${CDN_BASE}/CIMSTONE/ARCADIA.jpg`, popular: true },
  { id: 'c2', name: 'Olympos', brand: 'Çimstone', image: `${CDN_BASE}/CIMSTONE/OLYMPOS.jpg` },
  { id: 'c3', name: 'Versilia', brand: 'Çimstone', image: `${CDN_BASE}/CIMSTONE/VERSILIA.jpg` },
  { id: 'c4', name: 'Terra', brand: 'Çimstone', image: `${CDN_BASE}/CIMSTONE/TERRA.jpg` },
  { id: 'c5', name: 'Savana', brand: 'Çimstone', image: `${CDN_BASE}/CIMSTONE/SAVANA.jpg` },
  { id: 'c6', name: 'Boreas', brand: 'Çimstone', image: `${CDN_BASE}/CIMSTONE/BOREAS.jpg` },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Selin Yılmaz',
    location: 'Sultangazi',
    comment: 'Gürkaya ekibine teşekkürler. Belenco Perla mutfağıma çok yakıştı. Söz verdikleri gün montaj yapıldı.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mehmet Demir',
    location: 'Arnavutköy',
    comment: 'Fiyatları piyasaya göre çok makul. İşçilik kalitesi kendini belli ediyor. Kesinlikle tavsiye ederim.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ayşe Kaya',
    location: 'Başakşehir',
    comment: 'Porselen tezgah konusunda endişelerim vardı ama sonuç muazzam. İlginiz için teşekkürler.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Burak Öz',
    location: 'Gaziosmanpaşa',
    comment: 'Eski Edirne Asfaltı üzerindeki showroomlarına gittim, çok ilgilendiler. Güvenilir esnaf.',
    rating: 5,
  },
];
