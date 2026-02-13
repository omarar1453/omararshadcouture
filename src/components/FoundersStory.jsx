import React from 'react';

const FoundersStory = () => {
    return (
        <section className="bg-ivory py-fluid-padding px-8 overflow-hidden">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="flex flex-col">
                    <span className="text-antique-gold tracking-[0.6em] uppercase text-[10px] font-bold mb-4">The Artistic Vision</span>
                    <h2 className="text-fluid-h2 serif italic mb-10 leading-tight text-text-primary">Behind the Sparkle</h2>
                    <p className="text-text-secondary text-fluid-base leading-[2.2] tracking-wide mb-10 opacity-90 font-light">
                        Drawing inspiration from the grand palaces of South Asia, our mirror-work technique is more than just craft—it's a reflection of our cultural soul. We believe in creating pieces that aren't just worn, but cherished for generations to come.
                    </p>
                    <button className="text-[10px] tracking-[0.5em] uppercase font-bold text-antique-gold border-b border-antique-gold/20 pb-2 w-fit hover:border-antique-gold transition-all group focus:outline-none focus:ring-1 focus:ring-antique-gold">
                        The Mirror Series
                    </button>
                </div>
                <div className="relative group">
                    <div className="aspect-[4/5] bg-maroon-deep/5 luxury-border relative p-1 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1594411133333-e7e0259f979c?q=80&w=1200"
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                            alt="Portrait of the lead designer at MM Alam studio"
                            loading="lazy"
                        />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-antique-gold/20 -z-10 bg-ivory"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoundersStory;
