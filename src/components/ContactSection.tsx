import React from 'react';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#d69e2e 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Bize Ulaşın</span>
            <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">
              Hayalinizdeki Mutfağı <br/> <span className="text-amber-500 italic">Tasarlayalım.</span>
            </h2>
            <p className="text-emerald-100/70 text-lg mb-10 font-light max-w-md">
              Sultangazi'deki atölyemize kahve içmeye bekleriz. Veya dilerseniz biz size numunelerle gelelim.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-emerald-900 rounded-full text-amber-500">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <h4 className="font-serif text-xl mb-1">Adres</h4>
                    <p className="text-emerald-100/60 font-light">{CONTACT_INFO.address}</p>
                    <a href={CONTACT_INFO.mapLink} target="_blank" rel="noopener noreferrer" className="text-amber-500 text-sm mt-2 inline-block border-b border-amber-500/50 hover:border-amber-500 pb-0.5">Yol Tarifi Al</a>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="p-3 bg-emerald-900 rounded-full text-amber-500">
                    <Phone size={24} />
                 </div>
                 <div>
                    <h4 className="font-serif text-xl mb-1">Telefon</h4>
                    <p className="text-emerald-100/60 font-light">7/24 WhatsApp & Çağrı</p>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="text-white text-lg font-medium mt-1 inline-block hover:text-amber-500 transition-colors">{CONTACT_INFO.displayPhone}</a>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl shadow-black/20 text-emerald-950">
             <h3 className="font-serif text-3xl mb-4">Hızlı Teklif Formu</h3>
             <p className="text-stone-500 mb-8 font-light">
               Hiç uğraşmayın, direkt WhatsApp'tan yazın. Fotoğraf gönderin, anında fiyat alın.
             </p>

             <a 
               href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Merhaba, fiyat teklifi almak istiyorum.`}
               target="_blank" 
               rel="noopener noreferrer"
               className="group w-full bg-emerald-950 text-white py-5 rounded-md font-medium text-lg flex items-center justify-center gap-3 hover:bg-emerald-900 transition-all shadow-lg"
             >
               WhatsApp Başlat
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-amber-500" />
             </a>
             
             <div className="mt-8 pt-6 border-t border-stone-100 text-center">
                <p className="text-stone-400 text-sm">Veya bizi arayın:</p>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-xl font-serif font-bold mt-1 block hover:text-amber-700 transition-colors">
                  {CONTACT_INFO.displayPhone}
                </a>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};