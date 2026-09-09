const fs = require('fs');

let codeG = fs.readFileSync('src/components/Gallery.jsx', 'utf8');

// We need to inject the ResizeObserver logic into the second useEffect.
const targetEffect = `  useEffect(() => {
    // This context runs every time the filter changes (or initial mount)
    const ctx = gsap.context(() => {
      /* Cards Extraordinary Scrub Reveal */
      gsap.utils.toArray('.work-card').forEach((card, idx) => {
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

      /* Images are now Masonry, removed Parallax wrapper to avoid cropping */
    }, sectionRef);
    return () => ctx.revert();
  }, [activeFilter]);`;

const replacedEffect = `  useEffect(() => {
    // This context runs every time the filter changes (or initial mount)
    const ctx = gsap.context(() => {
      /* Cards Extraordinary Scrub Reveal */
      gsap.utils.toArray('.work-card').forEach((card, idx) => {
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
    }, sectionRef);

    // Refresh ScrollTrigger when layout changes (e.g., images load)
    let timeoutId;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      ctx.revert();
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [activeFilter]);`;

// Just to make sure we replace the right block, we can do a more robust regex or direct index replacement.
const matchStr = '    }, sectionRef);\n    return () => ctx.revert();\n  }, [activeFilter]);';
const replaceStr = `    }, sectionRef);

    let timeoutId;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      ctx.revert();
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [activeFilter]);`;

codeG = codeG.replace(matchStr, replaceStr);

// To ensure it works even if \r is present:
const regex = /    \}, sectionRef\);\s*return \(\) => ctx\.revert\(\);\s*\}, \[activeFilter\]\);/g;
if (!codeG.includes('observer.disconnect()')) {
    codeG = codeG.replace(regex, replaceStr);
}

fs.writeFileSync('src/components/Gallery.jsx', codeG);
console.log('Resize observer added!');
