import React from 'react';
import { GHARGLOW_CONTACT } from '../data/products';
import { MessageCircle, Instagram, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#14081c] border-t border-[#311444] text-[#e4d8f0] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2d123e]">
          {/* Brand & Permanent Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-2xl text-[#f8c2d3]">Ghar</span>
              <span className="font-serif font-semibold text-2xl text-white tracking-wider">Glow</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f8c2d3]" />
            </div>

            {/* Permanent brand tagline */}
            <p className="text-base font-serif italic text-[#fbdde6] max-w-sm">
              “For the moments that make a place feel like home.”
            </p>

            <p className="text-xs text-[#bba4cc] max-w-sm leading-relaxed">
              Handcrafted floral candles, traditional pure-ghee ful vatis, and earthen pantis poured with pure intentions and generational heritage.
            </p>

            {/* Understated genuine social links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${GHARGLOW_CONTACT.phoneWhatsApp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#250f35] hover:bg-[#3d1856] text-[#f8c2d3] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`https://instagram.com/${GHARGLOW_CONTACT.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#250f35] hover:bg-[#3d1856] text-[#f8c2d3] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${GHARGLOW_CONTACT.email}`}
                className="w-8 h-8 rounded-full bg-[#250f35] hover:bg-[#3d1856] text-[#f8c2d3] flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Simple Navigation */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-widest font-semibold text-[#f8c2d3]">
              Navigation
            </p>
            <ul className="space-y-2 text-xs font-medium text-[#d3c0e3]">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('collection')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('why-choose-us')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Why GharGlow
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('delivery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Delivery & Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Varieties Quick Jump */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs uppercase tracking-widest font-semibold text-[#f8c2d3]">
              Signature Offerings
            </p>
            <ul className="space-y-1.5 text-xs text-[#bfaacb]">
              <li>Traditional Pure-Ghee Panti Diya</li>
              <li>Rose-Design Floating Candles (₹150)</li>
              <li>Rose-Scented Floating Candles (₹160)</li>
              <li>Pink Motichoor Laddu Candles (₹140)</li>
              <li>Green Rose Pure Ghee Ful Vatis</li>
              <li>Chandan & Kewra Fragrance Ful Vatis</li>
              <li>Kapoor & Bhimsen Camphor Vatis</li>
              <li>Artisanal Brass & Filigree Lanterns</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9d81ad]">
          <p>© 2026 GharGlow Boutique. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-xs text-[#d3c0e3]">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#f8c2d3] fill-[#f8c2d3]" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
