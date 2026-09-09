const fs = require('fs');

let codeG = fs.readFileSync('src/components/Gallery.jsx', 'utf8');

codeG = codeG.replace(
`            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 100%', 
              end: 'top 70%',    
              scrub: 1.5,
            }`,
`            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%', 
              toggleActions: 'play none none reverse',
            }`
);

fs.writeFileSync('src/components/Gallery.jsx', codeG);
console.log('Fixed Gallery GSAP scroll trigger!');
