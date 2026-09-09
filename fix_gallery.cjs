const fs = require('fs');
let code = fs.readFileSync('src/components/Gallery.jsx', 'utf8');
code = code.replace('const filters = ["ALL",', 'const filters = ["DISCOVER",');
code = code.replace('useState("ALL")', 'useState("DISCOVER")');
code = code.replace('activeFilter === "ALL" ? works : works.filter', 'activeFilter === "DISCOVER" ? [...works].sort(() => 0.5 - Math.random()).slice(0, 20) : works.filter');
code = code.replace('activeFilter === "ALL" &&', 'activeFilter === "DISCOVER" &&');
fs.writeFileSync('src/components/Gallery.jsx', code);
console.log('Fixed Gallery.jsx!');
