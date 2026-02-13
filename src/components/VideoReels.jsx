import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Volume2, VolumeX, Play } from 'lucide-react';
import { openWhatsApp, trackEvent } from '../utils/tracking';

// --- REELS DATA ---
// Replace video/poster paths with your real content.
const REELS = [
  {
    id: 1,
    title: 'Karigar Hand Embroidery',
    caption: 'Watch our master craftsmen create intricate zardozi work on a crimson bridal lehenga.',
    videoSrc: '/videos/reels/karigar-embroidery.mp4',
    posterSrc: '/images/reels/karigar-embroidery-poster.jpg',
    ctaMessage: 'Hi, I saw the karigar embroidery reel. I would like to get a similar piece custom-made.',
  },
  {
    id: 2,
    title: 'Bridal Lehenga Reveal',
    caption: 'The final reveal of a custom maroon velvet bridal set, ready for shipping.',
    videoSrc: '/videos/reels/bridal-reveal.mp4',
    posterSrc: '/images/reels/bridal-reveal-poster.jpg',
    ctaMessage: 'Hi, I loved the bridal reveal reel. Can I get a similar outfit?',
  },
  {
    id: 3,
    title: 'Fabric Selection Process',
    caption: 'How we select the finest silk, velvet, and organza for your bridal outfit.',
    videoSrc: '/videos/reels/fabric-selection.mp4',
    posterSrc: '/images/reels/fabric-selection-poster.jpg',
    ctaMessage: 'Hi, I saw your fabric selection process. Can you help me choose fabrics?',
  },
  {
    id: 4,
    title: 'Live Client Fitting',
    caption: 'A video fitting session with a client in the UK -- see how we ensure perfect fit remotely.',
    videoSrc: '/videos/reels/client-fitting.mp4',
    posterSrc: '/images/reels/client-fitting-poster.jpg',
    ctaMessage: 'Hi, I saw the fitting session reel. How does the remote fitting work?',
  },
];

const ReelCard = ({ reel, videoRefs, mutedReels, setMutedReels }) => {
  const isMuted = mutedReels[reel.id] !== false;

  const toggleMute = (e) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setMutedReels(prev => ({ ...prev, [reel.id]: !newMuted }));
    if (videoRefs.current[reel.id]) {
      videoRefs.current[reel.id].muted = newMuted;
    }
  };

  return (
    <div className="flex-shrink-0 w-[200px] sm:w-auto bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-divider-gold group">
      {/* Video container - 9:16 */}
      <div className="relative aspect-[9/16] bg-pastel-pink/10 overflow-hidden">
        <video
          ref={(el) => { videoRefs.current[reel.id] = el; }}
          src={reel.videoSrc}
          poster={reel.posterSrc}
          loop
          muted={isMuted}
          playsInline
          preload="none"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-sm p-2 rounded-full text-white/80 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {/* Play indicator overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Play size={20} className="text-white ml-0.5" fill="white" />
          </div>
        </div>

        {/* Poster fallback */}
        <img
          src={reel.posterSrc}
          alt={reel.title}
          className="absolute inset-0 w-full h-full object-cover -z-10"
          onError={(e) => {
            e.target.src = `https://placehold.co/360x640/FCF9F2/B8860B?text=${encodeURIComponent(reel.title)}`;
          }}
        />
      </div>

      {/* Info + CTA */}
      <div className="p-3.5">
        <h3 className="text-sm font-serif font-semibold text-text-primary mb-1 line-clamp-1">
          {reel.title}
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">
          {reel.caption}
        </p>
        <button
          onClick={() => openWhatsApp(
            reel.ctaMessage,
            'reel_enquiry',
            { reel_id: reel.id, reel_title: reel.title }
          )}
          className="w-full flex items-center justify-center gap-1.5 border border-antique-gold text-antique-gold hover:bg-antique-gold hover:text-white py-2 rounded-full text-xs font-medium transition-all"
        >
          <MessageCircle size={12} fill="currentColor" strokeWidth={0} />
          Enquire
        </button>
      </div>
    </div>
  );
};

const VideoReels = () => {
  const [mutedReels, setMutedReels] = useState({});
  const videoRefs = useRef({});

  // IntersectionObserver: autoplay when visible, pause when not
  useEffect(() => {
    const observers = {};

    // Small delay to ensure refs are populated
    const timer = setTimeout(() => {
      Object.entries(videoRefs.current).forEach(([id, videoEl]) => {
        if (!videoEl) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                videoEl.play().catch(() => {});
                trackEvent('reel_in_view', { reel_id: id });
              } else {
                videoEl.pause();
              }
            });
          },
          { threshold: 0.6 }
        );

        observer.observe(videoEl);
        observers[id] = observer;
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      Object.values(observers).forEach(obs => obs.disconnect());
    };
  }, []);

  return (
    <section id="reels" className="bg-ivory py-10 sm:py-14 px-4 sm:px-6 border-t border-divider-gold">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-8">
          <span className="text-antique-gold tracking-[0.5em] uppercase text-[10px] font-bold mb-2 block">
            Behind the Craft
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-text-primary italic">
            Watch Us Create
          </h2>
          <p className="text-text-secondary mt-2 text-sm max-w-xl mx-auto">
            See our karigars bring your dream bridal outfit to life, from sketch to finished masterpiece.
          </p>
        </div>

        {/* Reels: horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 scrollbar-hide pb-4 sm:pb-0">
          {REELS.map(reel => (
            <ReelCard
              key={reel.id}
              reel={reel}
              videoRefs={videoRefs}
              mutedReels={mutedReels}
              setMutedReels={setMutedReels}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoReels;
