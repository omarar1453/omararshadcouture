import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { openWhatsApp } from '../utils/tracking';

const Hero = () => {
  const scrollToForm = () => {
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex items-center overflow-hidden bg-ivory py-10 sm:py-16">
      {/* Background Image -- Replace with real hero image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bridal.jpg"
          alt="Custom Pakistani bridal lehenga by Omar Arshad Couture"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/90 to-ivory/60"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-antique-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-3 block">
              Omar Arshad Couture
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-text-primary mb-4 leading-tight">
              Your Dream Designer Bridal,{' '}
              <span className="text-antique-gold italic">Custom Made</span>
            </h2>

            <p className="text-text-secondary text-sm sm:text-base mb-3 leading-relaxed max-w-xl">
              Send us any designer bridal photo and we will recreate it with premium fabrics, tailored to your exact measurements. Delivered worldwide.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-5 text-xs sm:text-sm text-text-secondary mb-6">
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
                15-20 Day Delivery
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                onClick={() => openWhatsApp(
                  'Hi, I would like to get a free quote for a custom bridal outfit. Here is my inspiration:',
                  'hero_primary_cta'
                )}
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-3 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
