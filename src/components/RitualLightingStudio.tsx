import React, { useState } from 'react';
import { ProductVariety } from '../types/candle';
import { GHARGLOW_PRODUCTS } from '../data/products';
import { InteractiveProductViewer } from './InteractiveProductViewer';
import { Flame, Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface RitualLightingStudioProps {
  onOpenDetails: (product: ProductVariety) => void;
  onUpdateUserImage?: (productId: string, imageUrl: string) => void;
}

export const RitualLightingStudio: React.FC<RitualLightingStudioProps> = ({
  onOpenDetails,
  onUpdateUserImage,
}) => {
  // Selectable featured products for interactive lighting
  const spotlightProducts = GHARGLOW_PRODUCTS.filter((p) =>
    ['panti-diya-traditional', 'rose-design-floating', 'pink-laddu-candle', 'rose-ghee-ful-vati', 'chandan-ghee-ful-vati'].includes(
      p.id
    )
  );

  const [selectedProduct, setSelectedProduct] = useState<ProductVariety>(
    spotlightProducts[0] || GHARGLOW_PRODUCTS[0]
  );

  return (
    <section id="interactive-lighting" className="py-16 sm:py-20 bg-[#f5ede1] text-[#2b143a] border-y border-[#ebd8e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Studio Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#a8527a] mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Lighting Ritual</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1e0f2b] tracking-tight mb-2">
            Experience the Sacred Glow
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#724566]">
            Drag the burning matchstick to touch the exact tip of the hand-rolled baati (wick).
          </p>
        </div>

        {/* Product selector buttons */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-8">
          {spotlightProducts.map((p) => {
            const isSelected = selectedProduct.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#3c1a53] text-white shadow-sm'
                    : 'bg-white text-[#582a4d] hover:bg-[#ebd8e2] border border-[#ebd8e2]'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: p.authenticColorHex }}
                />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Two-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto bg-[#faf7f2] p-6 sm:p-8 rounded-3xl border border-[#ebd8e2] shadow-sm">
          {/* Left Column: Interactive Product Viewer */}
          <div className="lg:col-span-7">
            <InteractiveProductViewer
              key={selectedProduct.id}
              product={selectedProduct}
              onUpdateUserImage={onUpdateUserImage}
              interactiveMode="full"
            />
          </div>

          {/* Right Column: Physical Authenticity Callouts */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#88547b]">
                {selectedProduct.category}
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#1e0f2b] mt-1 mb-2">
                {selectedProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#5d3055] leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Authenticity rules verification */}
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-[#4f256d]">
                <ShieldCheck className="w-4 h-4 text-[#a8527a] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[#1e0f2b]">Precision Wick Alignment:</strong>{' '}
                  Flame is calibrated to ignite strictly at the physical baati tip ({selectedProduct.wickCoordinate.x}%, {selectedProduct.wickCoordinate.y}%).
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-[#4f256d]">
                <Compass className="w-4 h-4 text-[#a8527a] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[#1e0f2b]">Multi-Angle Inspection:</strong>{' '}
                  Rotate between Front, 3/4 Elevated, and Aarti Top-Down views.
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-[#4f256d]">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[#1e0f2b]">Authentic Ingredients:</strong>{' '}
                  {selectedProduct.fragranceNotes || 'Pure organic clarified cow ghee with cotton wick.'}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#ebd8e2] flex items-center justify-between">
              <div>
                {selectedProduct.isPriceConfirmed ? (
                  <div>
                    <span className="text-xl font-semibold font-mono tabular-nums text-[#1e0f2b]">
                      ₹{selectedProduct.confirmedPrice}
                    </span>
                    <span className="text-xs text-[#784f6c] ml-1.5">
                      ({selectedProduct.packSize})
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-serif italic text-[#7d486d]">
                    Ask for price
                  </span>
                )}
              </div>

              <button
                onClick={() => onOpenDetails(selectedProduct)}
                className="px-4.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#3c1a53] hover:bg-[#4f256d] rounded-full transition-all cursor-pointer shadow-xs"
              >
                View Full Specifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
