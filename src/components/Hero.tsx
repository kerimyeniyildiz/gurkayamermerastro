import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[650px] md:h-[800px] flex items-center bg-stone-100 overflow-hidden">
      {/* Background Image - Bright Luxury Kitchen */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.gurkayamermer.com/site-images/hero/home-hero.jpg"
          alt="Lüks Mutfak Tezgahı"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50/90 via-stone-50/50 to-transparent md:via-stone-50/20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-10">
        <div className="max-w-2xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-sm">
            <Star size={14} className="text-amber-600 fill-amber-600" />
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-950">Premium Taş Koleksiyonu</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-emerald-950 leading-[1.1] mb-8">
            Mutfağınızın <br />
            <span className="italic text-amber-700 relative">
              Mücevheri
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-700/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed font-light max-w-lg">
            Belenco, Çimstone ve İtalyan Porselen serileriyle, yaşam alanlarınıza zamansız bir estetik katın.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Merhaba, mutfak tezgahı için ücretsiz keşif ve fiyat istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-900 text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-3 group"
            >
              Hemen Fiyat Al
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#products"
              className="px-8 py-4 rounded-md font-medium text-lg text-emerald-950 border border-emerald-950/20 hover:bg-emerald-950 hover:text-white transition-all flex items-center justify-center bg-white/50 backdrop-blur-sm"
            >
              Koleksiyonu İncele
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8 text-stone-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
              15 Yıl Garanti
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
              48 Saatte Teslim
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
