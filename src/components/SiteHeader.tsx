import React, { useEffect, useState } from 'react';
import { Phone, Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { CATALOG_MENU_STRUCTURE } from '../catalogData';

export type ActivePage = 'home' | 'corporate' | 'contact' | 'blog' | 'catalog';

interface SiteHeaderProps {
  activePage: ActivePage;
}

const createBrandId = (brand: string) =>
  brand
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s.-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/\./g, '');

export const SiteHeader: React.FC<SiteHeaderProps> = ({ activePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);

  const toggleMobileCategory = (key: string) => {
    setMobileExpandedCategory(mobileExpandedCategory === key ? null : key);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }

    document.body.style.overflow = '';
    return undefined;
  }, [isMenuOpen]);

  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-stone-100 sticky top-0 z-[70] shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <a href="/" className="flex flex-col group z-50">
          <span className="font-serif text-2xl md:text-3xl font-bold text-emerald-950 tracking-tight group-hover:opacity-80 transition-opacity">GÜRKAYA</span>
          <span className="text-[10px] font-medium text-amber-700 tracking-normal uppercase -mt-1 ml-1 whitespace-nowrap">İSTANBUL'UN EN UYGUN MERMER FİRMASI</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-stone-600">
          <a href="/kurumsal" className={`transition-colors ${activePage === 'corporate' ? 'text-emerald-900 font-bold' : 'hover:text-emerald-900'}`}>
            Kurumsal
          </a>

          <div className="group relative h-full py-4 -my-4">
            <button className={`flex items-center gap-1 transition-colors h-full ${activePage === 'catalog' ? 'text-emerald-900 font-bold' : 'hover:text-emerald-900'}`}>
              Ürün Kataloğu <ChevronDown size={14} />
            </button>

            <div className="hidden group-hover:block absolute top-full left-0 w-48 bg-white border border-stone-100 shadow-xl rounded-sm py-2 animate-fade-in">
              {CATALOG_MENU_STRUCTURE.map((category) => (
                <div key={category.key} className="group/sub relative">
                  <button className="w-full text-left px-4 py-3 hover:bg-stone-50 text-stone-700 hover:text-emerald-900 flex justify-between items-center">
                    {category.title}
                    <ChevronRight size={14} className="text-stone-400" />
                  </button>

                  <div className="hidden group-hover/sub:block absolute left-full top-0 w-64 bg-white border border-stone-100 shadow-xl rounded-sm py-2 ml-0.5 max-h-[500px] overflow-y-auto no-scrollbar">
                    {category.items.map((brand) => (
                      <a
                        key={brand}
                        href={`/katalog/${createBrandId(brand)}`}
                        className="block px-5 py-2.5 text-stone-600 hover:text-emerald-900 hover:bg-stone-50 transition-colors text-sm"
                      >
                        {brand}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a href="/#portfolio" className="hover:text-emerald-900 transition-colors">
            Projeler
          </a>

          <a href="/blog" className={`transition-colors ${activePage === 'blog' ? 'text-emerald-900 font-bold' : 'hover:text-emerald-900'}`}>
            Blog
          </a>

          <a href="/iletisim" className={`transition-colors ${activePage === 'contact' ? 'text-emerald-900 font-bold' : 'hover:text-emerald-900'}`}>
            İletişim
          </a>

          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="flex items-center gap-2 bg-emerald-900 text-white px-5 py-2.5 rounded-md hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/20 active:translate-y-0.5"
          >
            <Phone size={16} />
            {CONTACT_INFO.displayPhone}
          </a>
        </nav>

        <button className="md:hidden text-emerald-950 p-2 z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-white md:hidden animate-fade-in">
          <div className="h-full flex flex-col">
            <div className="border-b border-stone-100 px-6 py-4 flex items-center justify-between">
              <a href="/" className="flex flex-col group">
                <span className="font-serif text-2xl font-bold text-emerald-950 tracking-tight">GÜRKAYA</span>
                <span className="text-[10px] font-medium text-amber-700 tracking-normal uppercase -mt-1 ml-1 whitespace-nowrap">
                  İSTANBUL'UN EN UYGUN MERMER FİRMASI
                </span>
              </a>
              <button type="button" aria-label="Menüyü kapat" className="text-emerald-950 p-2" onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 pt-6 pb-28 flex flex-col gap-4 text-lg font-serif text-emerald-950">
            <a href="/" className="border-b border-stone-100 pb-3">
              Ana Sayfa
            </a>
            <a href="/kurumsal" className="border-b border-stone-100 pb-3">
              Kurumsal
            </a>
            <a href="/katalog/belenco" className="border-b border-stone-100 pb-3">
              Katalog
            </a>

            <div className="border-b border-stone-100 pb-3">
              <div className="font-bold text-emerald-900 mb-2">Ürün Kataloğu</div>
              <div className="pl-4 border-l-2 border-stone-100 flex flex-col gap-3">
                {CATALOG_MENU_STRUCTURE.map((cat) => (
                  <div key={cat.key}>
                    <button
                      onClick={() => toggleMobileCategory(cat.key)}
                      className="flex items-center justify-between w-full text-left text-base font-medium text-stone-700 py-1"
                    >
                      {cat.title}
                      <ChevronDown size={16} className={`transition-transform ${mobileExpandedCategory === cat.key ? 'rotate-180' : ''}`} />
                    </button>

                    {mobileExpandedCategory === cat.key && (
                      <div className="pl-4 mt-2 flex flex-col gap-2 animate-fade-in text-sm text-stone-500 font-sans">
                        {cat.items.map((brand) => (
                          <a key={brand} href={`/katalog/${createBrandId(brand)}`} className="py-1 block">
                            {brand}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <a href="/#portfolio" className="border-b border-stone-100 pb-3">
              Projeler
            </a>
            <a href="/blog" className="border-b border-stone-100 pb-3">
              Blog
            </a>
            <a href="/iletisim" className="border-b border-stone-100 pb-3">
              İletişim
            </a>
            <a href={`tel:${CONTACT_INFO.phone}`} className="mt-4 flex items-center justify-center gap-2 bg-emerald-950 text-white py-4 rounded-lg">
              <Phone size={20} />
              Hemen Ara
            </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
