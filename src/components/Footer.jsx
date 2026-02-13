import React from 'react';
import { Instagram, Facebook, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-10 px-4 sm:px-6 border-t border-divider-gold pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-serif text-text-primary tracking-[0.15em] mb-1">
              Omar Arshad <span className="text-antique-gold font-bold">Couture</span>
            </h2>
            <p className="text-xs text-text-secondary tracking-wide">
              Custom Pakistani Bridal Wear | Worldwide Shipping
            </p>
          </div>

          {/* Social & Contact */}
          <div className="flex items-center gap-6">
            {/* Replace with actual profile URLs */}
            <a
              href="https://www.instagram.com/omararshadcouture"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram"
              className="text-text-secondary hover:text-antique-gold transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/omararshadcouture"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook"
              className="text-text-secondary hover:text-antique-gold transition-colors"
            >
              <Facebook size={20} />
            </a>
            <span className="w-px h-5 bg-divider-gold"></span>
            <a
              href="tel:+923007201800"
              aria-label="Call us"
              className="text-text-secondary hover:text-antique-gold transition-colors"
            >
              <Phone size={20} />
            </a>
            <a
              href="mailto:info@omararshadcouture.com"
              aria-label="Email us"
              className="text-text-secondary hover:text-antique-gold transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-divider-gold flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Omar Arshad Couture. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-text-secondary">
            <a href="#faq" className="hover:text-antique-gold transition-colors">FAQ</a>
            <a href="#pricing" className="hover:text-antique-gold transition-colors">Pricing</a>
            <a href="#lead-form" className="hover:text-antique-gold transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
