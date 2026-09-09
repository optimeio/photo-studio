import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PixelTransition from './PixelTransition';

gsap.registerPlugin(ScrollTrigger);

const previewWorks = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    hover: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800&auto=format&fit=crop",
    category: "Weddings",
    title: "The Union",
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    hover: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    category: "Portraits",
    title: "Radiant Soul",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    hover: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
    title: "Vogue Styles",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    hover: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=800&auto=format&fit=crop",
    category: "Pre-Wedding",
    title: "A New Beginning",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    hover: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    category: "Events",
    title: "Grand Celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
    hover: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=800&auto=format&fit=crop",
    category: "Weddings",
    title: "Golden Hour",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    hover: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    category: "Portraits",
    title: "Bold Vision",
  },
  {
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    hover: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=800&auto=format&fit=crop",
    category: "Candid",
    title: "Real Laughter",
  },
];

const WorksPreview = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {

        // ── Header elements reveal ──
        gsap.fromTo('.wp-header-el',
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
          }
        );

        // ── Same GSAP card entrance as Gallery.jsx ──
        gsap.utils.toArray('.wp-work-card').forEach((card, idx) => {
          const rotDir = idx % 2 === 0 ? -12 : 12;

          gsap.fromTo(card,
            {
              y: 200,
              scale: 0.5,
              opacity: 0,
              rotationZ: rotDir,
              filter: 'blur(20px)'
            },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              rotationZ: 0,
              filter: 'blur(0px)',
              duration: 1.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        });

      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 w-full bg-[#12100E]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="wp-header-el flex flex-col items-center text-center justify-center mb-14 gap-4">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-[#C5A059]" />
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059]">Our Portfolio</p>
            <div className="w-12 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#FFFDF8] leading-tight">
            View Our <span className="text-[#C5A059] italic">Works</span>
          </h2>
          <p className="text-[#FFFDF8]/50 text-sm font-light max-w-md leading-relaxed hidden md:block">
            A curated glimpse into our world of cinematic storytelling and timeless photography.
          </p>
        </div>

        {/* Masonry Grid with PixelTransition — same as Gallery */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {previewWorks.map((work, idx) => (
            <div
              key={idx}
              className="wp-work-card break-inside-avoid"
            >
              <PixelTransition
                firstContent={
                  <div className="w-full h-full bg-[#12100E] flex items-center justify-center">
                    <img
                      src={work.src}
                      alt={work.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                }
                secondContent={
                  <div className="w-full h-full bg-[#12100E] flex flex-col items-center justify-center p-4 gap-2">
                    <img
                      src={work.hover}
                      alt={work.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-40"
                      loading="lazy"
                    />
                    <div className="relative z-10 text-center">
                      <span className="block text-[9px] font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-1">
                        {work.category}
                      </span>
                      <span className="block text-[#FFFDF8] font-serif text-lg leading-tight font-bold">
                        {work.title}
                      </span>
                      <Link
                        to="/portfolio"
                        className="inline-block mt-3 text-[8px] font-bold tracking-[0.2em] uppercase text-[#C5A059] border border-[#C5A059]/50 px-3 py-1 hover:bg-[#C5A059] hover:text-[#12100E] transition-colors"
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                }
                pixelColor="#C5A059"
                animationStepDuration={0.4}
                aspectRatio={idx % 3 === 0 ? "133%" : "100%"}
                className="w-full rounded-sm overflow-hidden"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 md:mt-20 wp-header-el">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-4 px-10 py-4 border border-[#C5A059] text-[#FFFDF8] hover:bg-[#C5A059] hover:text-[#12100E] font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all duration-500 rounded-sm group"
          >
            Explore Full Portfolio
            <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-base leading-none">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WorksPreview;
