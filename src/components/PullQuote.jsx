import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PullQuote = () => {
  const quoteRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", scrollTrigger: { trigger: quoteRef.current, start: "top 75%" } }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(textRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, scrollTrigger: { trigger: quoteRef.current, start: "top 75%" } });
      });
    }, quoteRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-40 px-8 bg-[#12100E] flex items-center justify-center min-h-[50vh] w-full">
      <div className="max-w-4xl mx-auto text-center" ref={quoteRef}>
        <div ref={textRef}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#FFFDF8] italic leading-tight font-light mb-12">
            “The best photographs don't just show a moment. They make you feel it again.”
          </h2>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C5A059]">
            — THE STUDIO PHILOSOPHY
          </span>
        </div>
      </div>
    </section>
  );
};

export default PullQuote;
