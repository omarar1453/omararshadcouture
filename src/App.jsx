import React from 'react';
import StickyHeader from './components/StickyHeader';
import StoriesBar from './components/StoriesBar';
import Hero from './components/Hero';
import VideoReels from './components/VideoReels';
import TrustBar from './components/TrustBar';
import GalleryGrid from './components/GalleryGrid';
import ProcessSection from './components/ProcessSection';
import PricingSection from './components/PricingSection';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import StickyBottomCTA from './components/StickyBottomCTA';
import ExitIntentPopup from './components/ExitIntentPopup';

function App() {
  return (
    <div className="min-h-screen bg-ivory text-text-primary">
      <StickyHeader />
      <StoriesBar />
      <Hero />
      <VideoReels />
      <TrustBar />
      <GalleryGrid />
      <ProcessSection />
      <PricingSection />
      <Testimonials />
      <FAQSection />
      <LeadForm />
      <Footer />
      <StickyBottomCTA />
      <ExitIntentPopup />
    </div>
  );
}

export default App;
