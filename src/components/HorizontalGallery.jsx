import React from 'react';
import DepthCarousel from './DepthCarousel';

const HorizontalGallery = () => {
  const images = [
    { image: "/images/wedding/wedding-28.webp", alt: "The Vows" },
    { image: "/images/portraits/portraits-8.webp", alt: "Stunning Portraits" },
    { image: "/images/kids/kids-4.webp", alt: "Pure Joy" },
    { image: "/images/wedding/wedding-24.webp", alt: "Pre-Wedding Romance" },
    { image: "/images/portraits/portraits-5.webp", alt: "Fashion & Vogue" },
  ];

  return (
    <div className="w-full bg-[#FFFDF8] pt-20 pb-32">
      <div className="text-center pb-12 px-8">
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#C5A059] mb-4">
          A COLLECTION OF MOMENTS
        </h2>
        <h3 className="text-2xl md:text-4xl font-serif font-light text-[#12100E] leading-tight italic">
          Some stories are better experienced than explained.
        </h3>
      </div>

      <div style={{ height: '500px', position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <DepthCarousel
          items={images}
          cardWidth={500}
          cardHeight={500}
          depth={220}
          spread={120}
          tilt={22}
          tiltDirection="right"
          perspective={1400}
          visibleCards={4}
          falloff={0.2}
          blur={6}
          autoplay
          loop
        />
      </div>
    </div>
  );
};

export default HorizontalGallery;
