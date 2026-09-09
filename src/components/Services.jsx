import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: "wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    title: "Wedding Photography",
    desc: "Cinematic documentation of your most important day, capturing every vow, tear, and joyful moment.",
  },
  {
    id: "pre-wedding",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    title: "Pre-Wedding",
    desc: "Artistic and conceptual storytelling of your journey before the big day, set in beautiful locations.",
  },
  {
    id: "portrait",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    title: "Portrait Photography",
    desc: "Editorial-style portraits that bring out your authentic self with striking lighting and composition.",
  },
  {
    id: "event",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    title: "Event Photography",
    desc: "Unobtrusive coverage of your celebrations, ensuring every important memory is preserved.",
  },
  {
    id: "candid",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    title: "Candid Photography",
    desc: "Catching those raw, unscripted emotions and fleeting interactions that define true stories.",
  },
  {
    id: "fashion",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    title: "Fashion Photography",
    desc: "High-end commercial and fashion shoots focused on aesthetic perfection and brand identity.",
  }
];

const ServiceCard = ({ svc, onBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const frontRef = useRef(null);
  const leftThreadRef = useRef(null);
  const rightThreadRef = useRef(null);

  useEffect(() => {
    const targetAngle = isOpen ? 75 : 0;
    
    const proxy = { angle: frontRef.current?._angle || 0 };
    
    gsap.to(proxy, {
      angle: targetAngle,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (!frontRef.current) return;
        frontRef.current._angle = proxy.angle;
        
        gsap.set(frontRef.current, { rotationX: proxy.angle, transformOrigin: "bottom center" });
        
        const thetaRad = proxy.angle * (Math.PI / 180);
        const deltaY = 1 - Math.cos(thetaRad);
        // Negative because rotationX is positive with bottom origin, meaning top swings backwards into screen (-Z)
        const deltaZ = -Math.sin(thetaRad); 
        
        const scaleY = Math.sqrt(deltaY * deltaY + deltaZ * deltaZ);
        
        let threadAngleX = 0;
        if (deltaY !== 0 || deltaZ !== 0) {
          threadAngleX = Math.atan2(deltaZ, deltaY) * (180 / Math.PI);
        }
        
        if (leftThreadRef.current) {
          gsap.set(leftThreadRef.current, { rotationX: threadAngleX, scaleY: scaleY, z: 0 });
        }
        if (rightThreadRef.current) {
          gsap.set(rightThreadRef.current, { rotationX: threadAngleX, scaleY: scaleY, z: 0 });
        }
      }
    });
  }, [isOpen]);

  return (
    <div 
      className="service-card group relative w-full aspect-[4/5] cursor-pointer [perspective:1500px] z-10 hover:z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Threads from the exact top corners */}
      <div 
        ref={leftThreadRef} 
        className="absolute top-0 left-0 w-[3px] h-full bg-[#C5A059] origin-top z-20 pointer-events-none"
        style={{ transform: 'scaleY(0)' }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] flex items-center justify-center">
           <div className="absolute right-[50%] w-5 h-3 border-[3px] border-[#C5A059] rounded-full origin-right rotate-[25deg]" />
           <div className="absolute left-[50%] w-5 h-3 border-[3px] border-[#C5A059] rounded-full origin-left -rotate-[25deg]" />
           <div className="w-3 h-3 rounded-full bg-[#C5A059] z-10" />
        </div>
      </div>
      
      <div 
        ref={rightThreadRef} 
        className="absolute top-0 right-0 w-[3px] h-full bg-[#C5A059] origin-top z-20 pointer-events-none"
        style={{ transform: 'scaleY(0)' }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] flex items-center justify-center">
           <div className="absolute right-[50%] w-5 h-3 border-[3px] border-[#C5A059] rounded-full origin-right rotate-[25deg]" />
           <div className="absolute left-[50%] w-5 h-3 border-[3px] border-[#C5A059] rounded-full origin-left -rotate-[25deg]" />
           <div className="w-3 h-3 rounded-full bg-[#C5A059] z-10" />
        </div>
      </div>

      {/* Back face (Text & Button) */}
      <div className="absolute inset-0 bg-[#FFFDF8] shadow-[0_10px_30px_rgba(0,0,0,0.05)] px-4 md:px-6 pt-6 md:pt-8 pb-10 flex flex-col items-center justify-start text-center rounded-sm">
        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#12100E] mb-2 leading-tight">{svc.title}</h4>
        <p className="text-[#12100E]/70 text-[10px] sm:text-xs md:text-sm leading-snug md:leading-relaxed mb-3 font-light px-2">{svc.desc}</p>
        <div className={`mt-2 w-full flex justify-center relative z-20 transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0 delay-[400ms]' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
          <a 
            href="#booking"
            onClick={() => onBook && onBook(svc.id)}
            className="bg-[#C5A059] hover:bg-[#12100E] text-[#FFFDF8] px-6 py-2 rounded-sm transition-colors duration-300 uppercase tracking-[0.1em] text-[10px] font-bold shadow-md"
          >
            Book
          </a>
        </div>
      </div>

      {/* Front face (Image) */}
      <div ref={frontRef} className="absolute inset-0 transform-style-3d origin-bottom z-10 bg-[#12100E] rounded-sm shadow-lg overflow-hidden border-[1.5px] border-[#C5A059]">
        <img src={svc.image} className="w-full h-full object-cover object-center" alt={svc.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-transparent flex items-end justify-center pb-4 md:pb-8 pointer-events-none px-2 md:px-4 text-center">
          <h4 className="text-[1.1rem] leading-tight md:text-4xl font-serif text-[#FFFDF8] font-bold drop-shadow-md">{svc.title}</h4>
        </div>
      </div>
    </div>
  );
};

const Services = ({ onBook }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      const serviceCards = gsap.utils.toArray('.service-card');
      
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Animate headers
        gsap.fromTo('.services-header-text', 
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
        );

        // 3D card reveal on scroll
        gsap.fromTo(serviceCards,
          { y: 100, opacity: 0, scale: 0.9 },
          { 
            y: 0, opacity: 1, scale: 1,
            duration: 1.2, 
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } 
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(serviceCards, 
          { opacity: 0 }, 
          { opacity: 1, duration: 1, stagger: 0.1, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-12 md:py-16 px-4 md:px-6 w-full bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="services-header-text text-xs font-bold tracking-[0.2em] uppercase text-[#C5A059] mb-4">OUR EXPERTISE</h2>
          <h3 className="services-header-text text-3xl md:text-5xl font-serif font-bold text-[#12100E] mb-0 leading-tight">Tailored Services for<br/>Your Unique Story.</h3>
        </div>

        <div className="max-w-5xl mx-auto transform scale-85 origin-top">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {servicesData.map((svc, idx) => (
              <ServiceCard key={idx} svc={svc} onBook={onBook} />
            ))}
          </div>
        </div>

        <div className="text-center mt-12 md:mt-24">
          <a 
            href="/portfolio"
            className="inline-block px-10 py-4 border border-[#C5A059] text-[#12100E] font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#C5A059] hover:text-[#FFFDF8] transition-all duration-500 rounded-sm"
          >
            View Our Works
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
