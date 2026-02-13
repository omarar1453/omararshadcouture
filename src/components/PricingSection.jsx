import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronDown, Check } from 'lucide-react';
import { openWhatsApp, CURRENCIES, formatPrice, getCurrencyForCountry } from '../utils/tracking';

const tiers = [
  {
    name: 'Saree & Simple Designs',
    priceUsd: 950,
    label: 'From',
    delivery: '15-18 Days',
    features: [
      'Premium fabric selection',
      'Custom measurements',
      'Handcrafted embroidery',
      'Quality control checks',
      'Free worldwide shipping',
    ],
    popular: false,
  },
  {
    name: 'Lehenga Choli & Nikkah',
    priceUsd: 1800,
    label: 'From',
    delivery: '18-22 Days',
    features: [
      'Premium fabric selection',
      'Custom measurements',
      'Heavy handcrafted embroidery',
      'Live video fitting session',
      'Quality control checks',
      'Free worldwide shipping',
      'Brand packaging',
    ],
    popular: true,
  },
  {
    name: 'Heavy Bridal',
    priceUsd: 2500,
    label: 'From',
    delivery: '20-25 Days',
    features: [
      'Luxury fabric selection',
      'Custom measurements',
      'Premium hand embroidery & stone work',
      'Multiple live video fittings',
      'Dedicated fashion expert',
      'Quality control checks',
      'Free express worldwide shipping',
      'Luxury brand packaging',
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code) setCurrency(getCurrencyForCountry(data.country_code));
      })
      .catch(() => {});
  }, []);

  return (
    <section id="pricing" className="bg-white py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-antique-gold tracking-[0.5em] uppercase text-[10px] font-bold mb-2 block">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-text-primary italic mb-3">
            Investment in Your Dream
          </h2>
          <p className="text-text-secondary text-sm max-w-xl mx-auto mb-5">
            Every piece is custom-made from scratch. Pricing depends on design complexity, fabric, and embroidery work.
          </p>

          {/* Currency switcher */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 text-sm text-text-secondary border border-divider-gold px-4 py-2 rounded-full hover:border-antique-gold transition-colors"
            >
              {currency.label} <ChevronDown size={14} />
            </button>
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-divider-gold shadow-xl rounded-lg py-1 w-32 z-20">
                {CURRENCIES.map(c => (
                  <button
                    key={c.code}
                    onClick={() => { setCurrency(c); setShowDropdown(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-ivory ${
                      currency.code === c.code ? 'text-antique-gold font-medium' : 'text-text-secondary'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl p-6 sm:p-8 border transition-all ${
                tier.popular
                  ? 'border-antique-gold shadow-lg bg-ivory scale-[1.02]'
                  : 'border-divider-gold bg-white hover:border-antique-gold/50 hover:shadow-md'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-antique-gold text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-serif text-text-primary mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-sm text-text-secondary">{tier.label} </span>
                <span className="text-3xl font-bold text-text-primary">
                  {formatPrice(tier.priceUsd, currency)}
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-6">Delivery: {tier.delivery}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check size={16} className="text-antique-gold flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openWhatsApp(
                  `Hi, I am interested in your "${tier.name}" package (${tier.label} ${formatPrice(tier.priceUsd, currency)}). Can you help me with my bridal requirements?`,
                  'pricing_cta',
                  { tier_name: tier.name, tier_price: tier.priceUsd }
                )}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-all ${
                  tier.popular
                    ? 'bg-antique-gold hover:bg-text-primary text-white'
                    : 'border border-antique-gold text-antique-gold hover:bg-antique-gold hover:text-white'
                }`}
              >
                <MessageCircle size={14} fill="currentColor" strokeWidth={0} />
                Get a Free Quote
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-text-secondary mt-8">
          Prices are starting points. Final quote depends on your specific design, fabric choice, and embroidery complexity.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
