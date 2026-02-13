import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-1000 ${isScrolled ? 'bg-ivory/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}
            role="navigation"
            aria-label="Main Navigation"
        >
            <div className="max-w-[1440px] mx-auto px-8 flex justify-between items-center relative">
                <nav className="hidden lg:flex space-x-12 text-[10px] tracking-[0.6em] uppercase font-bold text-text-primary">
                    <a href="#portfolio" className="hover:text-antique-gold transition-colors focus:outline-none focus:ring-1 focus:ring-antique-gold">Collections</a>
                    <a href="#process" className="hover:text-antique-gold transition-colors focus:outline-none focus:ring-1 focus:ring-antique-gold">Experience</a>
                </nav>

                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <h1 className="text-4xl font-serif text-text-primary tracking-[0.2em] font-light">
                        ABHINAV <span className="text-antique-gold font-bold">M</span>ISHRA
                    </h1>
                    <div className="w-12 h-[1px] bg-antique-gold/30 mt-1"></div>
                </div>

                <div className="flex items-center space-x-8">
                    <nav className="hidden lg:flex space-x-12 text-[10px] tracking-[0.6em] uppercase font-bold text-text-primary mr-8">
                        <a href="#testimonials" className="hover:text-antique-gold transition-colors focus:outline-none focus:ring-1 focus:ring-antique-gold">Brides</a>
                    </nav>
                    <button
                        className="border border-antique-gold/40 text-antique-gold px-8 py-3 text-[10px] tracking-[0.5em] uppercase font-bold hover:bg-antique-gold hover:text-ivory transition-all duration-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-antique-gold"
                        aria-label="Book a virtual consultation"
                    >
                        Virtual Consult
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
