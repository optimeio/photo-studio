import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from('.nav-item', { y: -20, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.5 });
        gsap.from('.nav-logo', { opacity: 0, duration: 1, ease: "power2.out", delay: 0.2 });
      });
    }, navRef);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, href) => {
    if (href.includes('#')) {
      e.preventDefault();
      
      const [path, hash] = href.split('#');
      const targetHash = '#' + hash;
      const targetPath = path || '/';

      if (location.pathname === targetPath) {
        // Already on the target page, scroll smoothly
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      } else {
        // Navigate to the new page with the hash
        navigate(href);
      }
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Our Works', href: '/portfolio' },
    { name: 'Blog', href: '/journal' },
    { name: 'Contact', href: '/contact' },
  ];

  // On home page: transparent at top, dark when scrolled
  // On ALL other pages: always dark background so text is always visible
  const isHomePage = location.pathname === '/';
  const showDarkBg = isScrolled || !isHomePage;
  const useDarkText = false; // Always use light text — bg is always dark or transparent-over-dark-image

  return (
    <nav 
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        showDarkBg
          ? 'py-3 bg-[#12100e]/95 backdrop-blur-[14px] border-b border-white/[0.08] shadow-lg' 
          : 'py-6 bg-transparent border-b border-transparent'
      } translate-y-0`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <Link to="/" className="nav-logo flex items-center gap-3 group">
          <span className={`font-serif uppercase tracking-[0.15em] font-bold transition-all duration-500 hidden sm:block ${isScrolled ? 'text-[#FFFDF8] text-sm' : (useDarkText ? 'text-[#12100E] text-base' : 'text-[#FFFDF8] text-base')}`}>
            LumaCraft
            <span className="block text-[8px] tracking-[0.3em] font-sans font-normal text-[#C5A059] -mt-1">Photography</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (link.href === '/#about' && location.hash === '#about');
            
            // For hash links on the same page, we can use an anchor tag. Otherwise use Link.
            if (link.href.includes('#')) {
              return (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-item text-xs font-sans font-medium uppercase tracking-[0.15em] hover:text-[#C5A059] transition-colors relative group py-2 ${isActive ? 'text-[#C5A059]' : (useDarkText ? 'text-[#12100E]' : 'text-[#FFFDF8]')}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[1px] bg-[#C5A059] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </a>
              );
            }

            return (
              <Link 
                key={link.name}
                to={link.href} 
                className={`nav-item text-xs font-sans font-medium uppercase tracking-[0.15em] hover:text-[#C5A059] transition-colors relative group py-2 ${isActive ? 'text-[#C5A059]' : (useDarkText ? 'text-[#12100E]' : 'text-[#FFFDF8]')}`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[1px] bg-champagneGold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            );
          })}
        </div>
        
        <a href="/#booking" onClick={(e) => handleNavClick(e, '/#booking')} className="nav-btn hidden md:flex items-center justify-center bg-[#C5A059] hover:bg-[#D4AF37] text-[#12100E] px-6 py-[10px] rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300 shadow-md">
          Book a Session
        </a>

        {/* Mobile Navbar Controls */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <Link to="/" className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${isScrolled ? 'border-[#FFFDF8]/20 bg-[#FFFDF8]/5 text-[#FFFDF8] hover:bg-[#C5A059] hover:border-[#C5A059]' : (useDarkText ? 'border-[#12100E]/20 bg-black/5 text-[#12100E] hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#12100E]' : 'border-[#12100E]/20 bg-black/10 text-[#FFFDF8] hover:bg-[#C5A059] hover:border-[#C5A059]')}`}>
            <Home className="w-4 h-4" />
          </Link>
          
          <button 
            className={`flex flex-col justify-center items-center w-10 h-10 rounded-full border transition-all duration-300 relative ${isScrolled ? 'border-[#FFFDF8]/20 bg-[#FFFDF8]/5 hover:bg-[#C5A059] hover:border-[#C5A059]' : (useDarkText ? 'border-[#12100E]/20 bg-black/5 hover:bg-[#C5A059] hover:border-[#C5A059]' : 'border-[#12100E]/20 bg-black/10 hover:bg-[#C5A059] hover:border-[#C5A059]')}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-4 h-[1.5px] transition-all duration-300 absolute ${isMobileMenuOpen ? 'bg-[#FFFDF8] rotate-45' : (useDarkText ? 'bg-[#12100E] -translate-y-[5px]' : 'bg-[#FFFDF8] -translate-y-[5px]')}`}></span>
            <span className={`w-4 h-[1.5px] transition-all duration-300 absolute ${isMobileMenuOpen ? 'bg-[#FFFDF8] opacity-0' : (useDarkText ? 'bg-[#12100E]' : 'bg-[#FFFDF8]')}`}></span>
            <span className={`w-4 h-[1.5px] transition-all duration-300 absolute ${isMobileMenuOpen ? 'bg-[#FFFDF8] -rotate-45' : (useDarkText ? 'bg-[#12100E] translate-y-[5px]' : 'bg-[#FFFDF8] translate-y-[5px]')}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Redesigned */}
      <div className={`md:hidden fixed top-0 left-0 w-screen h-[100dvh] bg-[#12100E] z-40 transition-transform duration-700 ease-in-out flex flex-col pt-24 pb-10 px-8 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        <div className="flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-y-6 w-full relative z-10">
            {navLinks.map((link, idx) => {
              const delay = isMobileMenuOpen ? `${0.2 + idx * 0.05}s` : '0s';
              return link.href.includes('#') ? (
                <a 
                  key={link.name}
                  href={link.href} 
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    handleNavClick(e, link.href);
                  }} 
                  className={`text-3xl font-serif text-[#FFFDF8] hover:text-[#C5A059] transition-all duration-500 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: delay }}
                >
                  <span className="text-[#C5A059] text-xs font-sans mr-4 opacity-50">0{idx + 1}</span>
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name}
                  to={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`text-3xl font-serif text-[#FFFDF8] hover:text-[#C5A059] transition-all duration-500 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: delay }}
                >
                  <span className="text-[#C5A059] text-xs font-sans mr-4 opacity-50">0{idx + 1}</span>
                  {link.name}
                </Link>
              )
            })}
          </div>
        </div>

        <div className={`mt-auto relative z-10 transition-all duration-700 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: isMobileMenuOpen ? '0.6s' : '0s' }}>
          <a href="/#booking" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, '/#booking'); }} className="block w-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#12100E] px-8 py-4 rounded-sm text-xs font-bold tracking-[0.2em] uppercase text-center transition-colors">
            Book a Session
          </a>
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#FFFDF8]/10">
            <a href="mailto:hello@lumacraft.com" className="text-[10px] uppercase tracking-widest text-[#FFFDF8]/60 hover:text-[#C5A059]">hello@lumacraft.com</a>
            <span className="text-[10px] uppercase tracking-widest text-[#FFFDF8]/60">Salem, TN</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
