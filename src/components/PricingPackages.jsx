import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const packagesData = [
  {
    name: "Standard",
    features: ["Candid Photography", "High-Res Digital Images", "1 Lead Photographer", "Basic Retouching & Editing"],
    theme: "standard",
    desc: "Essential coverage for your special day."
  },
  {
    name: "Premium",
    features: ["Candid & Traditional", "Cinematic Highlights", "Drone Camera Coverage", "2 Professional Photographers", "Premium Photo Album", "Advanced Retouching"],
    theme: "premium",
    desc: "Elevated storytelling with aerial perspectives."
  },
  {
    name: "Elite",
    features: ["Full Event Coverage", "Cinematic Video Story", "Drone & Crane Camera", "Pre-Wedding Outdoor Shoot", "Luxury Photobook Album", "2 LED Screens Setup", "Priority Fast Delivery"],
    theme: "elite",
    desc: "The ultimate cinematic and comprehensive experience."
  }
];

const CheckIcon = ({ theme }) => (
  <svg 
    className={`w-4 h-4 mr-3 flex-shrink-0 ${theme === 'elite' ? 'text-[#C5A059]' : 'text-[#C5A059]'}`} 
    fill="none" viewBox="0 0 24 24" stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const PricingPackages = ({ onBook }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo('.tier-card',
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full py-24 bg-[#FFFDF8]">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C5A059] mb-4">Investment</h2>
        <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#12100E]">Signature Collections</h3>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 max-w-[1200px] mx-auto px-6">
        
        {packagesData.map((pkg, idx) => {
          const isDark = pkg.theme === 'standard' || pkg.theme === 'elite';
          return (
            <div 
              key={idx} 
              className={`tier-card relative flex flex-col w-full lg:w-1/3 rounded-sm transition-all duration-500 hover:-translate-y-3 ${
                pkg.theme === 'standard' 
                  ? 'bg-[#12100E] p-8 md:p-10 border border-[#C5A059] shadow-xl lg:h-[420px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] z-10' 
                  : pkg.theme === 'premium'
                  ? 'bg-white p-10 md:p-12 border border-[#C5A059] shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:h-[480px] z-20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]'
                  : 'bg-[#12100E] p-10 md:p-14 border border-[#C5A059] shadow-2xl lg:h-[550px] z-30 hover:shadow-[0_0_60px_rgba(197,160,89,0.35)]'
              }`}
            >
              {/* Decorative Texture Pattern */}
              <div 
                className={`absolute inset-0 rounded-sm pointer-events-none ${isDark ? 'opacity-[0.12]' : 'opacity-[0.08]'}`}
                style={{ 
                  backgroundImage: 'repeating-linear-gradient(45deg, #C5A059 0, #C5A059 1px, transparent 1px, transparent 24px)'
                }} 
              />
              {pkg.theme === 'premium' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C5A059] text-[#12100E] text-[9px] font-bold tracking-widest uppercase px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
                  Most Popular
                </div>
              )}
              
              <div className={`text-center pb-6 mb-6 border-b ${
                isDark ? 'border-[#C5A059]/30' : 'border-[#12100E]/10'
              }`}>
                <h4 className={`text-2xl md:text-3xl font-serif font-bold mb-3 ${
                  pkg.theme === 'elite' ? 'text-[#C5A059]' : (isDark ? 'text-white' : 'text-[#12100E]')
                }`}>
                  {pkg.name}
                </h4>
                <p className={`text-xs font-light italic leading-relaxed ${
                  isDark ? 'text-[#FFFDF8]/70' : 'text-[#12100E]/60'
                }`}>
                  {pkg.desc}
                </p>
              </div>
              
              <ul className="flex-grow flex flex-col gap-4 mb-8">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className={`flex items-center text-[13px] md:text-sm font-light ${
                    isDark ? 'text-[#FFFDF8]' : 'text-[#12100E]'
                  }`}>
                    <CheckIcon theme={pkg.theme} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a 
                href="#booking"
                onClick={() => onBook && onBook(`package-${pkg.name.toLowerCase()}`)}
                className={`mt-auto w-full py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] transition-all duration-500 block text-center border ${
                  pkg.theme === 'elite' 
                    ? 'bg-[#C5A059] border-[#C5A059] hover:bg-white hover:border-white text-[#12100E] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                    : pkg.theme === 'standard'
                    ? 'bg-transparent border-[#C5A059]/50 hover:bg-[#C5A059] hover:border-[#C5A059] text-white hover:text-[#12100E]'
                    : 'bg-[#12100E] border-[#12100E] hover:bg-[#C5A059] hover:border-[#C5A059] text-white hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]'
                }`}
              >
                Enquire
              </a>
            </div>
          );
        })}
      </div>
      
      <div className="text-center mt-16 md:mt-24">
        <p className="text-[#12100E]/60 text-sm font-light mb-6 italic">Looking for something specific?</p>
        <a 
          href="/services"
          className="inline-block px-10 py-4 border border-[#C5A059] text-[#12100E] font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#C5A059] hover:text-white transition-all duration-500 rounded-sm"
        >
          View All Services
        </a>
      </div>
    </div>
  );
};

export default PricingPackages;
