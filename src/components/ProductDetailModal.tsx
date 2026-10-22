import React, { useState } from 'react';
import { ProductVariety } from '../types/candle';
import { GHARGLOW_CONTACT, GHARGLOW_PRODUCTS } from '../data/products';
import { InteractiveProductViewer } from './InteractiveProductViewer';
import { X, MessageCircle, Heart, Check, Clock, Sparkles, ShieldCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductVariety;
  onClose: () => void;
  onSelectRelated: (product: ProductVariety) => void;
  onUpdateUserImage?: (productId: string, imageUrl: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectRelated,
  onUpdateUserImage,
}) => {
  const [selectedPack, setSelectedPack] = useState<string>(product.packSize || 'Standard Box');
  const [quantity, setQuantity] = useState<number>(1);
  const [isFav, setIsFav] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('gharglow_favorites');
      return saved ? !!JSON.parse(saved)[product.id] : false;
    } catch {
      return false;
    }
  });

  const toggleFavorite = () => {
    try {
      const saved = localStorage.getItem('gharglow_favorites');
      const parsed = saved ? JSON.parse(saved) : {};
      parsed[product.id] = !isFav;
      localStorage.setItem('gharglow_favorites', JSON.stringify(parsed));
      setIsFav(!isFav);
    } catch {
      // ignore
    }
  };

  const handleWhatsAppOrder = () => {
    const priceText = product.isPriceConfirmed
      ? `₹${product.confirmedPrice} (${product.packSize || '1 pack'})`
      : 'Price on request';
    const message = encodeURIComponent(
      `Hello GharGlow! I would like to order:
- Product: ${product.name}
- Pack Option: ${selectedPack}
- Quantity: ${quantity}
- Indicated Price: ${priceText}
Please confirm current batch availability and direct payment options.`
    );
    window.open(
      `https://wa.me/${GHARGLOW_CONTACT.phoneWhatsApp.replace(/[^0-9]/g, '')}?text=${message}`,
      '_blank'
    );
  };

  // Related products from same or complementary category
  const related = GHARGLOW_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#14081b]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#faf7f2] rounded-3xl border border-[#ebd8e2] shadow-2xl overflow-hidden my-auto text-[#2b143a]">
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-[#fbdde6] text-[#4f256d] border border-[#ebd8e2] flex items-center justify-center transition-all cursor-pointer shadow-xs"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Two-Column PDP Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10">
          {/* Left Column: Interactive Product Viewer & Angle Controls */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <InteractiveProductViewer
              product={product}
              onUpdateUserImage={onUpdateUserImage}
              interactiveMode="full"
            />

            {/* Micro Gallery / Angle Switcher info */}
            <div className="flex items-center justify-between text-xs text-[#784f6c] px-2">
              <span className="italic font-serif">
                Drag the matchstick above to light the authentic wick tip.
              </span>
              <span className="font-mono text-[11px] text-[#91587d]">
                Wick Anchor: {product.wickCoordinate.x}%, {product.wickCoordinate.y}%
              </span>
            </div>
          </div>

          {/* Right Column: Confirmed Information & Purchase Action */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#88547b]">
                  {product.category}
                </span>
                <button
                  onClick={toggleFavorite}
                  className="flex items-center gap-1.5 text-xs text-[#88547b] hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFav ? 'fill-rose-500 text-rose-500' : 'text-[#88547b]'
                    }`}
                  />
                  <span>{isFav ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1e0f2b] tracking-tight mb-2">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="text-sm font-serif italic text-[#724566] mb-4">
                {product.tagline}
              </p>

              {/* Confirmed Price and Pack Size */}
              <div className="p-4 rounded-xl bg-[#f5ede1] border border-[#ebd8e2] mb-5">
                {product.isPriceConfirmed ? (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-semibold font-mono tabular-nums text-[#1e0f2b]">
                        ₹{product.confirmedPrice}
                      </span>
                      {product.packSize && (
                        <span className="text-sm text-[#784f6c]">
                          for confirmed pack of {product.packSize}
                        </span>
                      )}
                    </div>
                    {product.bulkPrice && (
                      <p className="text-xs text-[#88547b] mt-1 font-medium">
                        Bulk price (10+ units): ₹{product.bulkPrice} each
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <span className="text-xl font-serif italic text-[#7d486d]">
                      Ask for price
                    </span>
                    <p className="text-xs text-[#88547b] mt-1">
                      Pure ghee ful vatis are made to order in fresh curated batches. Confirmed directly upon inquiry.
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3 mb-5">
                <p className="text-sm text-[#4f256d] leading-relaxed">
                  {product.description}
                </p>

                {/* Fragrance & Ritual Specifications */}
                <div className="grid grid-cols-1 gap-2 pt-2 text-xs">
                  {product.fragranceNotes && (
                    <div className="flex items-start gap-2 text-[#582a4d]">
                      <Sparkles className="w-4 h-4 text-[#a8527a] shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold text-[#1e0f2b]">Aroma / Essence:</strong>{' '}
                        {product.fragranceNotes}
                      </div>
                    </div>
                  )}

                  {product.burnTime && (
                    <div className="flex items-start gap-2 text-[#582a4d]">
                      <Clock className="w-4 h-4 text-[#a8527a] shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold text-[#1e0f2b]">Burn Duration:</strong>{' '}
                        {product.burnTime}
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2 text-[#582a4d]">
                    <ShieldCheck className="w-4 h-4 text-[#a8527a] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-[#1e0f2b]">Purity Standard:</strong>{' '}
                      Handmade without synthetic paraffin or petroleum additives.
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#784f6c]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#ebd8e2] rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-sm font-semibold text-[#4f256d] hover:bg-[#fbdde6] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-semibold tabular-nums text-[#1e0f2b]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 text-sm font-semibold text-[#4f256d] hover:bg-[#fbdde6] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-4 border-t border-[#ebd8e2]">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-6 rounded-full bg-[#f8c2d3] hover:bg-[#fad4e1] active:bg-[#f29bb5] text-[#1a0b22] text-sm font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire & Order on WhatsApp</span>
              </button>
              <p className="text-[11px] text-center text-[#88547b] mt-2">
                Order details, dispatch date, and payment options confirmed directly.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products strip at bottom */}
        <div className="px-6 sm:px-10 py-6 bg-[#f5ede1] border-t border-[#ebd8e2]">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#784f6c] mb-3">
            Complementary Varieties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelated(rel)}
                className="p-3 bg-white rounded-xl border border-[#ebd8e2] hover:border-[#a8527a] transition-all cursor-pointer flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${rel.authenticColorHex}25` }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: rel.authenticColorHex }} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-[#1e0f2b] truncate">{rel.name}</p>
                  <p className="text-[11px] text-[#784f6c]">
                    {rel.isPriceConfirmed ? `₹${rel.confirmedPrice}` : 'Price on request'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
