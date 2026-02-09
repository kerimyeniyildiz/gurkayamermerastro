import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, Smartphone, Navigation } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen pt-12 animate-fade-in">
      
      {/* Page Header */}
      <div className="bg-emerald-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Bize Ulaşın</span>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">İletişim</h1>
          <p className="text-emerald-100/60 font-light max-w-lg mx-auto text-lg">
            Sorularınız, proje talepleriniz veya showroom ziyareti için bizimle iletişime geçin.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Card 1: Phone */}
          <div className="bg-white p-8 rounded-sm shadow-lg border-t-4 border-amber-500 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-6">
              <Phone size={24} />
            </div>
            <h3 className="font-serif text-xl text-emerald-950 mb-2">Telefon & WhatsApp</h3>
            <p className="text-stone-500 text-sm mb-4">Haftanın her günü 09:00 - 20:00</p>
            <a href={`tel:${CONTACT_INFO.phone}`} className="block text-lg font-bold text-emerald-900 hover:text-amber-600 transition-colors">
              {CONTACT_INFO.displayPhone}
            </a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="text-sm text-emerald-600 font-medium mt-1 inline-flex items-center gap-1 hover:underline">
              WhatsApp'tan Yaz <ArrowRight size={14} />
            </a>
          </div>

          {/* Contact Card 2: Address */}
          <div className="bg-white p-8 rounded-sm shadow-lg border-t-4 border-emerald-600 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6">
              <MapPin size={24} />
            </div>
            <h3 className="font-serif text-xl text-emerald-950 mb-2">Showroom & Atölye</h3>
            <p className="text-stone-500 text-sm mb-4">Sultangazi, İstanbul</p>
            <p className="text-stone-700 font-medium leading-relaxed mb-4">
              {CONTACT_INFO.address}
            </p>
            <a href={CONTACT_INFO.mapLink} target="_blank" rel="noreferrer" className="text-sm text-emerald-600 font-medium inline-flex items-center gap-1 hover:underline">
              Yol Tarifi Al <Navigation size={14} />
            </a>
          </div>

          {/* Contact Card 3: Email/Hours */}
          <div className="bg-white p-8 rounded-sm shadow-lg border-t-4 border-stone-400 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 mb-6">
              <Mail size={24} />
            </div>
            <h3 className="font-serif text-xl text-emerald-950 mb-2">E-Posta</h3>
            <p className="text-stone-500 text-sm mb-4">Projelerinizi bize gönderin</p>
            <a href={`mailto:${CONTACT_INFO.email}`} className="block text-lg font-bold text-emerald-900 hover:text-amber-600 transition-colors break-all">
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>

        {/* Map & Action Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div>
            <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-2 block">Ücretsiz Keşif</span>
            <h2 className="font-serif text-4xl text-emerald-950 mb-6">Mutfağınızın Ölçüsünü <br/> Biz Alalım</h2>
            <p className="text-stone-600 text-lg font-light leading-relaxed mb-8">
              İstanbul içi tüm ilçelere ücretsiz keşif hizmetimiz bulunmaktadır. 
              Uzman ekibimiz yerinde ölçü alır, size en uygun taş önerilerini ve 
              fiyat teklifini sunar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Merhaba, ücretsiz keşif için randevu oluşturmak istiyorum.`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-900 text-white px-8 py-4 rounded-sm flex items-center justify-center gap-3 hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/20"
              >
                <Smartphone size={20} />
                <span>Randevu Oluştur</span>
              </a>
              <a 
                 href={`tel:${CONTACT_INFO.phone}`}
                 className="bg-white border border-stone-300 text-stone-700 px-8 py-4 rounded-sm flex items-center justify-center gap-3 hover:bg-stone-50 transition-all"
              >
                <Phone size={20} />
                <span>Bizi Arayın</span>
              </a>
            </div>
          </div>

          {/* Right: Visual Map Representation */}
          <div className="relative h-[400px] bg-stone-200 rounded-lg overflow-hidden shadow-2xl group">
             {/* Static Map Image / Placeholder */}
             <img 
               src="https://cdn.gurkayamermer.com/site-images/contact/map-cover.jpg" 
               alt="Harita Konumu" 
               loading="lazy"
               decoding="async"
               className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-emerald-950/20 flex items-center justify-center">
                <a 
                  href={CONTACT_INFO.mapLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white text-emerald-950 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <MapPin size={20} className="text-amber-600" />
                  Haritada Göster
                </a>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
