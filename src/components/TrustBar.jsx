import React from 'react';
import { Ruler, ShieldCheck, Globe, Clock } from 'lucide-react';

const TrustBar = () => {
  const badges = [
    { icon: <Globe size={20} />, label: 'Ships to USA, UK & Canada' },
    { icon: <Clock size={20} />, label: '15-20 Day Delivery' },
    { icon: <Ruler size={20} />, label: '100% Custom Made' },
    { icon: <ShieldCheck size={20} />, label: 'Satisfaction Guaranteed' },
  ];

  return (
    <section className="bg-white border-y border-divider-gold py-5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-text-secondary">
              <span className="text-antique-gold">{badge.icon}</span>
              <span className="text-xs sm:text-sm font-medium tracking-wide">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
