import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { openWhatsApp, trackEvent } from '../utils/tracking';

// --- STORIES DATA ---
// Group stories by topic. Each group has multiple items that auto-advance.
// Replace thumbnails, video/image sources with your real content.
const STORIES = [
  {
    id: 1,
    username: 'Bridal Collection',
    thumbnail: '/images/stories/story-1-thumb.jpg',
    items: [
      {
        id: 's1-1',
        type: 'video',
        src: '/videos/stories/story-1.mp4',
        poster: '/images/stories/story-1-poster.jpg',
        duration: 30000,
        caption: 'Handcrafted bridal couture — made to order',
        ctaText: 'Get a Free Quote',
        ctaMessage: 'Hi, I saw your bridal collection story and I am interested in getting a custom outfit made.',
        linkUrl: null,
      },
    ],
  },
  {
    id: 2,
    username: 'Latest Work',
    thumbnail: '/images/stories/story-2-thumb.jpg',
    items: [
      {
        id: 's2-1',
        type: 'video',
        src: '/videos/stories/story-2.mp4',
        poster: '/images/stories/story-2-poster.jpg',
        duration: 30000,
        caption: 'Custom designs crafted with love in Pakistan',
        ctaText: 'Enquire Now',
        ctaMessage: 'Hi, I saw your latest work story. Can I get details and pricing for a custom bridal outfit?',
        linkUrl: null,
      },
    ],
  },
];

