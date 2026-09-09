const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../photos');
const destDir = path.join(__dirname, 'public/images');

// Categories
const categories = ['wedding', 'portraits', 'kids', 'events', 'festivals', 'food', 'others'];

// Ensure category directories exist
categories.forEach(cat => {
  const dir = path.join(destDir, cat);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Helper to determine category based on filename
function getCategory(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('wedding') || lower.includes('bridal') || lower.includes('mugurtham') || lower.includes('bride')) return 'wedding';
  if (lower.includes('kids') || lower.includes('baby')) return 'kids';
  if (lower.includes('food')) return 'food';
  if (lower.includes('festival') || lower.includes('christmas') || lower.includes('janmashtami')) return 'festivals';
  if (lower.includes('event')) return 'events';
  if (lower.includes('portrait') || lower.includes('makeup') || lower.includes('makeover') || lower.includes('beauty') || lower.includes('model')) return 'portraits';
  return 'others';
}

const files = fs.readdirSync(sourceDir).filter(f => fs.lstatSync(path.join(sourceDir, f)).isFile());

// Move and rename
let counts = {};
categories.forEach(cat => counts[cat] = 100); // Start naming from 100 to avoid conflicts with existing

files.forEach(file => {
  const cat = getCategory(file);
  const ext = path.extname(file).toLowerCase();
  const oldPath = path.join(sourceDir, file);
  
  // Find next available name
  let newName = '';
  let newPath = '';
  while (true) {
    newName = `${cat}-${counts[cat]}${ext}`;
    newPath = path.join(destDir, cat, newName);
    if (!fs.existsSync(newPath)) {
      break;
    }
    counts[cat]++;
  }
  
  fs.copyFileSync(oldPath, newPath);
  counts[cat]++;
});

console.log('Photos categorized and copied successfully.');
