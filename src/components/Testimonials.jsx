import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah & John",
    role: "Wedding Clients",
    text: "She was invisible all day and somehow got every single moment. My grandmother's face during the vows — I didn't even see it happen. The photos are a true treasure."
  },
  {
    name: "Emma Watson",
    role: "Fashion Editorial",
    text: "Working with this studio was a revelation. The direction was incredibly precise but completely natural, resulting in the most authentic editorial spread I've ever had."
  },
  {
    name: "David Chen",
    role: "Portrait Client",
    text: "I usually hate having my photo taken, but the session felt like a conversation. The final portraits captured exactly who I am without feeling staged or stiff."
  }
];

const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-block',
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 0.9, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 75%" 
          } 
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 w-full bg-[#12100E]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C5A059] mb-4">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#FFFDF8] mb-0 leading-tight">Kind Words</h3>
        </div>
        
        <div className="flex flex-col gap-10 md:gap-16">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="testimonial-block text-center border-b border-[#FFFDF8]/10 pb-10 md:pb-16 last:border-0 last:pb-0">
              <p className="text-xl md:text-3xl font-serif text-[#FFFDF8]/90 italic mb-6 md:mb-8 leading-relaxed font-light">
                "{testimonial.text}"
              </p>
              <div>
                <h4 className="font-bold text-[#FFFDF8] tracking-widest uppercase text-[10px] md:text-xs mb-1 md:mb-2">{testimonial.name}</h4>
                <span className="text-[#C5A059] text-[9px] md:text-[10px] tracking-widest uppercase">{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
