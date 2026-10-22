import React from 'react';
import { Truck, MapPin, PackageCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { GHARGLOW_CONTACT } from '../data/products';

export const DeliverySection: React.FC = () => {
  const deliveryOptions = [
    {
      title: 'Local Hand Delivery',
      subtitle: 'Doorstep Care',
      description: 'Carefully hand-delivered for delicate floral floating candles and pure-ghee ful vatis in select city localities.',
      icon: Truck,
      badge: 'Local Areas',
    },
    {
      title: 'Studio Pickup Points',
      subtitle: 'By Appointment',
      description: 'Collect your order directly from our artisan workshop. Convenient for urgent festive orders and personal inspection.',
      icon: MapPin,
      badge: 'Flexible Time',
    },
    {
      title: 'Pan-India Courier',
      subtitle: 'Secure Multi-Layer Transit',
      description: 'Shock-cushioned packaging engineered to ensure earthen pantis, delicate wax petals, and lanterns arrive pristine.',
      icon: PackageCheck,
      badge: 'Tracked Dispatch',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Select Varieties & Packs',
      detail: 'Browse our 12 signature candle and pure-ghee ful vati varieties, or artisanal lanterns.',
    },
    {
      number: '02',
      title: 'Message via WhatsApp',
      detail: 'Tap any order button to share your quantity, custom packing needs, or bulk queries directly.',
    },
    {
      number: '03',
      title: 'Confirm & Receive',
      detail: 'We confirm fresh batch readiness, dispatch timelines, and direct payment details seamlessly.',
    },
  ];

  const handleGeneralOrderInquiry = () => {
    const msg = encodeURIComponent(
      `Hello GharGlow! I would like to inquire about placing an order and check delivery timelines for my location.`
    );
    window.open(
      `https://wa.me/${GHARGLOW_CONTACT.phoneWhatsApp.replace(/[^0-9]/g, '')}?text=${msg}`,
      '_blank'
    );
  };

  return (
    <section id="delivery" className="py-20 bg-[#faf7f2] text-[#2b143a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#a8527a] mb-2">
            <span>Care & Fulfillment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1e0f2b] tracking-tight mb-3">
            Delivery & Orders
          </h2>
          <p className="text-base font-serif italic text-[#724566]">
            Thoughtfully packaged lights, transported with sacred care to your doorstep.
          </p>
        </div>

        {/* Three evenly spaced information columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {deliveryOptions.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <div
                key={idx}
                className="bg-[#fdfaf7] rounded-2xl border border-[#ebd8e2] p-7 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-full bg-[#fbdde6] border border-[#f8c2d3] flex items-center justify-center text-[#3c1a53] shadow-2xs">
                      <Icon className="w-5 h-5 text-[#a8527a]" />
                    </div>
                    <span className="text-[11px] font-medium text-[#724566] bg-[#f5ede1] px-2.5 py-1 rounded-full border border-[#ebd8e2]">
                      {opt.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-[#1e0f2b] mb-1">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-[#a8527a] font-medium uppercase tracking-wider mb-3">
                    {opt.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5d3055] leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Soft blush rounded information panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#fdeef3] border border-[#f8c2d3] text-center max-w-3xl mx-auto mb-16 shadow-xs">
          <h3 className="text-lg font-serif font-semibold text-[#1e0f2b] mb-2">
            Handcrafted Batch Assurance
          </h3>
          <p className="text-xs sm:text-sm text-[#4f256d] leading-relaxed mb-4 max-w-2xl mx-auto">
            Order details, real-time batch availability, custom fragrance assortments, and shipping arrangements are confirmed directly with our artisans. We ensure every candle and ful vati is freshly set prior to dispatch.
          </p>
          <button
            onClick={handleGeneralOrderInquiry}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#3c1a53] hover:bg-[#4f256d] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with our Studio</span>
          </button>
        </div>

        {/* Short, numbered "How to Order" guide */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-normal text-[#1e0f2b]">
              How to Order in 3 Simple Steps
            </h3>
            <p className="text-xs text-[#784f6c] mt-1">Direct, personal, and reliable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-6 bg-white rounded-2xl border border-[#ebd8e2] flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-serif font-bold text-[#f8c2d3] mb-2 block">
                    {step.number}
                  </span>
                  <h4 className="text-base font-serif font-semibold text-[#1e0f2b] mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#5d3055] leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
