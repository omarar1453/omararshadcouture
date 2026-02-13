import React from 'react';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../utils/tracking';

const StickyBottomCTA = () => {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={() => openWhatsApp(
          'Hi, I am interested in a custom bridal outfit. Can you help me?',
          'sticky_bottom_cta'
        )}
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white pl-4 pr-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all text-sm font-medium"
      >
        <MessageCircle size={18} fill="white" strokeWidth={0} />
        <span>Free Quote</span>
      </button>
    </div>
  );
};

export default StickyBottomCTA;
