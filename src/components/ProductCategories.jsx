import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../utils/tracking';

const categories = [
  {
    id: 'lehenga',
    name: 'Bridal Lehenga Choli',
    description: 'Custom Pakistani bridal lehengas with heavy hand embroidery, dabka, and stone work. Perfect for your baraat day.',
    price: 'From $1,800',
    image: '/images/categories/lehenga.jpg',
    tags: ['Baraat', 'Reception', 'Walima'],
    whatsappMsg: 'Hi, I am interested in a custom Bridal Lehenga Choli. Can you share designs and pricing?',
  },
  {
    id: 'sharara',
    name: 'Bridal Sharara',
    description: 'Elegant Pakistani sharara suits with intricate embroidery. A timeless choice for nikkah and mehndi events.',
    price: 'From $950',
    image: '/images/categories/sharara.jpg',
    tags: ['Nikkah', 'Mehndi', 'Engagement'],
    whatsappMsg: 'Hi, I am interested in a custom Bridal Sharara. Can you share designs and pricing?',
  },
  {
    id: 'gharara',
    name: 'Bridal Gharara',
    description: 'Traditional Pakistani gharara with hand-embroidered panels and premium fabrics. Ideal for nikkah and walima.',
    price: 'From $950',
    image: '/images/categories/gharara.jpg',
    tags: ['Nikkah', 'Walima', 'Formal'],
    whatsappMsg: 'Hi, I am interested in a custom Bridal Gharara. Can you share designs and pricing?',
  },
  {
    id: 'gown',
    name: 'Bridal Gowns & Maxi',
    description: 'Custom bridal gowns and maxi dresses with Pakistani embroidery. Modern silhouettes meet traditional craftsmanship.',
    price: 'From $1,800',
    image: '/images/categories/gown.jpg',
    tags: ['Reception', 'Walima', 'Engagement'],
    whatsappMsg: 'Hi, I am interested in a custom Bridal Gown. Can you share designs and pricing?',
  },
  {
    id: 'saree',
    name: 'Bridal Saree',
    description: 'Designer Pakistani bridal sarees with premium fabrics and hand embroidery. Ships worldwide with free delivery.',
    price: 'From $950',
    image: '/images/categories/saree.jpg',
    tags: ['Mehndi', 'Reception', 'Formal'],
    whatsappMsg: 'Hi, I am interested in a custom Bridal Saree. Can you share designs and pricing?',
  },
  {
    id: 'nikkah',
    name: 'Nikkah & Mehndi Dresses',
    description: 'Custom nikkah outfits, mehndi dresses, and event wear. From simple elegance to heavy embroidery — tailored to your vision.',
    price: 'From $950',
    image: '/images/categories/nikkah.jpg',
    tags: ['Nikkah', 'Mehndi', 'Dholki'],
    whatsappMsg: 'Hi, I am interested in a custom Nikkah/Mehndi dress. Can you share designs and pricing?',
  },
];

const CategoryCard = ({ category, index }) => {
  const fallbackColors = [
    'from-amber-50 to-amber-100',
    'from-rose-50 to-rose-100',
    'from-emerald-50 to-emerald-100',
    'from-violet-50 to-violet-100',
    'from-sky-50 to-sky-100',
    'from-orange-50 to-orange-100',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-white rounded-xl border border-divider-gold overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Image / Placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={category.image}
          alt={`Custom ${category.name} by Omar Arshad Couture`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className={`hidden w-full h-full bg-gradient-to-br ${fallbackColors[index % fallbackColors.length]} items-center justify-center`}
        >
          <span className="text-4xl font-serif text-antique-gold/40">{category.name.charAt(0)}</span>
        </div>

        {/* Tags */}
        <div className="absolute bottom-2 left-2 flex gap-1.5">
          {category.tags.map((tag) => (
            <span
              key={tag}
              className="bg-white/90 backdrop-blur-sm text-text-primary text-[10px] font-medium px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-serif text-text-primary mb-1">{category.name}</h3>
        <p className="text-text-secondary text-xs leading-relaxed mb-3">{category.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-antique-gold font-semibold text-sm">{category.price}</span>
          <button
            onClick={() => openWhatsApp(category.whatsappMsg, `category_${category.id}`)}
            className="flex items-center gap-1.5 bg-antique-gold hover:bg-text-primary text-white text-xs font-medium px-3 py-2 rounded-full transition-colors"
          >
            <MessageCircle size={12} fill="white" strokeWidth={0} />
            Get Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductCategories = () => {
  return (
    <section id="categories" className="bg-ivory py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-antique-gold tracking-[0.5em] uppercase text-[10px] font-bold mb-2 block">
            What We Create
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-text-primary italic mb-3">
            Custom Pakistani Bridal Wear
          </h2>
          <p className="text-text-secondary text-sm max-w-2xl mx-auto">
            From bridal lehengas and shararas to nikkah gowns and mehndi dresses — every piece is handcrafted by master karigars, custom-made to your measurements, and shipped free worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <CategoryCard key={cat.id} category={cat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
