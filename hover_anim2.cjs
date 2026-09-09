const fs = require('fs');

let code = fs.readFileSync('src/components/Gallery.jsx', 'utf8');

// I will extract the exact content from '<div className="masonry-grid">' up to the '<!-- CTA -->' or '{/* CTA */}'

const match = code.match(/<div className="masonry-grid">[\s\S]*?\{\/\* CTA \*\/\}/);
if (match) {
  const newBlock = `<div className="masonry-grid">
          {filteredWorks.map((work, idx) => (
            <div
              key={\`\${work.title}-\${activeFilter}-\${idx}\`}
              className="work-card group relative overflow-hidden rounded-sm cursor-pointer masonry-item transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(197,160,89,0.15)]"
            >
              {/* Uncropped Image with enhanced zoom and slight tilt */}
              <img
                src={work.src}
                alt={work.title}
                className="w-full h-auto block transition-transform duration-[1500ms] ease-out group-hover:scale-[1.08] group-hover:rotate-1"
                style={{ willChange: 'transform' }}
              />

              {/* Deepened Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#12100E]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Center "View" Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-500 delay-75 pointer-events-none">
                <div className="w-14 h-14 rounded-full border border-[#C5A059]/50 bg-[#12100E]/30 backdrop-blur-md flex items-center justify-center text-[#C5A059]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>

              {/* Bottom text — dynamic animations */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                <div className="w-0 group-hover:w-12 h-[1.5px] bg-[#C5A059] mb-2 md:mb-3 transition-all duration-700 ease-out" />
                <span className="text-[8px] md:text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.3em] block mb-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {work.category}
                </span>
                <h4 className="text-[#FFFDF8] font-serif text-lg md:text-2xl font-bold group-hover:text-[#C5A059] transition-colors duration-500">{work.title}</h4>
                <p className="text-[#FFFDF8]/60 text-[10px] md:text-xs mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {work.subtitle}
                </p>
              </div>

              {/* Dynamic Sweeping Borders */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <div className="absolute bottom-0 right-0 w-full h-[1.5px] bg-gradient-to-l from-transparent via-[#C5A059] to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out" />
              <div className="absolute top-0 left-0 w-[1.5px] h-full bg-gradient-to-b from-transparent via-[#C5A059] to-transparent transform -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out" />
              <div className="absolute top-0 right-0 w-[1.5px] h-full bg-gradient-to-t from-transparent via-[#C5A059] to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 ease-in-out" />
            </div>
          ))}
        </div>

        {/* CTA */}`;

  code = code.replace(match[0], newBlock);
  fs.writeFileSync('src/components/Gallery.jsx', code);
  console.log('Hover effects applied securely!');
} else {
  console.log('Match not found!');
}
