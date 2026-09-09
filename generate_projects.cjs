const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'public/images');
const categories = ['wedding', 'portraits', 'kids', 'events', 'festivals', 'food', 'others'];

let projects = [];

categories.forEach(cat => {
  const dir = path.join(destDir, cat);
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => fs.lstatSync(path.join(dir, f)).isFile());
    files.forEach((file, index) => {
      // Use different tags for the UI based on folder name
      let tag = cat.toUpperCase();
      if (cat === 'wedding') tag = 'WEDDING';
      if (cat === 'portraits') tag = 'PRE-WEDDING'; // Just to add pre-wedding tag mix
      if (cat === 'kids') tag = 'KIDS';
      if (cat === 'events' || cat === 'festivals' || cat === 'food' || cat === 'others') tag = 'EVENTS';
      
      let title = "Captured Moment";
      if (cat === 'wedding') title = "The Union";
      if (cat === 'kids') title = "Little Joy";
      if (cat === 'portraits') title = "Vogue Styles";

      projects.push({
        id: projects.length + 1,
        title: title,
        category: tag,
        image: `/images/${cat}/${file}`
      });
    });
  }
});

// Save to a text file
fs.writeFileSync(path.join(__dirname, 'scratch_projects.json'), JSON.stringify(projects, null, 2));
console.log('Done generating projects array.');
