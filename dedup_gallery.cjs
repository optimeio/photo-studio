const fs = require('fs');
const path = require('path');
const code = fs.readFileSync('src/components/Gallery.jsx', 'utf8');

const worksMatch = code.match(/const works = \[([\s\S]*?)\];/);
if (!worksMatch) {
  console.log('Could not find works array');
  process.exit(1);
}

const lines = worksMatch[1].split('\n').filter(l => l.trim().startsWith('{'));

const uniqueWorks = [];
const seenSizes = new Set();
const publicDir = path.join(process.cwd(), 'public');

for (const line of lines) {
  const srcMatch = line.match(/src:\s*"([^"]+)"/);
  if (srcMatch) {
    const imgPath = path.join(publicDir, srcMatch[1]);
    try {
      const stats = fs.statSync(imgPath);
      if (!seenSizes.has(stats.size)) {
        seenSizes.add(stats.size);
        uniqueWorks.push(line);
      } else {
        console.log('Skipping duplicate: ' + srcMatch[1]);
      }
    } catch (e) {
      // file missing, keep it
      uniqueWorks.push(line);
    }
  }
}

const newWorks = 'const works = [\n' + uniqueWorks.join('\n') + '\n];';
const newCode = code.replace(/const works = \[([\s\S]*?)\];/, newWorks);
fs.writeFileSync('src/components/Gallery.jsx', newCode);
console.log('Deduplicated works array from ' + lines.length + ' to ' + uniqueWorks.length);
