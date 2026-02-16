import React, { useState, useEffect } from 'react';
import { Share2, Bookmark } from 'lucide-react';
import { trackEvent } from '../utils/tracking';

const StickyHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [saved, setSaved] = useState(() => {
    try { return localStorage.getItem('oa_saved') === '1'; } catch { return false; }
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    trackEvent('header_share_click');
    const shareData = {
      title: 'Omar Arshad Couture',
      text: 'Custom Pakistani bridal wear — shipped worldwide. Check out their bridal collection!',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      // User cancelled share
    }
  };

  const handleSave = () => {
    const newSaved = !saved;
    setSaved(newSaved);
    localStorage.setItem('oa_saved', newSaved ? '1' : '0');
    trackEvent('header_save_click', { saved: newSaved });
    if (newSaved) {
      // Prompt to bookmark
      alert('Saved! You can also bookmark this page (Ctrl+D / Cmd+D) to visit later.');
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md py-2 shadow-sm border-b border-divider-gold'
          : 'bg-ivory/80 backdrop-blur-sm py-3'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center relative">
        {/* Share & Save icons — right */}
        <div className="absolute right-4 sm:right-6 flex items-center gap-3">
          <button
            onClick={handleShare}
            className="text-text-primary hover:text-antique-gold transition-colors"
            aria-label="Share"
          >
            <Share2 size={20} strokeWidth={1.8} />
          </button>
          <button
            onClick={handleSave}
            className="text-text-primary hover:text-antique-gold transition-colors"
            aria-label="Save"
          >
            <Bookmark
              size={20}
              strokeWidth={1.8}
              fill={saved ? 'currentColor' : 'none'}
              className={saved ? 'text-antique-gold' : ''}
            />
          </button>
        </div>

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
