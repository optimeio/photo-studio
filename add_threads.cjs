const fs = require('fs');

let code = fs.readFileSync('src/components/Services.jsx', 'utf8');

const oldComponentStart = "const ServiceCard = ({ svc, onBook }) => {";
const oldComponentEnd = "};\n\nconst Services = ({ onBook }) => {";

const newComponent = `const ServiceCard = ({ svc, onBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const frontRef = useRef(null);
  const leftThreadRef = useRef(null);
  const rightThreadRef = useRef(null);

  useEffect(() => {
    const targetAngle = isOpen ? 75 : 0;
    
    const proxy = { angle: frontRef.current._angle || 0 };
    
    gsap.to(proxy, {
      angle: targetAngle,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (!frontRef.current) return;
        frontRef.current._angle = proxy.angle;
        
        gsap.set(frontRef.current, { rotationX: proxy.angle, transformOrigin: "bottom center" });
        
        const thetaRad = proxy.angle * (Math.PI / 180);
        const deltaY = 1 - Math.cos(thetaRad);
        const deltaZ = Math.sin(thetaRad);
        
        const scaleY = Math.sqrt(deltaY * deltaY + deltaZ * deltaZ);
        
        let threadAngleX = 0;
        if (deltaY !== 0 || deltaZ !== 0) {
          threadAngleX = Math.atan2(deltaZ, deltaY) * (180 / Math.PI);
        }
        
        if (leftThreadRef.current) {
          gsap.set(leftThreadRef.current, { rotationX: threadAngleX, scaleY: scaleY, z: 1 });
        }
        if (rightThreadRef.current) {
          gsap.set(rightThreadRef.current, { rotationX: threadAngleX, scaleY: scaleY, z: 1 });
        }
      }
    });
  }, [isOpen]);

  return (
    <div 
      className="service-card relative w-full aspect-[4/5] cursor-pointer [perspective:1500px] z-10 hover:z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Threads */}
      <div 
        ref={leftThreadRef} 
        className="absolute top-0 left-[8%] w-[1.5px] h-full bg-[#12100E] origin-top z-20 pointer-events-none"
        style={{ transform: 'scaleY(0)' }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full border-[1.5px] border-[#12100E] bg-[#FFFDF8]" />
      </div>
      <div 
        ref={rightThreadRef} 
        className="absolute top-0 right-[8%] w-[1.5px] h-full bg-[#12100E] origin-top z-20 pointer-events-none"
        style={{ transform: 'scaleY(0)' }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full border-[1.5px] border-[#12100E] bg-[#FFFDF8]" />
      </div>

      {/* Back face (Text & Button) */}
      <div className="absolute inset-0 bg-[#FFFDF8] shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-2 md:p-6 pt-4 md:pt-12 flex flex-col items-center justify-start text-center rounded-sm">
        <h4 className="text-[1.2rem] md:text-5xl font-serif font-bold text-[#12100E] mb-1 md:mb-2 leading-tight">{svc.title}</h4>
        <p className="text-[#12100E]/70 text-[9px] md:text-lg leading-snug md:leading-relaxed mb-2 md:mb-6 font-light px-1 md:px-2">{svc.desc}</p>
        <a 
          href="#booking"
          onClick={() => onBook && onBook(svc.id)}
          className="bg-[#C5A059] hover:bg-[#12100E] text-[#FFFDF8] px-3 md:px-10 py-1.5 md:py-4 rounded-sm transition-colors duration-300 uppercase tracking-[0.1em] md:tracking-[0.2em] text-[8px] md:text-sm font-bold mt-2 md:mt-4 mb-2 md:mb-0"
        >
          Book
        </a>
      </div>

      {/* Front face (Image) */}
      <div ref={frontRef} className="absolute inset-0 transform-style-3d origin-bottom z-10 bg-[#12100E] rounded-sm shadow-lg overflow-hidden">
        <img src={svc.image} className="w-full h-full object-cover object-center" alt={svc.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-transparent flex items-end justify-center pb-4 md:pb-8 pointer-events-none px-2 md:px-4 text-center">
          <h4 className="text-[1.1rem] leading-tight md:text-4xl font-serif text-[#FFFDF8] font-bold drop-shadow-md">{svc.title}</h4>
        </div>
      </div>
    </div>
  );
`;

const regex = /const ServiceCard = \(\{ svc, onBook \}\) => \{[\s\S]*?\}\;\n\nconst Services = \(\{ onBook \}\) => \{/;

code = code.replace(regex, newComponent + "\n\nconst Services = ({ onBook }) => {");

fs.writeFileSync('src/components/Services.jsx', code);
console.log('Threads added successfully!');
