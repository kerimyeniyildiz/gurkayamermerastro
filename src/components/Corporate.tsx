import React from 'react';
import { Target, Users, History, CheckCircle2 } from 'lucide-react';

export const Corporate: React.FC = () => {
  return (
    <section id="corporate" className="py-24 bg-stone-50 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-950/5 skew-x-12 translate-x-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
              <img 
                src="https://cdn.gurkayamermer.com/site-images/corporate/corporate-cover.jpg" 
                alt="Gürkaya Mermer Atölye ve İşçilik" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Experience Badge */}
              <div className="absolute bottom-8 left-8 bg-white p-6 shadow-lg border-l-4 border-amber-600 max-w-[200px]">
                <div className="text-4xl font-serif font-bold text-emerald-950 mb-1">15+</div>
                <div className="text-stone-500 text-sm font-medium uppercase tracking-wider">Yıllık Tecrübe</div>
              </div>
            </div>
            
            {/* Pattern Decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-amber-600/30 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-950/5 -z-10"></div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <span className="text-amber-700 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Hakkımızda</span>
            <h2 className="font-serif text-4xl md:text-5xl text-emerald-950 mb-6 leading-tight">
              Taşa Şekil Veren <br/>
              <span className="italic text-stone-400">Ustalık Hikayesi</span>
            </h2>
            
            <p className="text-stone-600 text-lg leading-relaxed mb-8 font-light">
              Gürkaya Mermer olarak, İstanbul Sultangazi'de başladığımız yolculuğumuzda, doğal taşın zarafetini modern yaşam alanlarıyla buluşturuyoruz. Mermer, granit, porselen ve kuvars yüzeylerdeki uzmanlığımızla, mutfak ve banyoları sadece bir kullanım alanı değil, birer sanat eserine dönüştürüyoruz.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="flex gap-4">
                <div className="mt-1 bg-emerald-100 p-2 rounded-full h-fit text-emerald-800">
                  <Target size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-emerald-950 mb-2">Vizyonumuz</h4>
                  <p className="text-sm text-stone-500">Dünya standartlarında malzeme kalitesini, kusursuz işçilikle birleştirerek sektörde referans noktası olmak.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-amber-100 p-2 rounded-full h-fit text-amber-800">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-emerald-950 mb-2">Müşteri Odaklılık</h4>
                  <p className="text-sm text-stone-500">Sadece satış değil, satış sonrası destek ve garanti hizmetlerimizle ailenizin mermercisi olmak.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-8">
              <h4 className="font-serif text-xl text-emerald-950 mb-4">Neden Gürkaya?</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Zamanında Teslimat Garantisi",
                  "Ücretsiz Keşif ve Projelendirme",
                  "1. Sınıf İşçilik ve Montaj",
                  "Geniş Ürün Yelpazesi"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-stone-600 text-sm">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
