const fs = require('fs');

let code = fs.readFileSync('src/components/Services.jsx', 'utf8');

// The current color is gold: #C5A059
const gold = '#C5A059';
const blue = '#007BFF'; // Modern web blue

// Replace in threads and knots
code = code.replace(/bg-\[#C5A059\]/g, \`bg-[\${blue}]\`);
code = code.replace(/border-\[#C5A059\]/g, \`border-[\${blue}]\`);

fs.writeFileSync('src/components/Services.jsx', code);
console.log('Modified thread color to blue!');
