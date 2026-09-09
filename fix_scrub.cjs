const fs = require('fs');

let codeG = fs.readFileSync('src/components/Gallery.jsx', 'utf8');

// Replace the scrub logic
codeG = codeG.replace(/start:\s*'top 100%',\s*end:\s*'top 70%',\s*scrub:\s*1\.5,?/g, "start: 'top 95%',\n              toggleActions: 'play none none reverse',");
codeG = codeG.replace(/filter:\s*'blur\(0px\)',\s*ease:\s*'expo\.out',/g, "filter: 'blur(0px)',\n            duration: 1.2,\n            ease: 'expo.out',");

fs.writeFileSync('src/components/Gallery.jsx', codeG);
console.log('Fixed scrub and duration!');
