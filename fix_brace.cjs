const fs = require('fs');

let code = fs.readFileSync('src/components/Services.jsx', 'utf8');
code = code.replace('\n\nconst Services = ({ onBook }) => {', '\n};\n\nconst Services = ({ onBook }) => {');
fs.writeFileSync('src/components/Services.jsx', code);
console.log('Fixed syntax error!');
