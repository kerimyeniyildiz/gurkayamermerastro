import React from 'react';
import { CONTACT_INFO } from '../constants';
import type { ActivePage } from './SiteHeader';

interface SiteFooterProps {
  activePage: ActivePage;
}

export const SiteFooter: React.FC<SiteFooterProps> = () => {
  return (
    <footer className="bg-emerald-950 text-white/80 py-16 border-t border-emerald-900">
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="md:w-1/3">
            <div className="font-serif text-2xl text-white mb-2">G�RKAYA</div>
            <p className="text-emerald-200/60 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Mermer ve granitin sanata d�n�_t�� yer. 0stanbul Sultangazi'de 15 y1ll1k tecr�be ile hizmetinizdeyiz.
            </p>
          </div>

          <div className="flex gap-8 text-sm font-medium flex-wrap justify-center">
            <a href="/kurumsal" className="hover:text-white transition-colors">Kurumsal</a>
            <a href="/#products" className="hover:text-white transition-colors">Koleksiyon</a>
            <a href="/#portfolio" className="hover:text-white transition-colors">Referanslar</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <a href="/iletisim" className="hover:text-white transition-colors">0leti_im</a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-emerald-900 text-xs text-emerald-200/40 text-center">
          � {new Date().getFullYear()} G�rkaya Mermer Granit. T�m haklar1 sakl1d1r.
        </div>

        <div className="mt-4 text-center text-xs text-emerald-200/40">
          <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition-colors">{CONTACT_INFO.displayPhone}</a>
        </div>
      </div>
    </footer>
  );
};
