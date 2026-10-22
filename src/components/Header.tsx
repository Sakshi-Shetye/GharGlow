import React, { useState } from 'react';
import { MessageCircle, Menu, X, Sparkles } from 'lucide-react';
import { GHARGLOW_CONTACT } from '../data/products';

interface HeaderProps {
  onSelectCategory?: (category: string) => void;
  onOpenContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectCategory, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello GharGlow! I would like to inquire about your handcrafted candles and pure-ghee ful vatis.`
    );
    window.open(`https://wa.me/${GHARGLOW_CONTACT.phoneWhatsApp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#160a1e]/95 backdrop-blur-md border-b border-[#351547]/50 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('hero');
          }}
          className="text-2xl sm:text-3xl font-serif tracking-wide text-[#fdeef3] hover:text-[#f8c2d3] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="font-serif italic font-normal text-[#f8c2d3]">Ghar</span>
          <span className="font-serif font-semibold tracking-wider text-white">Glow</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f8c2d3] opacity-80" />
        </a>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-[#e4d8f0]">
          <button
            onClick={() => scrollTo('hero')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('collection')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Our Collection
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            About Us
          </button>
          <button
            onClick={() => scrollTo('why-choose-us')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Why GharGlow
          </button>
          <button
            onClick={() => scrollTo('delivery')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Delivery & Orders
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={openWhatsApp}
            className="flex items-center gap-2 px-4.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#1e0f2b] bg-[#f8c2d3] hover:bg-[#fad4e1] active:bg-[#f29bb5] rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order on WhatsApp</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#f8c2d3] hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1a0b24] border-b border-[#351547] px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#e4d8f0]">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left py-1.5 hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('collection')}
              className="text-left py-1.5 hover:text-white transition-colors"
            >
              Our Collection
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-1.5 hover:text-white transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => scrollTo('why-choose-us')}
              className="text-left py-1.5 hover:text-white transition-colors"
            >
              Why GharGlow
            </button>
            <button
              onClick={() => scrollTo('delivery')}
              className="text-left py-1.5 hover:text-white transition-colors"
            >
              Delivery & Orders
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-1.5 hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>
          <div className="pt-2 border-t border-[#351547]/60">
            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1e0f2b] bg-[#f8c2d3] rounded-full transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
