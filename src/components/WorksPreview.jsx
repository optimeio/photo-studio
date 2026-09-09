import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const previewWorks = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    category: "Weddings",
    title: "The Union",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    category: "Portraits",
    title: "Radiant Soul",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
    title: "Vogue Styles",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    category: "Pre-Wedding",
    title: "A New Beginning",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    category: "Events",
    title: "Grand Celebration",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=800&auto=format&fit=crop",
    category: "Weddings",
    title: "Golden Hour",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    category: "Portraits",
    title: "Bold Vision",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    category: "Candid",
    title: "Real Laughter",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
    title: "Editorial Edge",
    tall: false,
  },
];

const WorksPreview = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {

        // Header reveal
        gsap.fromTo('.wp-header-el',
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
          }
        );

        // Card entrance — same animation as Gallery.jsx
        gsap.utils.toArray('.wp-work-card').forEach((card, idx) => {
          const rotDir = idx % 2 === 0 ? -12 : 12;
          gsap.fromTo(card,
            { y: 200, scale: 0.5, opacity: 0, rotationZ: rotDir, filter: 'blur(20px)' },
            {
              y: 0, scale: 1, opacity: 1, rotationZ: 0, filter: 'blur(0px)',
              duration: 1.2, ease: 'expo.out',
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
        <div className="flex flex-col items-center text-center justify-center mb-14 gap-4">
          <div className="wp-header-el flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-[#C5A059]" />
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059]">Our Portfolio</p>
            <div className="w-12 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="wp-header-el text-4xl md:text-5xl font-serif font-bold text-[#FFFDF8] leading-tight">
            View Our <span className="text-[#C5A059] italic">Works</span>
          </h2>
          <p className="wp-header-el text-[#FFFDF8]/50 text-sm font-light max-w-md leading-relaxed hidden md:block">
            A curated glimpse into our world of cinematic storytelling and timeless photography.
          </p>
        </div>

        {/* Masonry Grid — clean CSS hover, no PixelTransition blinking */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {previewWorks.map((work, idx) => (
            <div key={idx} className="wp-work-card break-inside-avoid group relative overflow-hidden rounded-sm cursor-pointer">
              <div className={`relative overflow-hidden ${work.tall ? 'aspect-[3/4]' : 'aspect-square'}`}>
                {/* Image */}
                <img
                  src={work.src}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/90 via-[#12100E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Text label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="block text-[9px] font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-1">
                    {work.category}
                  </span>
                  <span className="block text-[#FFFDF8] font-serif text-sm leading-tight font-semibold">
                    {work.title}
                  </span>
                </div>

                {/* Gold corner accent */}
                <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#C5A059]/0 group-hover:border-[#C5A059] transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="wp-header-el text-center mt-14 md:mt-20">
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
