const fs = require('fs');
const path = require('path');

const sourceDir = 'E:\\Projects\\Ethiroli\\Photographic\\photos';
const targetDir = 'e:\\Projects\\Ethiroli\\Photographic\\photo-studio\\public\\images';

const categories = {
  wedding: ['bridal', 'wedding', 'mugurtham'],
  kids: ['kids', 'baby'],
  maternity: ['maternity'],
  portraits: ['beauty', 'glowing', 'makeup', 'skin', 'model', 'portrait'],
  food: ['food'],
  events: ['dance', 'jci', 'event'],
  festivals: ['christmas', 'janmashtami', 'wrap']
};

const counters = {
  wedding: 1,
  kids: 1,
  maternity: 1,
  portraits: 1,
  food: 1,
  events: 1,
  festivals: 1,
  others: 1
};

// Create target directories
Object.keys(counters).forEach(category => {
  const dirPath = path.join(targetDir, category);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

fs.readdirSync(sourceDir).forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  
  if (fs.statSync(sourcePath).isDirectory()) return;

  const fileNameLower = file.toLowerCase();
  let assignedCategory = 'others';

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => fileNameLower.includes(keyword))) {
      assignedCategory = category;
      break;
    }
  }

  const ext = path.extname(file);
  const newFileName = `${assignedCategory}-${counters[assignedCategory]++}${ext}`;
  const targetPath = path.join(targetDir, assignedCategory, newFileName);

  fs.copyFileSync(sourcePath, targetPath);
  console.log(`Copied ${file} -> ${assignedCategory}/${newFileName}`);
});

console.log('Image processing complete.');
