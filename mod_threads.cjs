const fs = require('fs');

let code = fs.readFileSync('src/components/Services.jsx', 'utf8');

// Thread main body
code = code.replace(/className="absolute top-0 left-0 w-\[1\.5px\] h-full bg-\[#12100E\] origin-top z-20 pointer-events-none"/g, 
                    'className="absolute top-0 left-0 w-[3px] h-full bg-[#C5A059] origin-top z-20 pointer-events-none"');
code = code.replace(/className="absolute top-0 right-0 w-\[1\.5px\] h-full bg-\[#12100E\] origin-top z-20 pointer-events-none"/g, 
                    'className="absolute top-0 right-0 w-[3px] h-full bg-[#C5A059] origin-top z-20 pointer-events-none"');

// Left loops of knots
code = code.replace(/className="absolute right-\[50%\] w-3 h-2 border-\[1\.5px\] border-\[#12100E\] rounded-full origin-right rotate-\[25deg\]"/g,
                    'className="absolute right-[50%] w-5 h-3 border-[3px] border-[#C5A059] rounded-full origin-right rotate-[25deg]"');

// Right loops of knots
code = code.replace(/className="absolute left-\[50%\] w-3 h-2 border-\[1\.5px\] border-\[#12100E\] rounded-full origin-left -rotate-\[25deg\]"/g,
                    'className="absolute left-[50%] w-5 h-3 border-[3px] border-[#C5A059] rounded-full origin-left -rotate-[25deg]"');

// Center knots
code = code.replace(/className="w-1\.5 h-1\.5 rounded-full bg-\[#12100E\] z-10"/g,
                    'className="w-3 h-3 rounded-full bg-[#C5A059] z-10"');

fs.writeFileSync('src/components/Services.jsx', code);
console.log('Modified knot and thread styling successfully!');
