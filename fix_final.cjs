const fs = require('fs');

// Fix Gallery.jsx animation dependency
let codeG = fs.readFileSync('src/components/Gallery.jsx', 'utf8');
codeG = codeG.replace('    }, sectionRef);\n    return () => ctx.revert();\n  }, []);', '    }, sectionRef);\n    return () => ctx.revert();\n  }, [activeFilter]);');
fs.writeFileSync('src/components/Gallery.jsx', codeG);

// Fix BookingSection.jsx placeholders
let codeB = fs.readFileSync('src/components/BookingSection.jsx', 'utf8');
codeB = codeB.replace('placeholder="Jane Doe"', 'placeholder="Karthik Subramanian"');
codeB = codeB.replace('placeholder="jane@example.com"', 'placeholder="karthik@example.in"');
codeB = codeB.replace('placeholder="+1 (555) 000-0000"', 'placeholder="+91 98765 43210"');
codeB = codeB.replace('placeholder="Tell us what you\'re dreaming of... How do you envision your shoot? Any specific locations or styles?"', 'placeholder="Tell us what you\'re dreaming of... How do you envision your shoot? Any specific locations like Mahabalipuram or traditional styles?"');
fs.writeFileSync('src/components/BookingSection.jsx', codeB);

console.log('Fixes applied successfully!');
