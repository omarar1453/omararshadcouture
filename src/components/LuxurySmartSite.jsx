import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, MessageCircle, X, Phone, MapPin, Instagram, Bookmark, Volume2, VolumeX, ArrowRight, History, Send, Share2, Globe, Trash2, ChevronDown, Menu, Search, UserPlus, Mail, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Testimonials from './Testimonials';
import ProcessSection from './ProcessSection';
import Footer from './Footer';

// --- 1. SMART DATA ---
const ALL_STORIES = [
    { id: 1, tag: 'red-bridal', title: 'Red Sketch', thumb: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200', url: 'LINK_TO_RED_PROCESS_VIDEO' },
    { id: 2, tag: 'lehenga-choli', title: 'Lehenga Craft', thumb: 'https://images.unsplash.com/photo-1610519502937-5c8c79d6e1e1?w=200', url: 'LINK_TO_LEHENGA_CRAFT_VIDEO' },
    { id: 3, tag: 'saree', title: 'Saree Draping', thumb: 'https://images.unsplash.com/photo-1617263165318-4d8f60c36f9b?w=200', url: 'LINK_TO_SAREE_VIDEO' },
    { id: 4, tag: 'red-bridal', title: 'Red Craft', thumb: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200', url: 'LINK_TO_RED_EMBROIDERY_VIDEO' },
];

const ALL_POSTS = [
    {
        id: 101,
        tag: 'red-bridal',
        designer: 'OMA Signature',
        url: 'LINK_TO_RED_FINAL_VIDEO',
        thumb: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100',
        caption: 'The Royal Crimson: Canal Road ka shahkar. Delivered to USA/UK. 🌹',
        likesCode: 5200,
        likesStr: '5.2k',
        location: 'Mall of Faisalabad',
        priceUsd: 2500 // Base Price in USD
    },
    {
        id: 102,
        tag: 'lehenga-choli',
        designer: 'Bespoke Couture',
        url: 'LINK_TO_LEHENGA_FINAL_VIDEO',
        thumb: 'https://images.unsplash.com/photo-1610519502937-5c8c79d6e1e1?w=100',
        caption: 'Mint Green Lehenga Choli - Perfect for your Nikkah. ✨',
        likesCode: 3800,
        likesStr: '3.8k',
        location: 'Faisalabad Studio',
        priceUsd: 1800
    },
    {
        id: 103,
        tag: 'saree',
        designer: 'Heritage Saree',
        url: 'LINK_TO_SAREE_FINAL_VIDEO',
        thumb: 'https://images.unsplash.com/photo-1617263165318-4d8f60c36f9b?w=100',
        caption: 'Classic Banarasi Saree with a modern twist. 👑',
        likesCode: 2900,
        likesStr: '2.9k',
        location: 'Canal Road',
        priceUsd: 950
    },
    {
        id: 104,
        tag: 'red-bridal',
        designer: 'Ruby Red',
        url: 'LINK_TO_RED_FINAL_VIDEO',
        thumb: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100',
        caption: 'Another stunning Red Bridal masterpiece.',
        likesCode: 4100,
        likesStr: '4.1k',
        location: 'Mall of Faisalabad',
        priceUsd: 2200
    }
];

const CURRENCIES = [
    { code: 'USD', symbol: '$', rate: 1, label: 'USD ($)' },
    { code: 'GBP', symbol: '£', rate: 0.75, label: 'GBP (£)' },
    { code: 'EUR', symbol: '€', rate: 0.90, label: 'EUR (€)' },
    { code: 'PKR', symbol: 'Rs', rate: 280, label: 'PKR (Rs)' },
    { code: 'AED', symbol: 'AED', rate: 3.67, label: 'AED' },
];

// --- 2. MAIN COMPONENT ---
const LuxurySmartSite = () => {
    const [activeStory, setActiveStory] = useState(null);
    const [progress, setProgress] = useState(0);

    // Interactive State
    const [likedPosts, setLikedPosts] = useState({});
    const [savedPosts, setSavedPosts] = useState({});
    const [mutedPosts, setMutedPosts] = useState({});
    const [recentlyViewedIds, setRecentlyViewedIds] = useState([]);
    const [copiedId, setCopiedId] = useState(null);

    // Retention Popup State
    const [showExitPopup, setShowExitPopup] = useState(false);
    const [hasShownPopup, setHasShownPopup] = useState(false);

    // Tracking & Location & Currency State
    const [trackingInfo, setTrackingInfo] = useState({ source: 'direct', campaign: '', gclid: '' });
    const [userLocation, setUserLocation] = useState('Checking availability...');
    const [currency, setCurrency] = useState({ code: 'USD', symbol: '$', rate: 1 });
    const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

    // URL Parameter Check & Tracking Logic
    const filteredData = useMemo(() => {
        // ... Logic remains same ...
        const params = new URLSearchParams(window.location.search);
        const source = params.get('utm_source') || 'direct';
        const campaign = params.get('utm_campaign') || params.get('campaign') || '';
        const gclid = params.get('gclid') || '';
        let styleTag = params.get('style');
        if (!styleTag && campaign) {
            if (campaign.includes('red') || campaign.includes('crimson')) styleTag = 'red-bridal';
            if (campaign.includes('lehenga') || campaign.includes('nikkah')) styleTag = 'lehenga-choli';
            if (campaign.includes('saree')) styleTag = 'saree';
        }
        if (!styleTag) return { stories: ALL_STORIES, posts: ALL_POSTS };
        return {
            stories: ALL_STORIES.filter(s => s.tag === styleTag),
            posts: ALL_POSTS.filter(p => p.tag === styleTag)
        };
    }, []);

    // Fetch Logic (Location & Currency) & Load History & Setup Exit Intent
    useEffect(() => {
        // ... Logic remains same ...
        const params = new URLSearchParams(window.location.search);
        setTrackingInfo({
            source: params.get('utm_source') || 'direct',
            campaign: params.get('utm_campaign') || params.get('campaign') || '',
            gclid: params.get('gclid') || ''
        });
        const savedHistory = localStorage.getItem('omar_viewed_history');
        if (savedHistory) setRecentlyViewedIds(JSON.parse(savedHistory));
        const sessionPopup = sessionStorage.getItem('omar_exit_popup_shown');
        if (sessionPopup) setHasShownPopup(true);

        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                if (data.city && data.country_name) {
                    setUserLocation(`DELIVERING TO ${data.city.toUpperCase()}, ${data.country_name.toUpperCase()}`);
                } else {
                    setUserLocation('WORLDWIDE SHIPPING AVAILABLE');
                }
                const country = data.country_code;
                if (country === 'GB') setCurrency(CURRENCIES.find(c => c.code === 'GBP'));
                else if (country === 'PK') setCurrency(CURRENCIES.find(c => c.code === 'PKR'));
                else if (country === 'AE') setCurrency(CURRENCIES.find(c => c.code === 'AED'));
                else if (['DE', 'FR', 'IT', 'ES', 'NL'].includes(country)) setCurrency(CURRENCIES.find(c => c.code === 'EUR'));
                else setCurrency(CURRENCIES.find(c => c.code === 'USD'));
            })
            .catch(() => {
                setUserLocation('WORLDWIDE SHIPPING AVAILABLE');
                setCurrency(CURRENCIES.find(c => c.code === 'USD'));
            });
    }, []);

    // Exit Intent Logic 
    useEffect(() => {
        // ... Logic remains same ...
        if (hasShownPopup) return;
        const handleMouseLeave = (e) => {
            if (e.clientY <= 0) triggerPopup();
        };
        const timer = setTimeout(() => triggerPopup(), 15000);
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            clearTimeout(timer);
        };
    }, [hasShownPopup]);

    const triggerPopup = () => {
        if (sessionStorage.getItem('omar_exit_popup_shown')) return;
        setShowExitPopup(true);
        setHasShownPopup(true);
        sessionStorage.setItem('omar_exit_popup_shown', 'true');
    };
    const closePopup = () => setShowExitPopup(false);

    // Story Progress Logic
    useEffect(() => {
        // ... Logic remains same ...
        let timer;
        if (activeStory) {
            timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) { setActiveStory(null); return 0; }
                    return prev + 1.5;
                });
            }, 100);
        } else { setProgress(0); }
        return () => clearInterval(timer);
    }, [activeStory]);

    // --- HANDLERS ---
    const addToHistory = (id) => {
        setRecentlyViewedIds(prev => {
            const newHistory = [id, ...prev.filter(x => x !== id)].slice(0, 5);
            localStorage.setItem('omar_viewed_history', JSON.stringify(newHistory));
            return newHistory;
        });
    };
    const clearHistory = () => {
        setRecentlyViewedIds([]);
        localStorage.removeItem('omar_viewed_history');
    };
    const toggleLike = (id) => { setLikedPosts(prev => ({ ...prev, [id]: !prev[id] })); addToHistory(id); };
    const toggleSave = (id) => { setSavedPosts(prev => ({ ...prev, [id]: !prev[id] })); addToHistory(id); };
    const toggleMute = (id) => { setMutedPosts(prev => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] })); addToHistory(id); };
    const isUnmuted = (id) => !!mutedPosts[id];

    const handleShare = (post) => { /* ... */ }; // Placeholder ref

    const handleNativeShareLogic = async (post) => {
        addToHistory(post.id);
        const shareData = {
            title: `Omar Arshad Couture - ${post.designer}`,
            text: `Check out this stunning ${post.designer} look: "${post.caption}"`,
            url: `${window.location.origin}${window.location.pathname}?style=${post.tag}&utm_source=share`
        };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) { console.error(err); }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                setCopiedId(post.id);
                setTimeout(() => setCopiedId(null), 2000);
            } catch (err) { console.error(err); }
        }
    };

    const handleWhatsappShare = (post) => {
        let trackingRef = '';
        if (trackingInfo.gclid) trackingRef += ` [G-Ad: ${trackingInfo.gclid.substring(0, 5)}..]`;
        else if (trackingInfo.campaign) trackingRef += ` [Camp: ${trackingInfo.campaign}]`;
        else trackingRef += ` [Ref: SmartSite]`;
        const text = `Hi, I am interested in the ${post.designer} look I saw on your Smart Site: "${post.caption}" (Price: ${formatPrice(post.priceUsd)}). Is it available?${trackingRef}`;
        const url = `https://wa.me/923007201800?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        addToHistory(post.id);
    };

    const formatLikes = (post) => {
        const base = post.likesCode;
        const isLiked = likedPosts[post.id];
        const val = isLiked ? base + 1 : base;
        return val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val;
    };

    const formatPrice = (usdPrice) => {
        if (!usdPrice) return '';
        const val = Math.round(usdPrice * currency.rate);
        return `${currency.symbol} ${val.toLocaleString()}`;
    };

    const scrollToPost = (id) => {
        const element = document.getElementById(`post-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const recentlyViewedPosts = ALL_POSTS.filter(p => recentlyViewedIds.includes(p.id));

    // --- DARK MODE: Full Black Background, White Text ---
    return (
        <div className="min-h-screen bg-black text-white font-serif selection:bg-gold-luxury selection:text-black">

            {/* 1. TOP UTILITY BAR (Black & Minimal) */}
            <div className="bg-black text-white/70 text-[9px] tracking-[0.2em] uppercase py-2 sticky top-0 z-[60] flex justify-between items-center px-4 border-b border-white/10">
                <div className="flex items-center gap-2 opacity-80">
                    <MapPin size={10} strokeWidth={1} />
                    <span className="truncate max-w-[150px]">{userLocation}</span>
                </div>
                {/* Manual Currency Switcher */}
                <div className="relative">
                    <button
                        onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                        className="flex items-center gap-1 hover:text-white transition-colors opacity-90"
                    >
                        {currency.code} <ChevronDown size={8} strokeWidth={1} />
                    </button>
                    {showCurrencyDropdown && (
                        <div className="absolute top-full right-0 mt-2 bg-black border border-white/20 shadow-2xl py-1 w-24">
                            {CURRENCIES.map(c => (
                                <button
                                    key={c.code}
                                    onClick={() => { setCurrency(c); setShowCurrencyDropdown(false); }}
                                    className={`block w-full text-left px-3 py-2 hover:bg-white/10 ${currency.code === c.code ? 'text-gold-luxury' : 'text-white'}`}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 2. MAIN BRAND HEADER */}
            <header className="bg-black py-4 px-4 border-b border-white/10 flex items-center justify-between relative shadow-sm z-50">
                <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
                    <Menu size={20} strokeWidth={1} />
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 text-center">
                    <h1 className="text-lg md:text-xl font-bold tracking-[0.3em] uppercase text-white">Omar Arshad</h1>
                    <p className="text-[7px] tracking-[0.4em] text-white/50 uppercase mt-1">Couture</p>
                </div>

                <div className="flex gap-4 text-white opacity-70">
                    <Search size={20} strokeWidth={1} className="hover:opacity-100 cursor-pointer" />
                    <a href="https://instagram.com" target="_blank" className="hover:opacity-100"><Instagram size={20} strokeWidth={1} /></a>
                </div>
            </header>

            {/* DYNAMIC STORIES BAR (Instagram Gradient) */}
            <div className="max-w-md mx-auto py-5 px-4 flex gap-4 overflow-x-auto no-scrollbar items-start">


                {filteredData.stories.map(story => (
                    <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group" onClick={() => setActiveStory(story)}>
                        {/* INSTAGRAM GRADIENT RING */}
                        <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500 group-hover:scale-105 transition-transform duration-300">
                            <div className="w-full h-full rounded-full bg-black p-[2px]">
                                <img src={story.thumb} className="w-full h-full rounded-full object-cover grayscale-0" alt={story.title} />
                            </div>
                        </div>
                        <span className="text-[10px] tracking-wide text-white/90 truncate max-w-[64px]">{story.title}</span>
                    </div>
                ))}
            </div>

            {/* 3. DESIGNER PROFILE (Left Aligned, Below Stories) */}
            <div className="max-w-md mx-auto py-4 px-5 flex flex-row items-center gap-5 border-b border-white/10 bg-black">
                {/* Profile Pic Ring (Gold to stand out) */}
                <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-gold-luxury to-gold-champagne animate-pulse-subtle">
                        <div className="w-full h-full rounded-full bg-black p-[2px]">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces"
                                alt="Omar Arshad Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Bio Info (Left Aligned, White Text) */}
                <div className="flex flex-col text-left">
                    <h2 className="text-base font-serif font-medium text-white tracking-wide mb-1 leading-tight">
                        Omar Arshad
                    </h2>
                    <p className="text-[9px] text-white/50 uppercase tracking-[0.2em] mb-2">Creative Director</p>

                    <p className="text-[11px] text-white/80 leading-relaxed font-light">
                        Reviving Heritage. Crafting Legacy. <br />
                        Bespoke Bridal & Luxury Pret. <br />
                        <span className="text-blue-400">Worldwide Shipping 🌍</span>
                    </p>
                </div>
            </div>

            {/* DYNAMIC VIDEO FEED (Dark Mode) */}
            <main className="max-w-md mx-auto mt-2">
                {filteredData.posts.map(post => {
                    const similarPosts = filteredData.posts.filter(p => p.tag === post.tag && p.id !== post.id).slice(0, 3);

                    return (
                        <article key={post.id} id={`post-${post.id}`} className="relative aspect-[9/16] bg-zinc-900 mb-1 group overflow-hidden border-b border-white/5">
                            {/* ... Video Logic ... */}
                            <video
                                src={post.url}
                                autoPlay
                                loop
                                muted={!isUnmuted(post.id)}
                                playsInline
                                className="w-full h-full object-cover opacity-90 cursor-pointer"
                                onClick={() => toggleMute(post.id)}
                            />

                            <div className="absolute top-6 right-6 z-20 pointer-events-none">
                                {isUnmuted(post.id) ?
                                    <div className="bg-black/30 backdrop-blur-sm p-2 rounded-full border border-white/10"><Volume2 size={14} strokeWidth={1} className="text-white" /></div> :
                                    <div className="bg-black/30 backdrop-blur-sm p-2 rounded-full border border-white/10"><VolumeX size={14} strokeWidth={1} className="text-white/70" /></div>
                                }
                            </div>

                            {/* SIMILAR STYLES */}
                            {similarPosts.length > 0 && (
                                <div className="absolute bottom-[28%] left-6 right-0 z-30 pointer-events-auto">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[9px] text-gold-luxury uppercase tracking-[0.2em] font-medium drop-shadow-md">Matching Pairs</span>
                                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                            {similarPosts.map(sim => (
                                                <div key={sim.id} onClick={() => scrollToPost(sim.id)} className="w-14 h-20 bg-black/60 border border-white/20 overflow-hidden flex-shrink-0 cursor-pointer hover:border-gold-luxury transition-colors">
                                                    <img src={sim.thumb} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <AnimatePresence>
                                {copiedId === post.id && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 tracking-widest uppercase text-[10px] font-bold z-50 shadow-xl">
                                        Link Copied
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* OVERLAY CONTENT */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none">
                                <div className="flex items-end justify-between mb-4 pointer-events-auto">
                                    <div>
                                        <h3 className="text-lg font-serif italic text-white mb-1">{post.designer}</h3>
                                        <p className="text-[10px] uppercase tracking-widest text-white/70 mb-2">{post.location}</p>
                                        <p className="text-xs leading-relaxed text-white/90 font-light max-w-[80%]">{post.caption}</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-sm">
                                        <span className="text-sm font-serif text-white">{formatPrice(post.priceUsd)}</span>
                                    </div>
                                </div>

                                {/* ACTION ROW */}
                                <div className="flex items-center justify-between border-t border-white/10 pt-4 pointer-events-auto">
                                    <div className="flex items-center gap-6 text-white">
                                        <button onClick={() => toggleLike(post.id)} className="flex items-center gap-2 group/btn">
                                            <Heart size={20} strokeWidth={1.5} className={likedPosts[post.id] ? "fill-red-500 text-red-500" : "group-hover/btn:text-white transition-colors"} />
                                            <span className="text-[10px] tracking-wider font-medium">{formatLikes(post)}</span>
                                        </button>

                                        <button onClick={() => handleNativeShareLogic(post)} className="flex items-center gap-2 group/btn">
                                            <Send size={20} strokeWidth={1.5} className="-rotate-12 group-hover/btn:text-white transition-colors" />
                                            <span className="text-[10px] tracking-wider font-medium">SHARE</span>
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button onClick={() => toggleSave(post.id)} className="text-white hover:text-white transition-colors">
                                            <Bookmark size={20} strokeWidth={1.5} className={savedPosts[post.id] ? "fill-white text-white" : ""} />
                                        </button>
                                        <button onClick={() => handleWhatsappShare(post)} className="bg-white text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white/90 transition-colors">
                                            Enquire
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}

                {/* RECENTLY VIEWED (Dark Mode) */}
                {recentlyViewedPosts.length > 0 && (
                    <section className="py-12 pl-6 bg-black border-t border-white/10">
                        <div className="flex items-center justify-between pr-6 mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-white">Your Collection</h3>
                            <button onClick={clearHistory} className="text-[9px] tracking-widest uppercase text-white/50 hover:text-red-500 border-b border-transparent hover:border-red-500 transition-colors">Clear All</button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6">
                            {recentlyViewedPosts.map(item => (
                                <div key={item.id} onClick={() => scrollToPost(item.id)} className="min-w-[140px] aspect-[9/16] grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer relative group">
                                    <img src={item.thumb} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* FOOTER & EXTRA SECTIONS (Passed Black Mode via Context if needed, but styling global bg-black handles it) */}
                <div className="bg-black text-white/80">
                    <ProcessSection />
                    <Testimonials />
                    <Footer />
                </div>
            </main>

            {/* MODALS & STICKY CTA */}
            <AnimatePresence>
                {activeStory && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black">
                        <div className="absolute top-4 left-0 right-0 px-4 flex gap-1 z-50">
                            <div className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white transition-all duration-100" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                        <button onClick={() => setActiveStory(null)} className="absolute top-8 right-6 text-white z-50"><X size={28} strokeWidth={1} /></button>
                        <div className="h-full flex items-center justify-center">
                            <video src={activeStory.url} autoPlay muted playsInline className="w-full object-contain" />
                        </div>
                        <div className="absolute bottom-10 left-0 right-0 text-center p-6 bg-gradient-to-t from-black to-transparent">
                            <h2 className="text-white text-xl font-serif italic mb-6">{activeStory.title}</h2>
                            <a href={`https://wa.me/923007201800?text=Story Enquiry: ${activeStory.title}`} className="inline-block border border-white text-white px-8 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors">Start Chat</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showExitPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center px-8"
                    >
                        <div className="bg-zinc-900 p-10 max-w-sm w-full text-center relative shadow-2xl border-t-4 border-gold-luxury">
                            <button onClick={closePopup} className="absolute top-4 right-4 text-white opacity-50 hover:opacity-100"><X size={20} strokeWidth={1} /></button>
                            <h3 className="text-2xl font-serif italic text-white mb-4">Before you go...</h3>
                            <p className="text-white/70 text-xs mb-8 leading-relaxed tracking-wide">
                                Luxury pieces are limited. Save your wishlist to WhatsApp to ensure availability.
                            </p>
                            <a href={`https://wa.me/923007201800?text=Hi, saving my wishlist.`} className="block w-full bg-white text-black py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-gold-luxury hover:text-white transition-colors">
                                Save to WhatsApp
                            </a>
                            <button onClick={closePopup} className="mt-4 text-[9px] uppercase tracking-widest text-white/50 underline decoration-transparent hover:decoration-white transition-all">
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs z-40">
                <a href={`https://wa.me/923007201800?text=Consultation Request`} className="flex items-center justify-between bg-zinc-900 text-white px-6 py-4 shadow-2xl hover:bg-gold-luxury hover:text-black transition-colors group">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Book Consultation</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </a>
            </div>

        </div>
    );
};

export default LuxurySmartSite;
