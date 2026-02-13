import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does the custom design process work?',
    a: 'Simply send us a photo of any bridal design you love via WhatsApp. Our team will analyze the design, discuss fabric options with you, take your measurements over a video call, and begin crafting your custom piece. You will receive progress updates and a live video fitting before shipping.',
  },
  {
    q: 'Can you recreate a specific designer\'s outfit?',
    a: 'Yes, we specialize in creating designer-inspired pieces. Send us reference photos of any bridal outfit and we will recreate it with premium fabrics, custom-fitted to your measurements. Each piece is handcrafted from scratch in our atelier.',
  },
  {
    q: 'How long does shipping take to the USA, UK, or Canada?',
    a: 'Production takes 15-25 days depending on design complexity. Shipping is free worldwide via express courier (DHL/FedEx) and typically takes 5-7 business days. You will receive a tracking number once your order ships.',
  },
  {
    q: 'What if the dress doesn\'t fit?',
    a: 'We take precise measurements over a live video call and conduct a video fitting before shipping. This ensures accurate sizing. If any alterations are needed after delivery, we provide guidance for local tailoring or offer a remake if the issue is on our end.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept bank transfers, Western Union, PayPal, and major credit cards. A 50% deposit is required to begin work, with the remaining 50% due before shipping. All transactions are secure.',
  },
  {
    q: 'Do I need to provide my own measurements?',
    a: 'No. We conduct a guided measurement session over a live video call where our expert walks you through exactly how to take each measurement. This ensures accuracy and a perfect fit.',
  },
  {
    q: 'What fabrics do you use?',
    a: 'We source premium fabrics including pure silk, organza, chiffon, velvet, and net. Embroidery is done using high-quality threads, stones, sequins, and dabka work. We can match the fabric quality to your budget and preferences.',
  },
  {
    q: 'Are there any customs or import duties?',
    a: 'Import duties vary by country. In the USA, bridal garments under $800 are typically duty-free. For UK and Canada, you may be subject to local customs charges. We declare the package as "handmade garment" and can advise on your specific country\'s policies.',
  },
  {
    q: 'What is your refund or exchange policy?',
    a: 'Since each piece is custom-made to your specifications, we do not offer returns. However, we do offer modifications and remakes if the finished product does not match the agreed-upon design. We send detailed photos and video before shipping for your approval.',
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" className="bg-ivory py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-antique-gold tracking-[0.5em] uppercase text-[10px] font-bold mb-2 block">
            Questions & Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-text-primary italic">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-divider-gold overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-ivory/50 transition-colors"
              >
                <span className="text-base font-medium text-text-primary pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-antique-gold flex-shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-text-secondary text-sm leading-relaxed border-t border-divider-gold pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
