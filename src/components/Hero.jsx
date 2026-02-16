import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { openWhatsApp } from '../utils/tracking';

/* ── Dynamic headline variants for Google Ads landing pages ──
   URL param ?c=lehenga  →  "Custom Pakistani Bridal Lehenga Choli"
   URL param ?c=nikkah   →  "Custom Nikkah & Mehndi Dresses"
   URL param ?c=gown     →  "Custom Bridal Gowns & Maxi"
   URL param ?c=sharara  →  "Custom Bridal Sharara & Gharara"
   URL param ?c=saree    →  "Custom Bridal Saree Collection"
   URL param ?c=couture  →  "Couture Bridal Wear, Handcrafted"
   No param (default)    →  "Custom Pakistani Bridal Lehenga, Sharara & Gowns"
*/
const VARIANTS = {
  lehenga: {
    highlight: 'Lehenga Choli',
    prefix: 'Custom Pakistani Bridal',
    desc: 'Send us any designer lehenga photo and we will recreate it with premium fabrics, heavy hand embroidery, and tailored to your exact measurements. Shipped free to USA, UK & Canada.',
    whatsapp: 'Hi, I would like to get a free quote for a custom Bridal Lehenga. Here is my inspiration:',
  },
  nikkah: {
    highlight: 'Nikkah & Mehndi Dresses',
    prefix: 'Custom',
    desc: 'From elegant nikkah outfits to vibrant mehndi dresses — send us your inspiration and we will handcraft it with premium fabrics, tailored to your measurements. Free shipping to USA, UK & Canada.',
    whatsapp: 'Hi, I would like to get a free quote for a custom Nikkah/Mehndi dress. Here is my inspiration:',
  },
  gown: {
    highlight: 'Bridal Gowns & Maxi',
    prefix: 'Custom',
    desc: 'Designer bridal gowns with Pakistani embroidery — modern silhouettes meet traditional craftsmanship. Custom-made to your measurements and shipped free to USA, UK & Canada.',
    whatsapp: 'Hi, I would like to get a free quote for a custom Bridal Gown. Here is my inspiration:',
  },
  sharara: {
    highlight: 'Bridal Sharara & Gharara',
    prefix: 'Custom',
    desc: 'Elegant Pakistani shararas and ghararas with intricate hand embroidery. Perfect for nikkah, mehndi, and walima. Custom-made and shipped free to USA, UK & Canada.',
    whatsapp: 'Hi, I would like to get a free quote for a custom Sharara/Gharara. Here is my inspiration:',
  },
  saree: {
    highlight: 'Bridal Saree Collection',
    prefix: 'Custom',
    desc: 'Premium Pakistani bridal sarees with hand embroidery and luxury fabrics. Custom-made to your preferences and shipped free worldwide.',
    whatsapp: 'Hi, I would like to get a free quote for a custom Bridal Saree. Here is my inspiration:',
  },
  couture: {
    highlight: 'Bridal Wear, Handcrafted',
    prefix: 'Couture',
    desc: 'Haute couture bridal pieces — lehengas, gowns, shararas, and more — handcrafted by master karigars with premium embroidery and luxury fabrics. Ships free to USA, UK & Canada.',
    whatsapp: 'Hi, I would like to get a free quote for a custom couture bridal outfit. Here is my inspiration:',
  },
};

const DEFAULT_VARIANT = {
  highlight: 'Lehenga, Sharara & Gowns',
  prefix: 'Custom Pakistani Bridal',
  desc: 'Send us any designer bridal photo — lehenga choli, sharara, gharara, saree or gown — and we will recreate it with premium fabrics, tailored to your exact measurements. Shipped free to USA, UK & Canada.',
  whatsapp: 'Hi, I would like to get a free quote for a custom bridal outfit. Here is my inspiration:',
};

const Hero = () => {
  const variant = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = (params.get('c') || '').toLowerCase();
    return VARIANTS[cat] || DEFAULT_VARIANT;
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 py-8 sm:py-12 lg:py-16">

          {/* LEFT — Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
          >
            <span className="text-antique-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-3 block">
              Omar Arshad Couture
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-text-primary mb-4 leading-tight">
              {variant.prefix}{' '}
              <span className="text-antique-gold italic">{variant.highlight}</span>
            </h1>

            <p className="text-text-secondary text-sm sm:text-base mb-4 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {variant.desc}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-text-secondary mb-6">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-antique-gold"></span>
                From $950
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-antique-gold"></span>
                Free Worldwide Shipping
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-antique-gold"></span>
                4-8 Week Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-antique-gold"></span>
                200+ Brides Served Worldwide
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2.5 sm:gap-3">
              <button
                onClick={() => openWhatsApp(variant.whatsapp, 'hero_primary_cta')}
                className="flex items-center justify-center gap-2 bg-antique-gold hover:bg-text-primary text-white px-5 py-3 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <MessageCircle size={16} fill="white" strokeWidth={0} />
                WhatsApp - Free Quote
              </button>

              <button
                onClick={scrollToForm}
                className="flex items-center justify-center gap-2 border border-antique-gold text-antique-gold px-5 py-3 rounded-full text-sm font-medium hover:bg-antique-gold hover:text-white transition-all"
              >
                <Send size={15} />
                Send Us Your Design
              </button>
            </div>
          </motion.div>

          {/* RIGHT — Hero bridal image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 flex justify-center order-1 lg:order-2 w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            <div className="relative w-full max-w-[420px] lg:max-w-[480px]">
              {/* Decorative gold border frame */}
              <div className="absolute -inset-3 border border-antique-gold/20 rounded-2xl"></div>
              <div className="absolute -inset-1.5 border border-antique-gold/10 rounded-xl"></div>

              <img
                src="/images/hero/hero-bridal.jpg"
                alt="Custom Pakistani bridal lehenga with hand embroidery — red and gold bridal outfit by Omar Arshad Couture"
                className="w-full h-auto rounded-xl object-cover shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/480x660/FCF9F2/B8860B?text=Bridal+Collection';
                }}
              />

              {/* Subtle gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ivory/40 to-transparent rounded-b-xl"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
