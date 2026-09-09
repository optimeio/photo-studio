const fs = require('fs');
const path = require('path');

const projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'scratch_projects.json'), 'utf8'));

let worksContent = 'const works = [\n';

projects.forEach((p, index) => {
  let cat = p.category;
  
  if (cat === 'EVENTS') {
    const r = Math.random();
    if (r < 0.25) cat = 'FASHION';
    else if (r < 0.5) cat = 'CANDID';
  }
  
  if (cat === 'WEDDING' || cat === 'WEDDINGS') {
    const r = Math.random();
    if (r < 0.2) cat = 'PRE-WEDDING';
    else cat = 'WEDDINGS';
  }

  if (p.image.includes('/images/portraits/')) {
    const r = Math.random();
    if (r < 0.3) cat = 'FASHION';
    else cat = 'PORTRAITS';
  }

  let subtitle = 'Every detail remembered';
  if (cat === 'WEDDINGS') subtitle = 'Sacred moments, eternal bonds';
  if (cat === 'PRE-WEDDING') subtitle = 'Before the forever begins';
  if (cat === 'CANDID') subtitle = 'Real moments, real feelings';
  if (cat === 'FASHION') subtitle = 'Bold. Expressive. Fearless.';
  if (cat === 'PORTRAITS') subtitle = 'Light carved from within';
  if (cat === 'KIDS') { cat = 'CANDID'; subtitle = 'The purest joy'; }

  let title = p.title;
  if (cat === 'PORTRAITS') title = 'Stunning Portraits';
  if (cat === 'FASHION') title = 'Vogue Styles';
  if (cat === 'PRE-WEDDING') title = 'A New Beginning';

  worksContent += `  { src: "${p.image}", category: "${cat}", title: "${title}", subtitle: "${subtitle}" },\n`;
});

worksContent += '];\n';

const galleryPath = path.join(__dirname, 'src/components/Gallery.jsx');
let galleryCode = fs.readFileSync(galleryPath, 'utf8');

galleryCode = galleryCode.replace(/const works = \[[\s\S]*?\];/, worksContent);

fs.writeFileSync(galleryPath, galleryCode);
console.log('Gallery.jsx balanced and updated!');
