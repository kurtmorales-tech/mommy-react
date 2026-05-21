import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Initialize falling petals effect
    const canvas = document.createElement('canvas');
    canvas.id = 'petals';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.zIndex = '2';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#C4536A', '#E8A0AD', '#F7D6DC', '#C9943A', '#E8C46A', '#D4A0B0'];

    function randomPetal() {
      return {
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 100,
        r: 4 + Math.random() * 7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: (Math.random() - 0.5) * 1.2,
        vy: 0.8 + Math.random() * 1.4,
        angle: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.06,
        opacity: 0.5 + Math.random() * 0.45,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.02,
      };
    }

    const petals = Array.from({ length: 38 }, randomPetal);

    function drawPetal(p: any) {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r * 0.55, p.r, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    }

    function animatePetals() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p: any) => {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.5;
        p.y += p.vy;
        p.angle += p.va;
        if (p.y > canvas.height + 30) Object.assign(p, randomPetal(), { y: -20, x: Math.random() * canvas.width });
        drawPetal(p);
      });
      requestAnimationFrame(animatePetals);
    }
    animatePetals();

    // Initialize sparkles
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkles';
    sparkleContainer.style.position = 'fixed';
    sparkleContainer.style.inset = '0';
    sparkleContainer.style.zIndex = '3';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.overflow = 'hidden';
    document.body.appendChild(sparkleContainer);

    for (let i = 0; i < 22; i++) {
      const el = document.createElement('div');
      el.className = 'sparkle';
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${5 + Math.random() * 8}px;
        height: ${5 + Math.random() * 8}px;
        --dur: ${2.5 + Math.random() * 3}s;
        --delay: ${Math.random() * 4}s;
      `;
      sparkleContainer.appendChild(el);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      document.body.removeChild(canvas);
      document.body.removeChild(sparkleContainer);
    };
  }, []);

  const images = [
    '20220726_172146.JPEG',
    '475115625_2049754348780059_185621722997190898_n.jpg',
    '489509417_9641686172561054_1068400923319504165_n.jpg',
    '645615387_26137023689267375_7114834268889657288_n.jpg',
    '659808669_26425765517059856_4038776549851551333_n.jpg',
    '665938466_26502488569387550_1438531920647394520_n.jpg'
  ];

  return (
    <div className="birthday-container">
      <div className="bg-layer"></div>
      
      {/* Corner ornaments */}
      <div className="corner tl">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 90 C10 40 40 10 90 10" stroke="#C9943A" stroke-width="1.2" fill="none"/>
          <path d="M10 70 C10 50 50 10 70 10" stroke="#C9943A" stroke-width="0.8" fill="none" opacity="0.6"/>
          <circle cx="10" cy="10" r="4" fill="#C9943A" opacity="0.5"/>
          <circle cx="90" cy="10" r="2.5" fill="#C9943A" opacity="0.4"/>
          <circle cx="10" cy="90" r="2.5" fill="#C9943A" opacity="0.4"/>
          <ellipse cx="50" cy="10" rx="6" ry="10" fill="#C4536A" opacity="0.3" transform="rotate(-20 50 10)"/>
          <ellipse cx="10" cy="50" rx="6" ry="10" fill="#C4536A" opacity="0.3" transform="rotate(70 10 50)"/>
        </svg>
      </div>
      <div className="corner tr">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 90 C10 40 40 10 90 10" stroke="#C9943A" stroke-width="1.2" fill="none"/>
          <path d="M10 70 C10 50 50 10 70 10" stroke="#C9943A" stroke-width="0.8" fill="none" opacity="0.6"/>
          <circle cx="10" cy="10" r="4" fill="#C9943A" opacity="0.5"/>
          <ellipse cx="50" cy="10" rx="6" ry="10" fill="#C4536A" opacity="0.3" transform="rotate(-20 50 10)"/>
          <ellipse cx="10" cy="50" rx="6" ry="10" fill="#C4536A" opacity="0.3" transform="rotate(70 10 50)"/>
        </svg>
      </div>
      <div className="corner bl">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 90 C10 40 40 10 90 10" stroke="#C9943A" stroke-width="1.2" fill="none"/>
          <path d="M10 70 C10 50 50 10 70 10" stroke="#C9943A" stroke-width="0.8" fill="none" opacity="0.6"/>
          <circle cx="10" cy="10" r="4" fill="#C9943A" opacity="0.5"/>
          <ellipse cx="50" cy="10" rx="6" ry="10" fill="#C4536A" opacity="0.3" transform="rotate(-20 50 10)"/>
          <ellipse cx="10" cy="50" rx="6" ry="10" fill="#C4536A" opacity="0.3" transform="rotate(70 10 50)"/>
        </svg>
      </div>
      <div className="corner br">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 90 C10 40 40 10 90 10" stroke="#C9943A" stroke-width="1.2" fill="none"/>
          <path d="M10 70 C10 50 50 10 70 10" stroke="#C9943A" stroke-width="0.8" fill="none" opacity="0.6"/>
          <circle cx="10" cy="10" r="4" fill="#C9943A" opacity="0.5"/>
          <ellipse cx="50" cy="10" rx="6" ry="10" fill="#C4536A" opacity="0.3" transform="rotate(-20 50 10)"/>
          <ellipse cx="10" cy="50" rx="6" ry="10" fill="#C4536A" opacity="0.3" transform="rotate(70 10 50)"/>
        </svg>
      </div>

      <div className="card">
        <div className="rule">
          <div className="rule-line"></div>
          <div className="rule-diamond"></div>
          <div className="rule-line"></div>
        </div>

        <p className="happy">Happy Birthday</p>

        <h1 className="name">Mae Morales</h1>

        <div className="floral">✦ ✿ ✦</div>

        <div className="date-badge">
          <span>✦</span>
          May 21, 2026
          <span>✦</span>
        </div>

        <p className="message">
          "On this beautiful day, as you celebrate your 41st birthday, may every joy return to you a hundredfold.
          You are cherished, celebrated, and loved beyond all measure."
        </p>

        {/* Gallery Title */}
        <div className="gallery-title">A Journey Through Memories</div>
        
        {/* Gallery */}
        <div className="gallery">
          {images.map((img, index) => (
            <img 
              key={index} 
              src={`/images/${img}`} 
              alt={`Memory ${index + 1}`}
            />
          ))}
        </div>

        <div className="rule bottom-rule">
          <div className="rule-line"></div>
          <div className="rule-diamond"></div>
          <div className="rule-line"></div>
        </div>

        <p className="from-line">With all our love ♡</p>
      </div>
    </div>
  );
}

export default App;