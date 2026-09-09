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
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800&auto=format&fit=crop",
    category: "Weddings",
    title: "Sacred Ceremony",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
    title: "Vogue Styles",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    category: "Pre-Wedding",
    title: "A New Beginning",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    category: "Events",
    title: "Grand Celebration",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
    category: "Weddings",
    title: "Golden Hour",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    category: "Portraits",
    title: "Ethereal Glow",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    category: "Candid",
    title: "Real Laughter",
    tall: false,
  },
];

const WorksPreview = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo('.works-header-el',
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
          }
        );
        gsap.fromTo('.works-item',
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 1.1,
            stagger: { amount: 0.7, from: "start" },
            ease: "expo.out",
            scrollTrigger: { trigger: '.works-grid', start: "top 85%" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Split into 3 columns
  const col1 = previewWorks.filter((_, i) => i % 3 === 0);
  const col2 = previewWorks.filter((_, i) => i % 3 === 1);
  const col3 = previewWorks.filter((_, i) => i % 3 === 2);

  const WorkCard = ({ work }) => (
    <div className="works-item group relative overflow-hidden rounded-sm cursor-pointer">
      <div className={`relative overflow-hidden ${work.tall ? 'aspect-[3/4]' : 'aspect-square'}`}>
        <img
          src={work.src}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/80 via-[#12100E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="block text-[9px] font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-1">
            {work.category}
          </span>
          <span className="block text-[#FFFDF8] font-serif text-base leading-tight">
            {work.title}
          </span>
        </div>
        {/* Corner accent */}
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#C5A059]/0 group-hover:border-[#C5A059]/80 transition-all duration-500" />
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 w-full bg-[#12100E]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <div>
            <p className="works-header-el text-[10px] font-bold tracking-[0.3em] uppercase text-[#C5A059] mb-3">
              Our Portfolio
            </p>
            <h2 className="works-header-el text-3xl md:text-5xl font-serif font-bold text-[#FFFDF8] leading-tight">
              View Our<br />
              <span className="text-[#C5A059] italic">Works</span>
            </h2>
          </div>
          <div className="works-header-el">
            <p className="text-[#FFFDF8]/50 text-sm font-light max-w-xs leading-relaxed">
              A curated glimpse into our world of cinematic storytelling and timeless photography.
            </p>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="works-grid grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-3 md:gap-4">
            {col1.map((w, i) => <WorkCard key={i} work={w} />)}
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-3 md:gap-4 md:mt-10">
            {col2.map((w, i) => <WorkCard key={i} work={w} />)}
          </div>
          {/* Column 3 */}
          <div className="hidden md:flex flex-col gap-4 mt-5">
            {col3.map((w, i) => <WorkCard key={i} work={w} />)}
          </div>
        </div>

        {/* CTA */}
        <div className="works-header-el text-center mt-12 md:mt-20">
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
