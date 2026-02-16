import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp, CURRENCIES, formatPrice, getCurrencyForCountry } from '../utils/tracking';

// Portfolio items — real product photos from our collection
const PORTFOLIO = [
  {
    id: 1,
    title: 'Gold & Pink Bridal Lehenga',
    category: 'Heavy Bridal',
    image: '/images/portfolio/gallery-1.jpg',
    priceUsd: 2500,
    tag: 'red-bridal',
  },
  {
    id: 2,
    title: 'Royal Gold Bridal Set',
    category: 'Heavy Bridal',
    image: '/images/portfolio/gallery-2.jpg',
    priceUsd: 2200,
    tag: 'red-bridal',
  },
  {
    id: 3,
    title: 'Deep Maroon Bridal Gharara',
    category: 'Gharara',
    image: '/images/portfolio/gallery-3.jpg',
    priceUsd: 1800,
    tag: 'lehenga-choli',
  },
  {
    id: 4,
    title: 'Maroon Velvet Bridal',
    category: 'Heavy Bridal',
    image: '/images/portfolio/gallery-4.jpg',
    priceUsd: 2500,
    tag: 'red-bridal',
  },
  {
    id: 5,
    title: 'Maroon Bridal Close-Up',
    category: 'Heavy Bridal',
    image: '/images/portfolio/gallery-5.jpg',
    priceUsd: 2200,
    tag: 'red-bridal',
  },
  {
    id: 6,
    title: 'Embroidered Bridal Lehenga',
    category: 'Lehenga Choli',
    image: '/images/portfolio/gallery-6.jpg',
    priceUsd: 1800,
    tag: 'lehenga-choli',
  },
  {
    id: 7,
    title: 'Rust & Gold Bridal Gown',
    category: 'Bridal Gown',
    image: '/images/portfolio/gallery-7.jpg',
    priceUsd: 1800,
    tag: 'lehenga-choli',
  },
  {
    id: 8,
    title: 'Coral Embroidered Bridal',
    category: 'Heavy Bridal',
    image: '/images/portfolio/gallery-8.jpg',
    priceUsd: 2500,
    tag: 'red-bridal',
  },
  {
    id: 9,
    title: 'Red & Gold Barat Jora',
    category: 'Heavy Bridal',
    image: '/images/portfolio/gallery-9.jpg',
    priceUsd: 2500,
    tag: 'red-bridal',
  },
  {
    id: 10,
    title: 'Maroon Bridal Sharara',
    category: 'Sharara',
    image: '/images/portfolio/gallery-10.jpg',
    priceUsd: 1800,
    tag: 'lehenga-choli',
  },
];

const GalleryGrid = () => {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code) setCurrency(getCurrencyForCountry(data.country_code));
      })
      .catch(() => {});
  }, []);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'red-bridal', label: 'Heavy Bridal' },
    { key: 'lehenga-choli', label: 'Lehenga Choli' },
    { key: 'saree', label: 'Saree' },
  ];

  const filtered = filter === 'all' ? PORTFOLIO : PORTFOLIO.filter(p => p.tag === filter);

  return (
    <section id="portfolio" className="bg-ivory py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-antique-gold tracking-[0.5em] uppercase text-[10px] font-bold mb-2 block">
            Our Work
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-text-primary italic">
            Recent Creations
          </h2>
          <p className="text-text-secondary mt-2 text-sm max-w-xl mx-auto">
            Each piece is custom-made from scratch based on your chosen design.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-sm font-medium tracking-wide rounded-full transition-all ${
                filter === f.key
                  ? 'bg-antique-gold text-white shadow-md'
                  : 'bg-white text-text-secondary border border-divider-gold hover:border-antique-gold'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all border border-divider-gold"
            >
              <div className="aspect-[3/4] overflow-hidden bg-pastel-pink/20">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/600x800/FCF9F2/B8860B?text=${encodeURIComponent(item.title)}`;
                  }}
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-antique-gold uppercase tracking-wider font-medium mb-1">
                  {item.category}
                </p>
                <h3 className="text-base font-serif text-text-primary mb-2">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-text-primary">
                    {formatPrice(item.priceUsd, currency)}
                  </span>
                  <button
                    onClick={() => openWhatsApp(
                      `Hi, I am interested in "${item.title}" (${formatPrice(item.priceUsd, currency)}). Is it available? Can I get a similar one custom-made?`,
                      'gallery_enquiry',
                      { item_id: item.id, item_name: item.title, item_price: item.priceUsd }
                    )}
                    className="flex items-center gap-1 text-antique-gold hover:text-text-primary text-xs font-medium transition-colors"
                  >
                    <MessageCircle size={12} fill="currentColor" strokeWidth={0} />
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;
