import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Gift } from 'lucide-react';
import { openWhatsApp, trackEvent } from '../utils/tracking';

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Don't show again if already shown this session
    if (sessionStorage.getItem('oa_exit_popup_shown')) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) triggerPopup();
    };

    // Only trigger on mouse exit (top of viewport), not timer
    // 60 second delay before enabling exit detection
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 60000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const triggerPopup = () => {
    if (sessionStorage.getItem('oa_exit_popup_shown')) return;
    setShow(true);
    sessionStorage.setItem('oa_exit_popup_shown', 'true');
    trackEvent('exit_intent_shown');
  };

  const close = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative shadow-2xl border-t-4 border-antique-gold"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={24} />
            </button>

            <Gift size={40} className="text-antique-gold mx-auto mb-4" />

            <h3 className="text-2xl font-serif text-text-primary italic mb-2">
              Wait -- Before You Go!
            </h3>

            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              Get a <span className="font-semibold text-antique-gold">free bridal style consultation</span> with our fashion expert.
              Send us any designer photo and we will give you an honest quote within 2 hours.
            </p>

            <button
              onClick={() => {
                trackEvent('exit_intent_whatsapp_click');
                openWhatsApp(
                  'Hi, I saw the free consultation offer on your website. I would like to discuss my bridal requirements.',
                  'exit_intent_cta'
                );
                close();
              }}
              className="w-full flex items-center justify-center gap-2 bg-antique-gold hover:bg-text-primary text-white py-3 rounded-full text-sm font-semibold transition-all"
            >
              <MessageCircle size={16} fill="white" strokeWidth={0} />
              Get Free Quote on WhatsApp
            </button>

            <button
              onClick={close}
              className="mt-4 text-sm text-text-secondary hover:text-text-primary underline transition-colors"
            >
              No thanks, I will continue browsing
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
