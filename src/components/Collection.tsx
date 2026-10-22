import React, { useState } from 'react';
import { ProductVariety, ProductCategory } from '../types/candle';
import { GHARGLOW_PRODUCTS, GHARGLOW_CONTACT } from '../data/products';
import { Heart, MessageCircle, Sparkles, Flame, Eye } from 'lucide-react';

interface CollectionProps {
  onSelectProduct: (product: ProductVariety) => void;
  onQuickLight: (product: ProductVariety) => void;
}

const CATEGORIES: ProductCategory[] = [
  'All Varieties',
  'Traditional Diyas',
  'Ghee Ful Vatis',
  'Floating & Shaped Candles',
  'Kapoor & Special Vatis',
  'Lanterns',
];

export const Collection: React.FC<CollectionProps> = ({ onSelectProduct, onQuickLight }) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All Varieties');
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('gharglow_favorites');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...favorites, [productId]: !favorites[productId] };
    setFavorites(updated);
    try {
      localStorage.setItem('gharglow_favorites', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const filteredProducts =
    activeCategory === 'All Varieties'
      ? GHARGLOW_PRODUCTS
      : GHARGLOW_PRODUCTS.filter((p) => p.category === activeCategory);

  const handleWhatsAppEnquiry = (product: ProductVariety, e: React.MouseEvent) => {
    e.stopPropagation();
    const priceText = product.isPriceConfirmed
      ? `₹${product.confirmedPrice} for ${product.packSize || '1 pack'}`
      : 'Pricing on request';
    const message = encodeURIComponent(
      `Hello GharGlow! I would like to order "${product.name}" (${priceText}). Please let me know current batch availability and delivery details.`
    );
    window.open(
      `https://wa.me/${GHARGLOW_CONTACT.phoneWhatsApp.replace(/[^0-9]/g, '')}?text=${message}`,
      '_blank'
    );
  };

  return (
    <section id="collection" className="py-20 bg-[#faf7f2] text-[#2b143a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#a8527a] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Artisan Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1e0f2b] tracking-tight mb-3">
            Our Collection
          </h2>
          <p className="text-base sm:text-lg font-serif italic text-[#724566]">
            Little lights for meaningful moments.
          </p>
        </div>

        {/* Category Filters (Clean rounded buttons) */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#3c1a53] text-white shadow-sm'
                    : 'bg-[#f5ede1] text-[#582a4d] hover:bg-[#ebd8e2] border border-[#ebd8e2]/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Balanced 3-Column Desktop Grid (2 cols on tablet, 1 on small mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredProducts.map((product) => {
            const isFav = favorites[product.id];
            const storedImage = localStorage.getItem(`gharglow_photo_${product.id}`);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative bg-[#fdfaf7] rounded-2xl border border-[#ebd8e2] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                {/* Product Card Media Container */}
                <div className="relative w-full aspect-4/3 bg-gradient-to-b from-[#f9f3ec] to-[#f4e8dc] flex items-center justify-center p-6 overflow-hidden">
                  {/* Subtle decorative background tint */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{ backgroundColor: product.authenticColorHex }}
                  />

                  {/* Real Photo or Authentic Product Art */}
                  {storedImage ? (
                    <img
                      src={storedImage}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="relative w-48 h-48 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      {renderCardThumbnail(product.productType)}
                    </div>
                  )}

                  {/* Favorite Icon */}
                  <button
                    onClick={(e) => toggleFavorite(product.id, e)}
                    className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-[#ebd8e2] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xs cursor-pointer"
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'text-[#88547b] hover:text-rose-500'
                      }`}
                    />
                  </button>

                  {/* Model status or upload badge */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-md bg-white/85 text-[#5e2f52] border border-[#ebd8e2]/60">
                      {storedImage ? 'Authentic Photo' : 'Genuine Silhouette'}
                    </span>
                  </div>

                  {/* Quick light hover affordance */}
                  <div className="absolute inset-0 bg-[#240e32]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-[1px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickLight(product);
                      }}
                      className="px-3.5 py-2 rounded-full bg-white text-[#240e32] text-xs font-semibold flex items-center gap-1.5 shadow-md hover:bg-[#fbdde6] transition-colors"
                    >
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>Light Diya</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="px-3 py-2 rounded-full bg-[#3c1a53] text-white text-xs font-semibold flex items-center gap-1 shadow-md hover:bg-[#4f256d] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>

                {/* Product Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quiet category metadata */}
                    <div className="text-[11px] uppercase tracking-wider text-[#91587d] font-semibold mb-1">
                      {product.category}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-serif font-semibold text-[#1e0f2b] tracking-tight group-hover:text-[#5e2270] transition-colors mb-1.5">
                      {product.name}
                    </h3>

                    {/* Concise description */}
                    <p className="text-xs text-[#6e4663] line-clamp-2 leading-relaxed mb-4">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Card Footer: Confirmed Price / Pack Size & WhatsApp Order Button */}
                  <div className="pt-3 border-t border-[#ebd8e2]/60 flex items-center justify-between gap-3">
                    <div>
                      {product.isPriceConfirmed ? (
                        <div>
                          <span className="text-base font-semibold font-mono tabular-nums text-[#1e0f2b]">
                            ₹{product.confirmedPrice}
                          </span>
                          {product.packSize && (
                            <span className="text-[11px] text-[#784f6c] ml-1.5">
                              / {product.packSize}
                            </span>
                          )}
                          {product.bulkPrice && (
                            <p className="text-[10px] text-[#88547b]">
                              Bulk: ₹{product.bulkPrice}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <span className="text-xs font-medium text-[#7d486d] italic">
                            Ask for price
                          </span>
                          {product.packSize && (
                            <p className="text-[10px] text-[#91587d]">{product.packSize}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* WhatsApp Action Button */}
                    <button
                      onClick={(e) => handleWhatsAppEnquiry(product, e)}
                      className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#1e0f2b] bg-[#f8c2d3] hover:bg-[#fad4e1] rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#1e0f2b]" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/**
 * Thumbnail graphic helper for collection cards
 */
function renderCardThumbnail(type: ProductVariety['productType']) {
  switch (type) {
    case 'panti_diya_ghee':
      return (
        <svg viewBox="0 0 160 130" className="w-36 h-28 drop-shadow-sm">
          <ellipse cx="80" cy="98" rx="55" ry="12" fill="#3a1c12" opacity="0.2" />
          <path d="M 25 60 C 25 90, 55 102, 80 102 C 105 102, 135 90, 135 60 C 135 55, 125 48, 110 48 C 95 48, 88 40, 78 40 C 68 40, 60 48, 45 48 C 30 48, 25 55, 25 60 Z" fill="#8d492c" />
          <ellipse cx="80" cy="65" rx="44" ry="20" fill="#ca8a04" />
          <ellipse cx="76" cy="62" rx="30" ry="12" fill="#fef08a" opacity="0.6" />
          {/* Red baati */}
          <path d="M 88 72 C 84 66, 78 57, 76 45" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
          <circle cx="76" cy="45" r="2" fill="#7f1d1d" />
        </svg>
      );
    case 'pink_laddu':
      return (
        <svg viewBox="0 0 160 130" className="w-32 h-28 drop-shadow-sm">
          <ellipse cx="80" cy="104" rx="40" ry="10" fill="#4a1525" opacity="0.2" />
          <circle cx="80" cy="72" r="36" fill="#f472b6" />
          <circle cx="72" cy="60" r="4" fill="#fbcfe8" />
          <circle cx="88" cy="65" r="4" fill="#fbcfe8" />
          <circle cx="80" cy="80" r="4" fill="#fbcfe8" />
          <path d="M 80 40 L 80 34" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'rose_floating_sculpted':
    case 'rose_floating_small':
      return (
        <svg viewBox="0 0 160 130" className="w-32 h-28 drop-shadow-sm">
          <ellipse cx="80" cy="95" rx="45" ry="10" fill="#381324" opacity="0.15" />
          <path d="M 50 72 C 45 55, 65 45, 80 50 C 95 45, 115 55, 110 72 C 118 88, 98 102, 80 98 C 62 102, 42 88, 50 72 Z" fill="#f472b6" />
          <path d="M 58 70 C 54 58, 68 50, 80 54 C 92 50, 106 58, 102 70 C 108 82, 92 92, 80 90 C 68 92, 52 82, 58 70 Z" fill="#fda4af" />
          <path d="M 80 58 L 80 48" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'rose_ghee_vati':
      return (
        <svg viewBox="0 0 160 130" className="w-32 h-28 drop-shadow-sm">
          <ellipse cx="80" cy="98" rx="40" ry="9" fill="#1b2e1e" opacity="0.2" />
          <path d="M 52 70 C 48 56, 66 48, 80 52 C 94 48, 112 56, 108 70 C 114 84, 96 95, 80 92 C 64 95, 46 84, 52 70 Z" fill="#55815b" />
          <path d="M 62 68 C 60 58, 70 52, 80 55 C 90 52, 100 58, 98 68 C 102 78, 90 85, 80 83 C 70 85, 58 78, 62 68 Z" fill="#8db893" />
          <path d="M 80 58 L 80 47" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'chandan_ghee_vati':
      return (
        <svg viewBox="0 0 160 130" className="w-32 h-28 drop-shadow-sm">
          <ellipse cx="80" cy="100" rx="38" ry="9" fill="#431407" opacity="0.2" />
          <path d="M 50 90 C 50 100, 110 100, 110 90 C 108 65, 92 48, 80 46 C 68 48, 52 65, 50 90 Z" fill="#ea580c" />
          <path d="M 80 52 L 80 43" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'kewra_ghee_vati':
      return (
        <svg viewBox="0 0 160 130" className="w-32 h-28 drop-shadow-sm">
          <ellipse cx="80" cy="100" rx="38" ry="9" fill="#422006" opacity="0.2" />
          <path d="M 50 90 C 50 100, 110 100, 110 90 C 108 65, 92 48, 80 46 C 68 48, 52 65, 50 90 Z" fill="#eab308" />
          <path d="M 80 52 L 80 43" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'small_lantern':
    case 'flower_lantern':
      return (
        <svg viewBox="0 0 160 130" className="w-32 h-28 drop-shadow-sm">
          <ellipse cx="80" cy="115" rx="32" ry="7" fill="#291205" opacity="0.2" />
          <ellipse cx="80" cy="35" rx="7" ry="7" fill="none" stroke="#d97706" strokeWidth="2" />
          <rect x="60" y="50" width="40" height="55" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <path d="M 80 80 L 80 72" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 160 130" className="w-32 h-28 drop-shadow-sm">
          <ellipse cx="80" cy="100" rx="38" ry="9" fill="#312e81" opacity="0.1" />
          <path d="M 52 90 C 52 100, 108 100, 108 90 C 106 65, 92 48, 80 46 C 68 48, 54 65, 52 90 Z" fill="#fef3c7" />
          <path d="M 80 52 L 80 43" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}
