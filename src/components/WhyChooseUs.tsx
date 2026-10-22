import React from 'react';
import { Heart, Sparkles, Flame, Gift } from 'lucide-react';
import bannerImage from '../assets/images/why_choose_candlelight_1792694544157.jpg';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Handmade with care',
      description: 'Carefully poured by skilled artisans using slow cooling processes for an even, smooth burn and radiant flame.',
      icon: Heart,
    },
    {
      title: 'Thoughtful designs',
      description: 'Sculpted silhouettes—from motichoor laddu forms to floating rose petals—designed to bring joy to any setting.',
      icon: Sparkles,
    },
    {
      title: 'A touch of tradition',
      description: 'Pure organic cow ghee, red cotton baatis, and natural temple florals honouring generational rituals.',
      icon: Flame,
    },
    {
      title: 'Special little gifts',
      description: 'Elegantly packaged for festive diwali hampers, housewarmings, weddings, and mindful everyday gestures.',
      icon: Gift,
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-[#faf7f2] text-[#2b143a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#a8527a] mb-2">
            <span>Mindful Artistry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1e0f2b] tracking-tight mb-3">
            Why Choose GharGlow
          </h2>
          <p className="text-base font-serif italic text-[#724566]">
            Every flame is poured with dedication to purity, memory, and sacred warmth.
          </p>
        </div>

        {/* Four evenly spaced feature columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center p-6 bg-[#fdfaf7] rounded-2xl border border-[#ebd8e2]/80 shadow-2xs hover:shadow-xs transition-all"
              >
                {/* Delicate blush circular icon background */}
                <div className="w-14 h-14 rounded-full bg-[#fbdde6] border border-[#f8c2d3] flex items-center justify-center text-[#3c1a53] mb-5 shadow-2xs">
                  <Icon className="w-6 h-6 text-[#a8527a]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-serif font-semibold text-[#1e0f2b] mb-2">
                  {feature.title}
                </h3>

                {/* Thin divider */}
                <div className="w-8 h-px bg-[#ebd8e2] mb-3" />

                {/* Short description */}
                <p className="text-xs sm:text-sm text-[#6e4663] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Finishing wide, warm candlelit floral photograph */}
        <div className="relative rounded-3xl overflow-hidden border border-[#ebd8e2] shadow-xl aspect-16/9 sm:aspect-21/9 max-h-[460px]">
          <img
            src={bannerImage}
            alt="Warm candlelit floral display of diyas and petals"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b0c24]/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 text-white max-w-xl pointer-events-none">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#f8c2d3]">
              The Festive Sanctuary
            </span>
            <p className="text-lg sm:text-2xl font-serif italic text-white mt-1 leading-snug">
              “Light that transforms a house into a sanctuary of warmth and togetherness.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
