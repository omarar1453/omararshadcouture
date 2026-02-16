import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { openWhatsApp, CURRENCIES, formatPrice, getCurrencyForCountry } from '../utils/tracking';

// Portfolio items — 13 real products, 2 images each
const PORTFOLIO = [
  {
    id: 1,
    title: 'Gold & Pink Heavy Bridal Lehenga',
    category: 'Bridal Lehenga',
    images: ['/images/portfolio/gallery-1.jpg', '/images/portfolio/gallery-2.jpg'],
    priceUsd: 2500,
    tag: 'bridal',
    description: 'Handcrafted gold & pink lehenga with heavy zardozi, dabka work and intricate embroidery on premium fabric.',
  },
  {
    id: 2,
    title: 'Deep Maroon Velvet Bridal',
    category: 'Bridal Gharara',
    images: ['/images/portfolio/gallery-3.jpg', '/images/portfolio/gallery-4.jpg'],
    priceUsd: 2200,
    tag: 'bridal',
    description: 'Rich maroon velvet bridal gharara with gold hand embroidery and statement dupatta. Perfect for baraat.',
  },
  {
    id: 3,
    title: 'Maroon & Gold Bridal Lehenga',
    category: 'Heavy Bridal',
    images: ['/images/portfolio/gallery-5.jpg', '/images/portfolio/gallery-6.jpg'],
    priceUsd: 2500,
    tag: 'bridal',
    description: 'Deep maroon bridal lehenga with all-over gold embroidery, kundan and sequin detailing on organza.',
  },
  {
    id: 4,
    title: 'Rust & Coral Signature Bridal',
    category: 'Bridal Gown',
    images: ['/images/portfolio/gallery-7.jpg', '/images/portfolio/gallery-8.jpg'],
    priceUsd: 1800,
    tag: 'bridal',
    description: 'Rust and coral tones with hand embroidery, peacock motifs on cotton net shirt with banarsi jamawar lehnga.',
  },
  {
    id: 5,
    title: 'Red & Gold Barat Jora',
    category: 'Bridal Sharara',
    images: ['/images/portfolio/gallery-9.jpg', '/images/portfolio/gallery-10.jpg'],
    priceUsd: 2500,
    tag: 'bridal',
    description: 'Classic red and gold barat jora with heavy hand embroidery, perfect for the traditional Pakistani bride.',
  },
  {
    id: 6,
    title: 'Pink Tissue Formal',
    category: 'Formal Wear',
    images: ['/images/portfolio/gallery-11a.jpg', '/images/portfolio/gallery-11b.jpg'],
    priceUsd: 1200,
    tag: 'formal',
    description: 'Luxurious pink tissue fabric with intricate thread, tilla embroidery, sequin work and panni embellishments.',
  },
  {
    id: 7,
    title: 'Purple Lehnga Choli',
    category: 'Lehnga Choli',
    images: ['/images/portfolio/gallery-12a.jpg', '/images/portfolio/gallery-12b.jpg'],
    priceUsd: 1800,
    tag: 'formal',
    description: 'Deep purple lehnga with luxurious hand embellishment, adda work and heavy sheesha-worked borders.',
  },
  {
    id: 8,
    title: 'Black Formal Ensemble',
    category: 'Formal Wear',
    images: ['/images/portfolio/gallery-13a.jpg', '/images/portfolio/gallery-13b.jpg'],
    priceUsd: 1200,
    tag: 'formal',
    description: 'Elegant black formal with exotic handwork and a statement dupatta. Perfect for evening events.',
  },
  {
    id: 9,
    title: 'Nahsra Formal Collection',
    category: 'Formal Wear',
    images: ['/images/portfolio/gallery-14a.jpg', '/images/portfolio/gallery-14b.jpg'],
    priceUsd: 1200,
    tag: 'formal',
    description: 'Designer formal wear with intricate detailing, ideal for weddings and special occasions.',
  },
  {
    id: 10,
    title: 'Nude Gold French Bridal',
    category: 'Bridal Lehenga',
    images: ['/images/portfolio/gallery-15a.jpg', '/images/portfolio/gallery-15b.jpg'],
    priceUsd: 2500,
    tag: 'bridal',
    description: 'Nude-gold French lame bridal with delicate French net candy pink dupatta. Elegant and sophisticated.',
  },
  {
    id: 11,
    title: 'Mint Green Formal',
    category: 'Formal Wear',
    images: ['/images/portfolio/gallery-16a.jpg', '/images/portfolio/gallery-16b.jpg'],
    priceUsd: 1200,
    tag: 'formal',
    description: 'Fresh mint green formal with heavy embroidered dupatta. A standout choice for mehndi and events.',
  },
  {
    id: 12,
    title: 'Designer Saree Collection',
    category: 'Bridal Saree',
    images: ['/images/portfolio/gallery-17a.jpg', '/images/portfolio/gallery-17b.jpg'],
    priceUsd: 950,
    tag: 'formal',
    description: 'Premium designer saree with elegant draping and embroidered border work for formal occasions.',
  },
  {
    id: 13,
    title: 'Pearl White Formal',
    category: 'Formal Wear',
    images: ['/images/portfolio/gallery-18a.jpg', '/images/portfolio/gallery-18b.jpg'],
    priceUsd: 1200,
    tag: 'formal',
    description: 'Stunning pearl white formal dress with delicate handwork. Perfect for nikkah and walima events.',
  },
];

const GalleryCard = ({ item, currency }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const images = item.images || [item.image];

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all border border-divider-gold">
      {/* Image area with slideshow */}
      <div className="aspect-[3/4] overflow-hidden bg-pastel-pink/20 relative">
        <img
          src={images[imgIndex]}
          alt={`${item.title} — view ${imgIndex + 1}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x800/FCF9F2/B8860B?text=${encodeURIComponent(item.title)}`;
          }}
        />

        {/* Navigation arrows — only if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setImgIndex(i => i === 0 ? images.length - 1 : i - 1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft size={16} className="text-text-primary" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setImgIndex(i => i === images.length - 1 ? 0 : i + 1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight size={16} className="text-text-primary" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === imgIndex ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-antique-gold uppercase tracking-wider font-medium mb-1">
          {item.category}
        </p>
        <h3 className="text-base font-serif text-text-primary mb-1">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-text-secondary mb-3 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-text-primary">
            {formatPrice(item.priceUsd, currency)}
          </span>
          <button
            onClick={() => openWhatsApp(
              `Hi, I am interested in "${item.title}" (${formatPrice(item.priceUsd, currency)}). Can I get a similar one custom-made?`,
              'gallery_enquiry',
              { item_id: item.id, item_name: item.title, item_price: item.priceUsd }
            )}
            className="flex items-center gap-1.5 bg-antique-gold/10 hover:bg-antique-gold hover:text-white text-antique-gold px-3 py-1.5 rounded-full text-xs font-medium transition-all"
          >
            <MessageCircle size={12} fill="currentColor" strokeWidth={0} />
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
};

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
    { key: 'bridal', label: 'Bridal' },
    { key: 'formal', label: 'Formal & Party' },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map(item => (
            <GalleryCard key={item.id} item={item} currency={currency} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;
