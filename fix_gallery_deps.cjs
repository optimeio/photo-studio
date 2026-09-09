const fs = require('fs');

let codeG = fs.readFileSync('src/components/Gallery.jsx', 'utf8');
// Fix GSAP animation dependency correctly by regex
codeG = codeG.replace(/(\s*return \(\) => ctx\.revert\(\);\s*\},) \[\]\);/g, '$1 [activeFilter]);');

// Also, let's fix another potential bug: if there are 150+ photos, GSAP might not trigger well if `ScrollTrigger` doesn't refresh when layout changes. We should call ScrollTrigger.refresh() when images load or layout changes, but activeFilter change is fine.

fs.writeFileSync('src/components/Gallery.jsx', codeG);
console.log('Fixed Gallery.jsx animation dependency!');
