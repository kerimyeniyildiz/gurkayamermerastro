import React from 'react';
import { ShieldCheck, Ruler, Truck, Award } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    title: '10 Yıl Garanti',
    description: 'Tüm Belenco ve Çimstone tezgahlarımız resmi üretici garantisi altındadır.',
  },
  {
    icon: <Ruler size={32} strokeWidth={1.5} />,
    title: 'Milimetrik Ölçü',
    description: 'Lazer teknoloji ile sıfır hata payı. Yerinde ücretsiz keşif hizmeti.',
  },
  {
    icon: <Truck size={32} strokeWidth={1.5} />,
    title: 'Hızlı Teslimat',
    description: 'Stoktan anında üretim ile 2-3 iş günü içinde mutfağınız hazır.',
  },
  {
    icon: <Award size={32} strokeWidth={1.5} />,
    title: 'Usta İşçilik',
    description: '15 yıllık tecrübe ile birleşimi belli olmayan pürüzsüz montaj.',
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-emerald-950 text-white relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-t border-emerald-800/50 pt-12">
          {features.map((feature, idx) => (
            <div key={idx} className="group">
              <div className="mb-6 text-amber-500 group-hover:text-amber-400 transition-colors duration-300">{feature.icon}</div>
              <h3 className="font-serif text-xl mb-3 text-white tracking-wide">{feature.title}</h3>
              <p className="text-emerald-200/60 text-sm leading-relaxed font-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
