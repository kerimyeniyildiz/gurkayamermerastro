import React, { useState } from 'react';
import { PRODUCTS, CONTACT_INFO } from '../constants';
import { ArrowRight } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const [activeBrand, setActiveBrand] = useState<'Granit' | 'Belenco' | 'Çimstone'>('Granit');
  const filteredProducts = PRODUCTS.filter((p) => p.brand === activeBrand);

  return (
    <section id="products" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-700 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Koleksiyon</span>
          <h2 className="font-serif text-4xl md:text-5xl text-emerald-950 mb-6">Taşın En Saf Hali</h2>
          <p className="text-stone-500 max-w-xl mx-auto font-light leading-relaxed">
            Dünyanın en prestijli markalarını Gürkaya işçiliği ile birleştiriyoruz.
            Eviniz için en doğru taşı seçin.
          </p>
        </div>

        <div className="flex justify-center mb-12 border-b border-stone-100">
          <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-16 gap-y-4 pb-4">
            {(['Granit', 'Belenco', 'Çimstone'] as const).map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`text-lg md:text-xl font-serif transition-all duration-300 relative px-2 ${
                  activeBrand === brand ? 'text-emerald-950 font-medium' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {brand}
                {activeBrand === brand && <span className="absolute -bottom-[17px] left-0 w-full h-1 bg-amber-700 rounded-t-full"></span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 rounded-sm mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {product.popular && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-emerald-950 text-[10px] font-bold uppercase tracking-widest px-3 py-2 shadow-sm">
                    Öne Çıkan
                  </div>
                )}
                <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Merhaba, ${product.brand} ${product.name} modeli hakkında fiyat almak istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-emerald-950 px-6 py-3 rounded-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl"
                  >
                    Fiyat İste
                  </a>
                </div>
              </div>

              <div className="flex justify-between items-baseline border-b border-stone-100 pb-4">
                <div>
                  <h3 className="font-serif text-2xl text-emerald-950 mb-1 group-hover:text-amber-700 transition-colors cursor-pointer">{product.name}</h3>
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{product.brand}</span>
                </div>
                <div className="hidden group-hover:block animate-fade-in text-amber-700">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
