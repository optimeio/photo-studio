
const fs = require('fs');
let code = fs.readFileSync('src/components/Gallery.jsx', 'utf8');
code = code.replace('className={work-card group relative overflow-hidden rounded-sm cursor-pointer masonry-item}', 'className={work-card group relative overflow-hidden rounded-sm cursor-pointer masonry-item border-[8px] md:border-[12px] border-[#FFFDF8] shadow-lg}');
fs.writeFileSync('src/components/Gallery.jsx', code);
console.log('Fixed Gallery.jsx frame!');

