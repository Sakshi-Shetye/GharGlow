import React from 'react';
import { Heart, Sparkles, Gift, ArrowDown, Flame } from 'lucide-react';
import heroImage from '../assets/images/hero_candlelit_evening_1792694542926.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onTryLighting: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onTryLighting }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between bg-[#150a1c] overflow-hidden text-white">
      {/* Background with deep midnight plum overlay and atmospheric candlelight photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="GharGlow candlelit boutique atmosphere with glowing candles and soft blossoms"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-screen scale-105 transition-transform duration-1000"
        />
        {/* Cinematic gradient scrims: deep midnight-purple and plum */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#14081b] via-[#1b0c24]/90 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14081b] via-transparent to-[#14081b]/60" />
        {/* Soft amber radial glow simulating gentle candlelight warmth */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 my-auto w-full">
        <div className="max-w-2xl">
          {/* Subtle brand kicker */}
          <div className="flex items-center gap-2 mb-4 text-[#f8c2d3] text-xs uppercase tracking-widest font-semibold">
            <span className="w-6 h-px bg-[#f8c2d3]" />
            <span>Artisan Candle & Pure Ghee Boutique</span>
          </div>

          {/* Large Serif Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-white mb-4 leading-tight">
            Ghar<span className="italic text-[#f8c2d3] font-serif">Glow</span>
          </h1>

          {/* Permanent Brand Tagline */}
          <p className="text-xl sm:text-2xl font-serif italic text-[#fbdde6] mb-6 leading-relaxed max-w-xl">
            “For the moments that make a place feel like home.”
          </p>

          {/* Warm, emotional supporting copy */}
          <p className="text-base sm:text-lg text-[#e4d8f0] font-light leading-relaxed mb-9 max-w-xl">
            For the evenings that feel familiar, the traditions that bring us closer, and the people who make any place feel like home. Hand-poured with pure cow ghee and fragrant floral botanicals.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#1a0b22] bg-[#f8c2d3] hover:bg-[#fad4e1] active:bg-[#f29bb5] rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer flex items-center gap-2.5"
            >
              <span>Explore Collection</span>
              <ArrowDown className="w-4 h-4 text-[#1a0b22]" />
            </button>

            <button
              onClick={onTryLighting}
              className="px-6 py-3.5 text-sm font-medium tracking-wide text-[#fdeef3] bg-[#2a1338]/80 hover:bg-[#3a1a4c] border border-[#f8c2d3]/30 rounded-full transition-all cursor-pointer flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Light a Candle with Matchstick</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hero Brand Values */}
      <div className="relative z-10 border-t border-[#3a174f]/60 bg-[#120718]/85 backdrop-blur-md py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            {/* Value 1: Handmade with care */}
            <div className="flex items-center justify-center sm:justify-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#2c133a] border border-[#f8c2d3]/20 flex items-center justify-center text-[#f8c2d3] shrink-0">
                <Heart className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="text-sm font-serif font-semibold text-white tracking-wide">Handmade with care</h2>
                <p className="text-xs text-[#d1bfdf]">Poured in mindful, small batches</p>
              </div>
            </div>

            {/* Value 2: A touch of tradition */}
            <div className="flex items-center justify-center sm:justify-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#2c133a] border border-[#f8c2d3]/20 flex items-center justify-center text-amber-300 shrink-0">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="text-sm font-serif font-semibold text-white tracking-wide">A touch of tradition</h2>
                <p className="text-xs text-[#d1bfdf]">Authentic cow ghee & red cotton baatis</p>
              </div>
            </div>

            {/* Value 3: Thoughtful gifting */}
            <div className="flex items-center justify-center sm:justify-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#2c133a] border border-[#f8c2d3]/20 flex items-center justify-center text-[#f8c2d3] shrink-0">
                <Gift className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="text-sm font-serif font-semibold text-white tracking-wide">Thoughtful gifting</h2>
                <p className="text-xs text-[#d1bfdf]">Curated hampers for meaningful moments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
