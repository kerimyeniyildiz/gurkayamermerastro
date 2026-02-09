import React, { useMemo, useRef, useState } from 'react';
import { Play, ArrowUpRight, X } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const PROJECTS = [
  {
    id: 1,
    title: 'Belenco Perla',
    location: 'Kemerburgaz',
    image: 'https://cdn.gurkayamermer.com/catalog-images/BELENCO/Perla-White.jpg',
    desc: 'Ada Mutfak Uygulaması',
  },
  {
    id: 2,
    title: 'Porselen Calacatta',
    location: 'Göktürk',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    desc: 'Duvar Paneli & Tezgah',
  },
  {
    id: 3,
    title: 'Çimstone Arcadia',
    location: 'Başakşehir',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&auto=format&fit=crop',
    desc: 'L Tipi Mutfak',
  },
  {
    id: 4,
    title: 'Picasso Black',
    location: 'Zekeriyaköy',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
    desc: 'Mat Siyah Tasarım',
  },
];

export const Portfolio: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);

  const videoUrl = useMemo(() => {
    const direct = import.meta.env.PUBLIC_PORTFOLIO_VIDEO_URL as string | undefined;
    if (direct && direct.trim()) return direct.trim();

    const base = (import.meta.env.PUBLIC_R2_PUBLIC_URL as string | undefined) || 'https://cdn.gurkayamermer.com/';
    return `${base.replace(/\/$/, '')}/Hero.mp4`;
  }, []);

  const handlePreviewLoadedData = () => {
    const video = previewVideoRef.current;
    if (!video) return;

    try {
      video.currentTime = 0.12;
      video.pause();
    } catch {
      // Keep the browser-selected first frame if seeking is blocked.
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-amber-700 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Seçkin Projeler</span>
            <h2 className="font-serif text-4xl md:text-5xl text-emerald-950">Referanslarımız</h2>
          </div>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Referans görsellerinizi inceledim, daha fazla örnek görebilir miyim?`}
            className="group hidden md:flex items-center gap-2 text-stone-600 hover:text-emerald-900 transition-colors border-b border-stone-300 pb-1"
          >
            Tüm Projeleri İncele <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              onClick={() => idx === 0 && setIsVideoOpen(true)}
              className={`group relative overflow-hidden rounded-lg text-left ${idx === 0 ? 'cursor-pointer' : 'cursor-default'} ${
                idx === 0 ? 'lg:col-span-2 lg:row-span-2 aspect-[4/3]' : 'aspect-square'
              }`}
            >
              {idx === 0 ? (
                <video
                  ref={previewVideoRef}
                  src={videoUrl}
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedData={handlePreviewLoadedData}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              )}

              <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/10 transition-colors" />

              {idx === 0 && (
                <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 pointer-events-none">
                  <Play size={24} className="fill-white text-white ml-1" />
                </div>
              )}

              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">{project.location}</span>
                <h3 className="font-serif text-2xl text-white mb-1">{project.title}</h3>
                <p className="text-stone-300 text-sm">{project.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="flex w-full items-center justify-center gap-2 py-4 border border-stone-300 rounded-lg text-stone-600 font-medium hover:bg-stone-100">
            Daha Fazla Proje Gör
          </a>
        </div>
      </div>

      {isVideoOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIsVideoOpen(false)}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white/90 hover:text-white transition-colors"
              aria-label="Videoyu kapat"
            >
              <X size={28} />
            </button>

            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
              <video className="w-full h-full" controls autoPlay playsInline preload="metadata" poster={PROJECTS[0].image}>
                <source src={videoUrl} type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
