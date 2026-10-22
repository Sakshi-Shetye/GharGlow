import React, { useState } from 'react';
import { ProductVariety } from './types/candle';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RitualLightingStudio } from './components/RitualLightingStudio';
import { Collection } from './components/Collection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { DeliverySection } from './components/DeliverySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductVariety | null>(null);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateUserImage = (productId: string, imageUrl: string) => {
    // updates persistent custom photo in state/localStorage
    console.log(`Updated photo for ${productId}`);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#2b143a] flex flex-col font-sans selection:bg-[#fbdde6] selection:text-[#2b143a]">
      {/* Top Bar Navigation */}
      <Header
        onSelectCategory={() => handleScrollTo('collection')}
        onOpenContact={() => handleScrollTo('contact')}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Section A: Homepage Hero */}
        <Hero
          onExploreClick={() => handleScrollTo('collection')}
          onTryLighting={() => handleScrollTo('interactive-lighting')}
        />

        {/* Interactive Lighting Studio: Demonstrates Matchstick-to-Wick Physics */}
        <RitualLightingStudio
          onOpenDetails={(p) => setSelectedProduct(p)}
          onUpdateUserImage={handleUpdateUserImage}
        />

        {/* Section B: Collection Page (All 12 varieties + lanterns) */}
        <Collection
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickLight={(p) => {
            setSelectedProduct(p);
          }}
        />

        {/* Section C: About Section */}
        <AboutSection />

        {/* Section D: Why Choose Us Section */}
        <WhyChooseUs />

        {/* Section F: Delivery and Orders Section */}
        <DeliverySection />

        {/* Section G: Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal (PDP) */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSelectRelated={(p) => setSelectedProduct(p)}
          onUpdateUserImage={handleUpdateUserImage}
        />
      )}
    </div>
  );
}
