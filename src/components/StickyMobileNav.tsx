import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const StickyMobileNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-100 px-3 py-2 md:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      <div className="flex gap-2">
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex-1 bg-emerald-950 text-white h-10 rounded-full flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
        >
          <Phone size={16} className="fill-current" />
          <span className="font-bold text-[13px] leading-none">Hemen Ara</span>
        </a>

        <a
          href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Merhaba, fiyat teklifi almak istiyorum.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.3] bg-amber-500 text-emerald-950 h-10 rounded-full flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
        >
          <MessageCircle size={18} className="stroke-[2.5px]" />
          <span className="font-bold text-[13px] leading-none">Ücretsiz Fiyat Teklifi</span>
        </a>
      </div>
    </div>
  );
};