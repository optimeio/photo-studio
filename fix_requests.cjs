const fs = require('fs');
let codeG = fs.readFileSync('src/components/Gallery.jsx', 'utf8');
codeG = codeG.replace('const filters = ["ALL",', 'const filters = ["DISCOVER",');
codeG = codeG.replace('useState("ALL")', 'useState("DISCOVER")');
codeG = codeG.replace('activeFilter === "ALL" ? works : works.filter', 'activeFilter === "DISCOVER" ? [...works].sort(() => 0.5 - Math.random()).slice(0, 20) : works.filter');
codeG = codeG.replace('activeFilter === "ALL" &&', 'activeFilter === "DISCOVER" &&');
fs.writeFileSync('src/components/Gallery.jsx', codeG);

let codeS = fs.readFileSync('src/components/Services.jsx', 'utf8');
codeS = codeS.replace(' border-[6px] md:border-[12px] border-[#C5A059]', '');
fs.writeFileSync('src/components/Services.jsx', codeS);
console.log('Fixed both!');
