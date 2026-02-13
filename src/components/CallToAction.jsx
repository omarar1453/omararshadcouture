import React from 'react';
import { MapPin } from 'lucide-react';

const CallToAction = () => {
    return (
        <section className="bg-ivory py-fluid-padding px-8 text-center relative overflow-hidden border-t border-antique-gold/10">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <img src="https://www.transparenttextures.com/patterns/natural-paper.png" alt="Paper texture background" />
            </div>
            <div className="max-w-2xl mx-auto relative z-10">
                <h2 className="text-fluid-h2 text-text-primary serif italic mb-8 leading-tight">Start Your <br />Royalty Chapter</h2>
                <div className="luxury-divider opacity-20 mb-12"></div>
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
                    <button className="primary w-full md:w-auto px-12 font-bold shadow-xl group focus:outline-none focus:ring-1 focus:ring-antique-gold overflow-hidden">
                        <div className="mirror-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10">Begin the Design</span>
                    </button>
                    <button className="text-text-primary border border-antique-gold/30 px-12 py-5 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-antique-gold hover:text-ivory transition-all focus:outline-none focus:ring-1 focus:ring-antique-gold">Find Our Studio</button>
                </div>

                <div className="w-full h-[400px] border border-antique-gold/10 overflow-hidden flex flex-col items-center justify-center p-8 relative group">
                    <div className="relative z-10 flex flex-col items-center">
                        <MapPin className="text-antique-gold mb-4" size={32} aria-hidden="true" />
                        <p className="text-text-primary/70 uppercase text-[10px] tracking-[0.5em] mb-2 font-bold">Flagship Atelier</p>
                        <p className="text-text-secondary text-[8px] tracking-[0.3em] uppercase mb-8">Delhi & Lahore Global Studios</p>
                    </div>
                    <div
                        className="absolute inset-0 bg-cover bg-center grayscale opacity-10 group-hover:opacity-20 transition-opacity duration-[2s]"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200')" }}
                        role="img"
                        aria-label="Map location of the studio"
                    ></div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
