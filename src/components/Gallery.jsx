import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const filters = ["DISCOVER", "WEDDINGS", "PORTRAITS", "EVENTS", "PRE-WEDDING", "CANDID", "FASHION"];

import PixelTransition from './PixelTransition';

const works = [
  // WEDDINGS
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop", category: "WEDDINGS", title: "Golden Vows", subtitle: "Love sealed forever" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800&auto=format&fit=crop", category: "WEDDINGS", title: "Sacred Ceremony", subtitle: "The beginning of forever" },
  { src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=800&auto=format&fit=crop", category: "WEDDINGS", title: "First Dance", subtitle: "Two becoming one" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop", category: "WEDDINGS", title: "Timeless Love", subtitle: "Every detail captured" },
  { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=800&auto=format&fit=crop", category: "WEDDINGS", title: "Eternal Moment", subtitle: "A day to remember always" },
  { src: "https://images.unsplash.com/photo-1537907510278-c9c76268ff3c?q=80&w=800&auto=format&fit=crop", category: "WEDDINGS", title: "Bridal Glory", subtitle: "Radiance in every frame" },
  { src: "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=800&auto=format&fit=crop", category: "WEDDINGS", title: "Together Always", subtitle: "Bound by love" },
  // PRE-WEDDING
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?q=80&w=800&auto=format&fit=crop", category: "PRE-WEDDING", title: "Our Story", subtitle: "Chapter one of many" },
  { src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=800&auto=format&fit=crop", category: "PRE-WEDDING", title: "Golden Hour", subtitle: "Love in the soft light" },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=800&auto=format&fit=crop", category: "PRE-WEDDING", title: "Forever Begins", subtitle: "Counting the days" },
  // PORTRAITS
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop", category: "PORTRAITS", title: "Stunning Portrait", subtitle: "Light carved from within" },
  { src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800&auto=format&fit=crop", category: "PORTRAITS", title: "Radiant Soul", subtitle: "True self, beautifully framed" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop", category: "PORTRAITS", title: "The Gentleman", subtitle: "Confident. Composed. Iconic." },
  { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop", category: "PORTRAITS", title: "Ethereal Glow", subtitle: "Softness meets strength" },
  { src: "https://images.unsplash.com/photo-1519307141446-fd7b74218e4f?q=80&w=800&auto=format&fit=crop", category: "PORTRAITS", title: "Inner Light", subtitle: "Every face tells a story" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", category: "PORTRAITS", title: "Bold Vision", subtitle: "Character in every pixel" },
  // FASHION
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "https://images.unsplash.com/photo-1536766768598-e09213fdcf22?q=80&w=800&auto=format&fit=crop", category: "FASHION", title: "Editorial Edge", subtitle: "Fashion meets art" },
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", category: "FASHION", title: "Runway Ready", subtitle: "Styled to perfection" },
  { src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop", category: "FASHION", title: "Chic Story", subtitle: "Where style meets soul" },
  // EVENTS
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop", category: "EVENTS", title: "Grand Celebration", subtitle: "The energy of now" },
  { src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800&auto=format&fit=crop", category: "EVENTS", title: "Live the Moment", subtitle: "Joy frozen in time" },
  { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop", category: "EVENTS", title: "Gala Night", subtitle: "Elegance on every frame" },
  // CANDID
  { src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop", category: "CANDID", title: "Real Laughter", subtitle: "Unscripted, unforgettable" },
  { src: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=800&auto=format&fit=crop", category: "CANDID", title: "Candid Joy", subtitle: "Emotions in their purest form" },
  { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", category: "CANDID", title: "Pure Happiness", subtitle: "The moments between moments" },
];





const OurWorks = () => {
  const [activeFilter, setActiveFilter] = useState("DISCOVER");
  const sectionRef = useRef(null);

  const filteredWorks = React.useMemo(() => {
    return activeFilter === "DISCOVER" ? works.slice(0, 20) : works.filter(w => w.category === activeFilter);
  }, [activeFilter]);

  const handleFilter = (f) => {
    if (f === activeFilter) return;
    gsap.to('.work-card', {
      scale: 0.96, opacity: 0, duration: 0.25,
      onComplete: () => setActiveFilter(f)
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.works-header',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      gsap.fromTo('.works-filter',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: '.filters-row', start: 'top 85%' } }
      );
    }, sectionRef);

    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      ctx.revert();
      clearTimeout(refreshId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.work-card');
      cards.forEach((card, idx) => {
        const rotDir = idx % 2 === 0 ? -10 : 10;
        gsap.fromTo(card,
          { 
            y: 120, 
            scale: 0.75, 
            opacity: 0, 
            rotationZ: rotDir, 
            filter: 'blur(12px)' 
          },
          {
            y: 0, 
            scale: 1, 
            opacity: 1, 
            rotationZ: 0, 
            filter: 'blur(0px)',
            duration: 0.9, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            }
          }
        );
      });
    }, sectionRef);

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 400);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1000);

    let timeoutId;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => ScrollTrigger.refresh(), 100);
    });
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      ctx.revert();
      observer.disconnect();
      clearTimeout(timeoutId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [filteredWorks]);

  return (
    <section id="gallery" ref={sectionRef} className="py-12 md:py-16 px-6 w-full bg-[#12100E]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="works-header flex flex-col items-center text-center justify-center mb-14 gap-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-[#C5A059]" />
            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059]">OUR WORKS</h2>
            <div className="w-12 h-[1px] bg-[#C5A059]" />
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#FFFDF8] leading-tight">
            Stories We've Had the Honor to Tell.
          </h3>
          <p className="text-[#FFFDF8]/50 text-sm font-light max-w-md leading-relaxed text-center hidden md:block">
            Every image is a chapter. Every session, a complete story.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filters-row flex overflow-x-auto snap-x md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 mb-8 md:mb-12 pb-4 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`works-filter flex-shrink-0 snap-center whitespace-nowrap text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase px-4 md:px-5 py-2 rounded-full border transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-[#C5A059] text-[#12100E] border-[#C5A059]'
                  : 'bg-transparent text-[#FFFDF8]/50 border-white/10 hover:text-[#FFFDF8] hover:border-white/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Featured Spotlight Section with Pixel Transition */}
        {activeFilter === "DISCOVER" && (
          <div className="mb-16 w-full flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <PixelTransition
                firstContent={
                  <div className="w-full h-full bg-[#12100E] flex items-center justify-center">
                    <img
                      src="/images/featured-story.webp"
                      alt="Featured Story"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                }
                secondContent={
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1714] border border-[#C5A059]/20 p-6 text-center">
                    <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.3em] mb-4">Behind the Lens</p>
                    <p className="font-serif text-2xl md:text-3xl text-[#FFFDF8] mb-3">Pure Joy</p>
                    <p className="text-xs text-[#FFFDF8]/60 max-w-xs">We captured the raw emotion of their special day. Real smiles, unscripted joy, and the priceless reactions of best friends.</p>
                  </div>
                }
                gridSize={12}
                pixelColor='#1a1714'
                animationStepDuration={0.4}
                className="w-full max-w-[550px] h-auto border-2 border-[#C5A059] shadow-2xl rounded-none md:rounded-lg"
                aspectRatio="62%"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-8">
              <h4 className="font-serif text-3xl font-bold text-[#FFFDF8] mb-4">Featured Story: The Bridal Party</h4>
              <p className="text-sm text-[#FFFDF8]/70 leading-relaxed max-w-md mx-auto md:mx-0">
                Hover over (or tap) the image to reveal the story behind this unscripted moment. The best photos aren't posed; they are the genuine reactions, the inside jokes, and the shared laughter between friends.
              </p>
            </div>
          </div>
        )}

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {filteredWorks.map((work, idx) => (
            <div
              key={`${work.title}-${activeFilter}-${idx}`}
              className={`work-card group relative overflow-hidden rounded-sm cursor-pointer masonry-item bg-[#1a1714] min-h-[200px]`}
            >
              {/* Uncropped Image */}
              <img
                src={work.src}
                alt={work.title}
                loading="lazy"
                onLoad={() => ScrollTrigger.refresh()}
                className="w-full h-auto block transition-transform duration-[2000ms] ease-out group-hover:scale-[1.05]"
                style={{ willChange: 'transform' }}
              />

              {/* Gradient overlay always-on */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/80 via-[#12100E]/10 to-transparent" />

              {/* Bottom text — visible always, enhanced on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-6 md:w-8 h-[1.5px] bg-[#C5A059] mb-2 md:mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                <span className="text-[8px] md:text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.3em] block mb-1">
                  {work.category}
                </span>
                <h4 className="text-[#FFFDF8] font-serif text-lg md:text-2xl font-bold">{work.title}</h4>
                <p className="text-[#FFFDF8]/60 text-[10px] md:text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  {work.subtitle}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C5A059]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            to="/#booking"
            className="inline-flex items-center gap-3 bg-transparent text-[#FFFDF8] hover:text-[#C5A059] text-[11px] font-bold tracking-[0.2em] uppercase border border-[#FFFDF8]/20 hover:border-[#C5A059] px-10 py-4 rounded-full transition-all duration-300"
          >
            Book Your Session <span className="text-base">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default OurWorks;
