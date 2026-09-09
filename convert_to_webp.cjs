const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'public', 'images');

async function convertImages(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await convertImages(filePath);
    } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const newFilePath = path.join(dir, `${base}.webp`);
      
      console.log(`Converting ${filePath} to WebP...`);
      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(newFilePath);
        console.log(`Successfully converted to ${newFilePath}`);
        
        // After successful conversion, delete the original
        fs.unlinkSync(filePath);
        console.log(`Deleted original file: ${filePath}`);
      } catch (err) {
        console.error(`Error converting ${filePath}:`, err);
      }
    }
  }
}

async function main() {
  console.log('Starting image conversion to WebP...');
  await convertImages(imagesDir);
  console.log('Finished image conversion.');
}

main();
