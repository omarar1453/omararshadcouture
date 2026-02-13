import React from 'react';
import { Play } from 'lucide-react';

const CollectionReels = () => {
    const collections = [
        {
            title: "The Mirror Series",
            subtitle: "Handcrafted Reflection",
            video: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-an-elegant-bridal-dress-41312-large.mp4",
            poster: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1200"
        },
        {
            title: "Pastel Dreams",
            subtitle: "Silk & Soft Hues",
            video: "https://assets.mixkit.co/videos/preview/mixkit-bride-holding-a-bouquet-44287-large.mp4",
            poster: "https://images.unsplash.com/photo-1594411133333-e7e0259f979c?q=80&w=1200"
        },
        {
            title: "Palace Formals",
            subtitle: "Royal Festive Wear",
            video: "https://assets.mixkit.co/videos/preview/mixkit-bride-walking-in-front-of-a-castle-44284-large.mp4",
            poster: "https://images.unsplash.com/photo-1594411624683-1436fd801655?q=80&w=1200"
        }
    ];

    return (
        <section id="portfolio" className="bg-ivory py-fluid-padding font-serif px-8">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
                {collections.map((item, idx) => (
                    <div key={idx} className="flex flex-col group/card">
                        <div className="mb-8 pl-4 border-l border-antique-gold/20">
                            <p className="text-antique-gold text-[10px] tracking-[0.5em] uppercase font-bold mb-2">{item.subtitle}</p>
                            <h3 className="text-fluid-h3 font-light italic text-text-primary">{item.title}</h3>
                        </div>
                        <div className="aspect-[9/16] overflow-hidden mirror-border bg-ivory group relative">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                                poster={item.poster}
                                loading="lazy"
                            >
                                <source src={item.video} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-antique-gold/10 group-hover:bg-transparent transition-all pointer-events-none"></div>
                            <div className="absolute bottom-10 left-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all border border-white/20">
                                <Play size={16} fill="currentColor" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CollectionReels;
