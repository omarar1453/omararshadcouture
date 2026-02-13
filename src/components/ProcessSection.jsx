import React from 'react';
import { Video, Ruler, Globe, Truck } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: <Video size={24} />,
      step: '01',
      title: 'Free Consultation',
      desc: 'Share your dream design via WhatsApp. Our expert discusses fabric, colors, and budget with you.',
    },
    {
      icon: <Ruler size={24} />,
      step: '02',
      title: 'Live Measurements',
      desc: 'We guide you through precise measurements over a live video call for a perfect fit.',
    },
    {
      icon: <Globe size={24} />,
      step: '03',
      title: 'Video Fitting',
      desc: 'See your outfit being made. We send progress updates and do a live video fitting before shipping.',
    },
    {
      icon: <Truck size={24} />,
      step: '04',
      title: 'Worldwide Delivery',
      desc: 'Your custom piece ships free via DHL/FedEx with tracking. Delivered in 15-25 days total.',
    },
  ];

  return (
    <section id="process" className="bg-white py-10 sm:py-14 px-4 sm:px-6 border-t border-divider-gold">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-antique-gold tracking-[0.5em] uppercase text-[10px] font-bold mb-2 block">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-text-primary italic">
            Your Bridal Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-antique-gold/30 bg-ivory flex items-center justify-center text-antique-gold mb-4">
                {step.icon}
              </div>
              <span className="text-xs text-antique-gold font-bold tracking-widest mb-2">{step.step}</span>
              <h4 className="text-base font-serif font-semibold text-text-primary mb-2">{step.title}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
