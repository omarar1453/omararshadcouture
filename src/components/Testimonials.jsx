import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../utils/tracking';

const Testimonials = () => {
  // Replace with real testimonials as they come in.
  // For now, these are representative of typical client experiences.
  const reviews = [
    {
      id: 1,
      name: 'Ayesha K.',
      loc: 'London, UK',
      text: 'I sent them a photo of my dream lehenga and they recreated it perfectly. The live video fitting gave me so much confidence. Delivered in 18 days!',
      product: 'Red Bridal Lehenga',
      rating: 5,
    },
    {
      id: 2,
      name: 'Zainab S.',
      loc: 'New York, USA',
      text: 'Amazing quality and the team was incredibly responsive on WhatsApp throughout the process. My nikkah dress was exactly what I envisioned.',
      product: 'Nikkah Lehenga Choli',
      rating: 5,
    },
    {
      id: 3,
      name: 'Sara M.',
      loc: 'Toronto, Canada',
      text: 'I was nervous ordering custom bridal wear from overseas, but the video consultations and progress updates put me at ease. The final product exceeded my expectations.',
      product: 'Custom Bridal Saree',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="bg-ivory py-10 sm:py-14 px-4 sm:px-6 border-t border-divider-gold">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-antique-gold tracking-[0.5em] uppercase text-[10px] font-bold mb-2 block">
            Happy Brides
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-text-primary italic">
            What Our Brides Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl p-6 border border-divider-gold shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex text-antique-gold mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-4 italic">
                "{rev.text}"
              </p>

              <div className="border-t border-divider-gold pt-4">
                <p className="text-base font-semibold text-text-primary">{rev.name}</p>
                <p className="text-xs text-text-secondary">{rev.loc}</p>
                <p className="text-xs text-antique-gold mt-1">{rev.product}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => openWhatsApp(
              'Hi, I saw the testimonials on your website and I am interested in getting a custom bridal outfit made.',
              'testimonials_cta'
            )}
            className="inline-flex items-center gap-2 border border-antique-gold text-antique-gold hover:bg-antique-gold hover:text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all"
          >
            <MessageCircle size={14} fill="currentColor" strokeWidth={0} />
            Start Your Bridal Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
