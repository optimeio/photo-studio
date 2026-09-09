const fs = require('fs');
const path = require('path');

function replaceExtensions(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'node_modules' && file !== 'images') {
      replaceExtensions(filePath);
    } else if (file.match(/\.(js|jsx|json)$/i)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Replace .jpg, .jpeg, .png with .webp
      content = content.replace(/\.jpg/g, '.webp');
      content = content.replace(/\.jpeg/g, '.webp');
      content = content.replace(/\.png/g, '.webp');
      
      // Specifically fix seo config which has .png for logo, but we also converted that
      // And just generally replace them

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated extensions in: ${filePath}`);
      }
    }
  }
}

console.log('Starting codebase update...');
replaceExtensions(path.join(__dirname, 'src'));
// Also do the SEO config and App.jsx which are in src
// Let's also do scratch_projects.json or any json files in root if they exist
const rootFiles = ['scratch_projects.json'];
rootFiles.forEach(f => {
  const fp = path.join(__dirname, f);
  if (fs.existsSync(fp)) {
    let content = fs.readFileSync(fp, 'utf8');
    const originalContent = content;
    content = content.replace(/\.jpg/g, '.webp');
    content = content.replace(/\.jpeg/g, '.webp');
    content = content.replace(/\.png/g, '.webp');
    if (content !== originalContent) {
      fs.writeFileSync(fp, content);
      console.log(`Updated extensions in: ${fp}`);
    }
  }
});
console.log('Finished codebase update.');