const StoriesBar = () => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [viewedGroups, setViewedGroups] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('oa_viewed_stories') || '[]');
    } catch { return []; }
  });
  const videoRef = useRef(null);

  const isOpen = activeGroupIndex !== null;
  const currentGroup = isOpen ? STORIES[activeGroupIndex] : null;
  const currentItem = isOpen ? currentGroup?.items[activeItemIndex] : null;

  // --- Mark group as viewed ---
  const markViewed = useCallback((groupId) => {
    setViewedGroups(prev => {
      const updated = [...new Set([...prev, groupId])];
      localStorage.setItem('oa_viewed_stories', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // --- Open a story group ---
  const openStory = useCallback((groupIndex) => {
    setActiveGroupIndex(groupIndex);
    setActiveItemIndex(0);
    setProgress(0);
    setIsPaused(false);
    trackEvent('story_opened', {
      story_group: STORIES[groupIndex].username,
      story_id: STORIES[groupIndex].id,
    });
  }, []);

  // --- Close viewer ---
  const closeViewer = useCallback(() => {
    if (currentGroup) markViewed(currentGroup.id);
    setActiveGroupIndex(null);
    setActiveItemIndex(0);
    setProgress(0);
  }, [currentGroup, markViewed]);

  // --- Advance to next item/group ---
  const advanceStory = useCallback(() => {
    if (!currentGroup) return;

    if (activeItemIndex < currentGroup.items.length - 1) {
      // Next item in same group
      setActiveItemIndex(prev => prev + 1);
      setProgress(0);
    } else {
      // Mark current group viewed, go to next group
      markViewed(currentGroup.id);
      if (activeGroupIndex < STORIES.length - 1) {
        setActiveGroupIndex(prev => prev + 1);
        setActiveItemIndex(0);
        setProgress(0);
      } else {
        // Last group, close
        closeViewer();
      }
    }
  }, [currentGroup, activeItemIndex, activeGroupIndex, markViewed, closeViewer]);

  // --- Go back ---
  const goBack = useCallback(() => {
    if (activeItemIndex > 0) {
      setActiveItemIndex(prev => prev - 1);
      setProgress(0);
    } else if (activeGroupIndex > 0) {
      const prevGroup = STORIES[activeGroupIndex - 1];
      setActiveGroupIndex(prev => prev - 1);
      setActiveItemIndex(prevGroup.items.length - 1);
      setProgress(0);
    }
  }, [activeItemIndex, activeGroupIndex]);

  // --- Progress timer ---
  useEffect(() => {
    if (!isOpen || isPaused || !currentItem) return;

    const duration = currentItem.duration || (currentItem.type === 'video' ? 7000 : 5000);
    const increment = 100 / (duration / 100);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          advanceStory();
          return 0;
        }
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, currentItem, advanceStory]);

  // --- Reset video when item changes ---
  useEffect(() => {
    if (videoRef.current && currentItem?.type === 'video') {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeGroupIndex, activeItemIndex, currentItem?.type]);

  // --- Keyboard: Escape to close, arrows to navigate ---
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') advanceStory();
      if (e.key === 'ArrowLeft') goBack();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, closeViewer, advanceStory, goBack]);

  return (
    <>
      {/* --- STORIES ROW --- */}
      <section className="bg-ivory border-b border-divider-gold pt-16 sm:pt-18">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide items-start">
            {STORIES.map((group, idx) => (
              <button
                key={group.id}
                onClick={() => openStory(idx)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
              >
                <div
                  className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full p-[2.5px] transition-transform duration-300 group-hover:scale-105 ${
                    viewedGroups.includes(group.id)
                      ? 'bg-gradient-to-tr from-gray-300 to-gray-400'
                      : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500'
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-ivory p-[2px]">
                    <img
                      src={group.thumbnail}
                      alt={group.username}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/72x72/FCF9F2/B8860B?text=${encodeURIComponent(group.username.charAt(0))}`;
                      }}
                    />
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs text-text-secondary font-medium tracking-wide truncate max-w-[72px]">
                  {group.username}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- FULLSCREEN STORY VIEWER --- */}
      <AnimatePresence>
        {isOpen && currentGroup && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeViewer}
          >
            {/* Vertical phone-like container — max 9:16 aspect on desktop, fullscreen on mobile */}
            <div
              className="relative w-full h-full md:w-auto md:h-[95vh] md:aspect-[9/16] md:rounded-2xl md:overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Multi-segment progress bar */}
              <div className="absolute top-0 left-0 right-0 px-3 pt-3 flex gap-1 z-50">
                {currentGroup.items.map((item, idx) => (
                  <div key={item.id} className="h-[3px] flex-1 bg-white/25 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                      style={{
                        width: idx < activeItemIndex ? '100%'
                             : idx === activeItemIndex ? `${progress}%`
                             : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Header: group info + controls */}
              <div className="absolute top-6 left-0 right-0 px-4 flex items-center justify-between z-50">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentGroup.thumbnail}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border border-white/30"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="text-white text-sm font-medium">{currentGroup.username}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <button
                    onClick={closeViewer}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content area with tap zones */}
              <div
                className="w-full h-full relative flex items-center justify-center"
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              >
                {/* Left tap zone - go back */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[30%] z-40 cursor-pointer"
                  onClick={goBack}
                />
                {/* Right tap zone - advance */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-[70%] z-40 cursor-pointer"
                  onClick={advanceStory}
                />

                {/* Video or Image content */}
                {currentItem.type === 'video' ? (
                  <video
                    ref={videoRef}
                    key={currentItem.id}
                    src={currentItem.src}
                    poster={currentItem.poster}
                    autoPlay
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={advanceStory}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <img
                    key={currentItem.id}
                    src={currentItem.src}
                    alt={currentItem.caption || ''}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
              </div>

              {/* Bottom CTA overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-50">
                {currentItem.caption && (
                  <p className="text-white text-sm mb-4 text-center font-light">
                    {currentItem.caption}
                  </p>
                )}

                <button
                  onClick={() => {
                    openWhatsApp(
                      currentItem.ctaMessage,
                      'story_cta',
                      { story_group: currentGroup.username, story_item: currentItem.id }
                    );
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white py-3.5 rounded-full text-sm font-semibold transition-all"
                >
                  <MessageCircle size={18} fill="white" strokeWidth={0} />
                  {currentItem.ctaText || 'Enquire on WhatsApp'}
                </button>

                {currentItem.linkUrl && (
                  <a
                    href={currentItem.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 mt-3 text-white/70 text-xs hover:text-white transition-colors"
                  >
                    <ExternalLink size={12} />
                    Learn More
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StoriesBar;
