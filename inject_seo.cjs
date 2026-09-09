const fs = require('fs');

const pages = [
  {
    file: 'src/pages/Home.jsx',
    title: 'Professional Photography Studio in Salem',
    desc: 'PixelBees Photography is a professional photography studio in Salem, Tamil Nadu, offering wedding, candid, portrait, pre-wedding and event photography.',
    path: '/'
  },
  {
    file: 'src/pages/ServicesPage.jsx',
    title: 'Photography Services in Salem',
    desc: 'Explore our premium photography services in Salem including Wedding, Candid, Portrait, and Event photography.',
    path: '/services'
  },
  {
    file: 'src/pages/PortfolioPage.jsx',
    title: 'Photography Portfolio',
    desc: 'View the photography portfolio of PixelBees Photography, featuring our best wedding, candid, and portrait shots.',
    path: '/portfolio'
  },
  {
    file: 'src/pages/JournalPage.jsx',
    title: 'Photography Journal & Stories',
    desc: 'Read stories, tips, and behind-the-scenes insights from our latest photography sessions in Salem.',
    path: '/journal'
  },
  {
    file: 'src/pages/ContactPage.jsx',
    title: 'Contact Us | Book a Photography Session',
    desc: 'Get in touch with PixelBees Photography in Salem to book your next wedding, portrait, or event photography session.',
    path: '/contact'
  }
];

pages.forEach(page => {
  let code = fs.readFileSync(page.file, 'utf8');
  
  // Add import safely after the first line (or right after the last import)
  if (!code.includes("import SEO from")) {
    const importMatch = code.match(/import [^\n]+\n/g);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      code = code.replace(lastImport, `${lastImport}import SEO from '../components/SEO';\n`);
    } else {
      code = `import SEO from '../components/SEO';\n${code}`;
    }
  }

  // Insert SEO tag
  const seoTag = `<SEO title="${page.title}" description="${page.desc}" path="${page.path}" />`;
  
  if (code.includes('<main')) {
    code = code.replace(/(<main[^>]*>)/, `$1\n      ${seoTag}`);
  } else if (code.includes('className="min-h-screen')) {
    code = code.replace(/(<div[^>]*className="min-h-screen[^>]*>)/, `$1\n      ${seoTag}`);
  } else if (code.includes('<div className="w-full">')) {
     code = code.replace(/(<div className="w-full">)/, `$1\n      ${seoTag}`);
  } else if (code.includes('<div className="w-full bg-[#12100E]')) {
     code = code.replace(/(<div className="w-full bg-\[#12100E\][^>]*>)/, `$1\n      ${seoTag}`);
  }

  fs.writeFileSync(page.file, code);
});

console.log("SEO tags added safely");
