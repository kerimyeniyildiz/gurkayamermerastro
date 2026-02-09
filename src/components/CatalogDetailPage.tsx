import React from 'react';
import { CATALOG_DATA } from '../catalogData';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface CatalogDetailPageProps {
  brandId: string;
}

export const CatalogDetailPage: React.FC<CatalogDetailPageProps> = ({ brandId }) => {
  const data = CATALOG_DATA[brandId];

  if (!data) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif text-emerald-950 mb-4">Katalog Bulunamadı</h2>
        <a href="/" className="text-amber-600 hover:underline">Geri Dön</a>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-emerald-950/40 z-10"></div>
        <img src={data.coverImage} alt={data.title} loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <span className="text-amber-400 font-bold tracking-[0.2em] uppercase text-xs mb-3 border border-amber-400/50 px-3 py-1 rounded-full">
            {data.category === 'porselen' ? 'Porselen Koleksiyonu' : 'Kuvars Koleksiyonu'}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">{data.title}</h1>
          <p className="text-white/90 max-w-2xl font-light text-lg">{data.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <a href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-emerald-900 transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Koleksiyonlara Dön</span>
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.products.map((product, idx) => (
            <div key={product.id} className="group bg-stone-50 rounded-lg overflow-hidden border border-stone-100 hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading={idx < 8 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Merhaba, ${product.brand} - ${product.name} modeli için fiyat alabilir miyim?`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-emerald-950 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-amber-500 hover:text-white transition-colors"
                  >
                    <MessageCircle size={16} />
                    Fiyat Al
                  </a>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg text-emerald-950 truncate">{product.name}</h3>
                <p className="text-stone-500 text-xs uppercase tracking-wider mt-1">{data.category}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-emerald-950 rounded-2xl text-center text-white">
          <h3 className="font-serif text-2xl mb-4">Aradığınız rengi bulamadınız mı?</h3>
          <p className="text-emerald-100/70 mb-6 max-w-lg mx-auto">
            Stoklarımız sürekli güncellenmektedir. Tüm renk kartelası ve özel siparişler için bizimle iletişime geçin.
          </p>
          <a href={`tel:${CONTACT_INFO.phone}`} className="inline-block bg-amber-600 text-white px-8 py-3 rounded-md font-bold hover:bg-amber-700 transition-colors">
            Müşteri Temsilcisini Ara
          </a>
        </div>
      </div>
    </div>
  );
};
