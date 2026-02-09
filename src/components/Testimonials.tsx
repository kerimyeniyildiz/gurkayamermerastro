import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-stone-50 border-t border-stone-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl text-emerald-950 mb-4">Müşterilerimiz Ne Diyor?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-sm shadow-sm border border-stone-100 hover:border-amber-200 transition-colors relative">
              <Quote className="absolute top-6 left-6 text-amber-100 fill-amber-50" size={48} />
              
              <div className="relative z-10 pt-4">
                <p className="font-serif text-lg text-stone-700 italic mb-6 leading-relaxed">
                  "{t.comment}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-950 text-amber-400 rounded-full flex items-center justify-center font-serif text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-emerald-950">{t.name}</div>
                    <div className="text-xs text-stone-400 uppercase tracking-wide">{t.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};