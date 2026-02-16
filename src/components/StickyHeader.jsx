import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../utils/tracking';

const StickyHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md py-2 shadow-sm border-b border-divider-gold'
          : 'bg-ivory/80 backdrop-blur-sm py-3'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center relative">
        {/* CTA button — absolutely positioned right */}
        <button
          onClick={() => openWhatsApp(
            'Hi, I found you through your website and would like to discuss my bridal requirements.',
            'header_cta'
          )}
          className="absolute right-4 sm:right-6 flex items-center gap-1.5 bg-antique-gold hover:bg-text-primary text-white px-3 sm:px-4 py-2 rounded-full text-xs font-medium transition-all shadow-sm hover:shadow-md tracking-wide"
        >
          <MessageCircle size={14} fill="white" strokeWidth={0} />
          <span className="hidden sm:inline">Free Quote</span>
          <span className="sm:hidden">Quote</span>
        </button>

        {/* Centered brand logo */}
        <div className="flex flex-col items-center">
          <h1 className="font-logo text-2xl sm:text-3xl text-text-primary leading-none">
            Omar Arshad <span className="text-antique-gold">Couture</span>
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default StickyHeader;
