import React, { useState } from 'react';
import { MessageCircle, Mail, Instagram, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { GHARGLOW_CONTACT } from '../data/products';
import contactImage from '../assets/images/contact_candle_flowers_1792694544153.jpg';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    message: '',
    varietyOfInterest: 'All Varieties',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      `Hello GharGlow!
Name: ${formData.name}
Phone: ${formData.contactNumber}
Interest: ${formData.varietyOfInterest}
Message: ${formData.message}`
    );
    window.open(
      `https://wa.me/${GHARGLOW_CONTACT.phoneWhatsApp.replace(/[^0-9]/g, '')}?text=${encoded}`,
      '_blank'
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#faf7f2] text-[#2b143a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Contact details & Direct Message Form */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#a8527a] mb-2">
                <span className="w-6 h-px bg-[#a8527a]" />
                <span>Get in Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1e0f2b] tracking-tight mb-3">
                Connect with GharGlow
              </h2>
              <p className="text-sm sm:text-base text-[#5d3055] leading-relaxed">
                Whether you need bulk wedding favors, festive hampers, or bespoke pure-ghee ful vati assortments, we would love to hear from you.
              </p>
            </div>

            {/* Configurable Contact Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${GHARGLOW_CONTACT.phoneWhatsApp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-[#fdfaf7] border border-[#ebd8e2] hover:border-[#a8527a] transition-all flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#fbdde6] flex items-center justify-center text-[#3c1a53] group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5 text-[#a8527a]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#784f6c]">
                    WhatsApp Orders
                  </p>
                  <p className="text-sm font-medium text-[#1e0f2b]">Direct Chat</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={`https://instagram.com/${GHARGLOW_CONTACT.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-[#fdfaf7] border border-[#ebd8e2] hover:border-[#a8527a] transition-all flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#fbdde6] flex items-center justify-center text-[#3c1a53] group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5 text-[#a8527a]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#784f6c]">
                    Instagram
                  </p>
                  <p className="text-sm font-medium text-[#1e0f2b]">{GHARGLOW_CONTACT.instagramHandle}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${GHARGLOW_CONTACT.email}`}
                className="p-4 rounded-2xl bg-[#fdfaf7] border border-[#ebd8e2] hover:border-[#a8527a] transition-all flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#fbdde6] flex items-center justify-center text-[#3c1a53] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-[#a8527a]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#784f6c]">
                    Email Inquiries
                  </p>
                  <p className="text-sm font-medium text-[#1e0f2b]">{GHARGLOW_CONTACT.email}</p>
                </div>
              </a>

              {/* Studio Location */}
              <div className="p-4 rounded-2xl bg-[#fdfaf7] border border-[#ebd8e2] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#fbdde6] flex items-center justify-center text-[#3c1a53]">
                  <MapPin className="w-5 h-5 text-[#a8527a]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#784f6c]">
                    Location
                  </p>
                  <p className="text-sm font-medium text-[#1e0f2b]">{GHARGLOW_CONTACT.city}</p>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#fdfaf7] border border-[#ebd8e2] space-y-4 shadow-2xs">
              <h3 className="text-base font-serif font-semibold text-[#1e0f2b]">
                Send an Inquiry Directly
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#5d3055] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sakshi"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#ebd8e2] focus:outline-none focus:border-[#a8527a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5d3055] mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    placeholder="+91..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#ebd8e2] focus:outline-none focus:border-[#a8527a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5d3055] mb-1">
                  Candle / Vati Variety
                </label>
                <select
                  value={formData.varietyOfInterest}
                  onChange={(e) => setFormData({ ...formData, varietyOfInterest: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#ebd8e2] focus:outline-none focus:border-[#a8527a]"
                >
                  <option>All Varieties / Custom Assortment</option>
                  <option>Traditional Pure-Ghee Panti Diya</option>
                  <option>Rose-Design Floating Candles (12 pcs - ₹150)</option>
                  <option>Rose-Scented Floating Candles (12 pcs - ₹160)</option>
                  <option>Pink Laddu-Shaped Candles (6 pcs - ₹140)</option>
                  <option>Rose Ghee Ful Vatis (Green Rose Shape)</option>
                  <option>Chandan-Fragrance Ghee Ful Vati (Peach)</option>
                  <option>Kewra-Fragrance Ghee Ful Vati (Pale Yellow)</option>
                  <option>Mixed Chandan, Kewra & Rose Ful Vatis</option>
                  <option>Kapoor & Bhimsen Kapoor Ful Vatis</option>
                  <option>Artisanal Lanterns (Retail / Bulk)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5d3055] mb-1">
                  Message / Quantity Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your event, festival date, or address..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#ebd8e2] focus:outline-none focus:border-[#a8527a]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#3c1a53] hover:bg-[#4f256d] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Inquiry Sent! Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry on WhatsApp</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Candle-and-Flower Still-life Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#ebd8e2] shadow-xl aspect-4/3 sm:aspect-5/4">
              <img
                src={contactImage}
                alt="Burning artisan candles and delicate blush blossoms in deep plum ambiance"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0c24]/75 via-[#1b0c24]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <p className="text-xs uppercase tracking-widest font-semibold text-[#f8c2d3]">
                  Handcrafted with Care
                </p>
                <p className="text-lg font-serif italic text-white/95 mt-1 leading-snug">
                  “For the evenings that feel familiar, the traditions that bring us closer.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
