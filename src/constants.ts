import type { ContactInfo, Product, Testimonial } from './types';

export const CONTACT_INFO: ContactInfo = {
  phone: "+905358740960",
  displayPhone: "0535 874 09 60",
  whatsapp: "905358740960",
  email: "gurkayamermergranitt@gmail.com",
  address: "Malkoçoğlu Mah. Eski Edirne Asfaltı 817-819/C Sultangazi, İstanbul",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Malkoçoğlu+Mah.+Eski+Edirne+Asfaltı+817-819/C+Sultangazi,+İstanbul"
};

export const PRODUCTS: Product[] = [
  // Porselen (Lüks Segment)
  { id: 'p1', name: 'Rome', brand: 'Porselen', image: 'https://images.unsplash.com/photo-1615971677499-54678dd53f7d?q=80&w=800&auto=format&fit=crop', popular: true },
  { id: 'p2', name: 'Crystal White', brand: 'Porselen', image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=800&auto=format&fit=crop', popular: true },
  { id: 'p3', name: 'Picasso Black', brand: 'Porselen', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop', popular: true },
  // Belenco (Popüler)
  { id: 'b1', name: 'Perla', brand: 'Belenco', image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?q=80&w=800&auto=format&fit=crop', popular: true },
  { id: 'b2', name: 'Fairy White', brand: 'Belenco', image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=800&auto=format&fit=crop', popular: true },
  { id: 'b3', name: 'Kashmera White', brand: 'Belenco', image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=800&auto=format&fit=crop' },
  // Çimstone (Klasik)
  { id: 'c1', name: 'Arcadia', brand: 'Çimstone', image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=800&auto=format&fit=crop', popular: true },
  { id: 'c2', name: 'Olympos', brand: 'Çimstone', image: 'https://images.unsplash.com/photo-1567225509424-5078eeb51274?q=80&w=800&auto=format&fit=crop', popular: true },
  { id: 'c3', name: 'Versilia', brand: 'Çimstone', image: 'https://images.unsplash.com/photo-1533090631336-c4b958863155?q=80&w=800&auto=format&fit=crop' },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Selin Yılmaz", location: "Sultangazi", comment: "Gürkaya ekibine teşekkürler. Belenco Perla mutfağıma çok yakıştı. Söz verdikleri gün montaj yapıldı.", rating: 5 },
  { id: 2, name: "Mehmet Demir", location: "Arnavutköy", comment: "Fiyatları piyasaya göre çok makul. İşçilik kalitesi kendini belli ediyor. Kesinlikle tavsiye ederim.", rating: 5 },
  { id: 3, name: "Ayşe Kaya", location: "Başakşehir", comment: "Porselen tezgah konusunda endişelerim vardı ama sonuç muazzam. İlginiz için teşekkürler.", rating: 5 },
  { id: 4, name: "Burak Öz", location: "Gaziosmanpaşa", comment: "Eski Edirne Asfaltı üzerindeki showroomlarına gittim, çok ilgilendiler. Güvenilir esnaf.", rating: 5 },
];
