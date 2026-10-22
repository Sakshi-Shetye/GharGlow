import React, { useState } from 'react';
import { Heart, Sparkles, Gift, X } from 'lucide-react';
import aboutImage from '../assets/images/about_floral_candles_1792694543438.jpg';

export const AboutSection: React.FC = () => {
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <section id="about" className="py-20 bg-[#faf7f2] text-[#2b143a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Sincere Copy, Circular Icons, and "Our Story" button */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#a8527a]">
              <span className="w-6 h-px bg-[#a8527a]" />
              <span>Our Heritage & Craft</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1e0f2b] tracking-tight leading-tight">
              About GharGlow
            </h2>

            <div className="space-y-4 text-base text-[#4f256d] leading-relaxed font-light">
              <p>
                In Indian culture, light is never merely decorative—it is an invitation. An invitation for peace to settle into a room, for family to gather, and for the familiar aromas of pure cow ghee, chandan, and fresh roses to ground us.
              </p>
              <p>
                GharGlow was born from a desire to preserve these gentle rituals. We handcraft each diya, floating rose blossom, and pure-ghee ful vati using honest ingredients, natural botanical extracts, and time-honoured techniques.
              </p>
              <p className="font-serif italic text-lg text-[#2b143a]">
                “For the moments that make a place feel like home.”
              </p>
            </div>

            {/* Three small circular blush-pink icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3">
              {/* Icon 1: Handmade with love */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#fbdde6] border border-[#f8c2d3] flex items-center justify-center text-[#3c1a53] shrink-0 shadow-2xs">
                  <Heart className="w-5 h-5 text-[#a8527a]" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-semibold text-[#1e0f2b]">Handmade with love</h3>
                  <p className="text-xs text-[#724566] leading-snug">Mindful small batches</p>
                </div>
              </div>

              {/* Icon 2: Thoughtful traditions */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#fbdde6] border border-[#f8c2d3] flex items-center justify-center text-[#3c1a53] shrink-0 shadow-2xs">
                  <Sparkles className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-semibold text-[#1e0f2b]">Thoughtful traditions</h3>
                  <p className="text-xs text-[#724566] leading-snug">Pure cow ghee & cotton wicks</p>
                </div>
              </div>

              {/* Icon 3: Meaningful gifting */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#fbdde6] border border-[#f8c2d3] flex items-center justify-center text-[#3c1a53] shrink-0 shadow-2xs">
                  <Gift className="w-5 h-5 text-[#a8527a]" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-semibold text-[#1e0f2b]">Meaningful gifting</h3>
                  <p className="text-xs text-[#724566] leading-snug">Festive keepsakes & boxes</p>
                </div>
              </div>
            </div>

            {/* Small rounded dark-purple button: "Our Story" */}
            <div className="pt-2">
              <button
                onClick={() => setShowStoryModal(true)}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#3c1a53] hover:bg-[#4f256d] rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                Our Story
              </button>
            </div>
          </div>

          {/* Right Column: Atmospheric Floral Arrangement Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#ebd8e2] shadow-xl aspect-4/3 sm:aspect-5/4">
              <img
                src={aboutImage}
                alt="Atmospheric GharGlow floral candle arrangement with soft pink roses and glowing candles"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e0f2b]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                <p className="text-xs tracking-wider uppercase font-semibold text-[#fbdde6]">
                  The Sanctuary of Home
                </p>
                <p className="text-sm font-serif italic text-white/90">
                  Bathed in natural amber light, soft lavender, and damask roses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "Our Story" Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#14081b]/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#faf7f2] rounded-3xl border border-[#ebd8e2] p-8 sm:p-10 shadow-2xl text-[#2b143a]">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white hover:bg-[#fbdde6] text-[#4f256d] border border-[#ebd8e2] flex items-center justify-center cursor-pointer"
              aria-label="Close story"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-semibold uppercase tracking-widest text-[#a8527a]">
              The GharGlow Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1e0f2b] mt-1 mb-4">
              The Meaning of Ghar & Glow
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#4f256d] leading-relaxed font-light">
              <p>
                In Hindi, <em>Ghar</em> is more than four walls and a roof. It is the warmth of childhood evenings, the scent of the temple corner before dinner, and the reassurance that wherever life takes you, there is a place where you belong.
              </p>
              <p>
                When modern candles flooded the market with petroleum paraffin and synthetic chemicals that burned black and smoked heavily, we realized the essence of traditional light was being lost. Our grandparents lit pantis filled with pure cow ghee and cotton spun by hand. It cleansed the air, gave off a warm amber luminescence, and burned completely pure.
              </p>
              <p>
                GharGlow unites this ancestral wisdom with modern boutique aesthetics. Each variety—from our pure-ghee chandan and kewra ful vatis to our sculpted rose floating candles—is hand-poured with love, purity, and mindful devotion.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#ebd8e2] flex justify-end">
              <button
                onClick={() => setShowStoryModal(false)}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#3c1a53] rounded-full hover:bg-[#4f256d] cursor-pointer"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
