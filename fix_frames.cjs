
const fs = require('fs');
let codeGallery = fs.readFileSync('src/components/Gallery.jsx', 'utf8');
codeGallery = codeGallery.replace('border-[8px] md:border-[12px] border-[#FFFDF8]', 'border-[8px] md:border-[12px] border-[#C5A059]');
fs.writeFileSync('src/components/Gallery.jsx', codeGallery);

let codeServices = fs.readFileSync('src/components/Services.jsx', 'utf8');
codeServices = codeServices.replace('border-[6px] md:border-[12px] border-[#FFFDF8]', 'border-[6px] md:border-[12px] border-[#C5A059]');
fs.writeFileSync('src/components/Services.jsx', codeServices);

console.log('Frames updated!');

