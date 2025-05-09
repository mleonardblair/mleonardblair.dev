'use client';
import { useRef, useEffect } from 'react';

export default function CanvasBackground({
  lineSpacing = 40,
  lineThickness = 0.75,
  particleSpeed = 1.2,
  particlesPerLine = 1,
  trailLength = 24,
  curveAmount = 0
}) {
  const bgCanvasRef = useRef(null);
  const fgCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const bigint = parseInt(hex, 16);
    return [
      (bigint >> 16) & 255,
      (bigint >> 8) & 255,
      bigint & 255
    ].join(',');
  }

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const fgCanvas = fgCanvasRef.current;
    const bgCtx = bgCanvas.getContext('2d');
    const fgCtx = fgCanvas.getContext('2d');

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      bgCanvas.width = fgCanvas.width = width;
      bgCanvas.height = fgCanvas.height = height;

      const fgColor = getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim();
      const fgRGB = hexToRgb(fgColor);

      // Diagonal lines
      bgCtx.clearRect(0, 0, width, height);
      bgCtx.strokeStyle = `rgba(${fgRGB}, 0.07w5)`;
      bgCtx.lineWidth = lineThickness;

      for (let i = -height; i < width + height; i += lineSpacing) {
        const x1 = Math.round(i);
        const x2 = Math.round(i + height);
        bgCtx.beginPath();
        bgCtx.moveTo(x1, 0);
        bgCtx.lineTo(x2, height);
        bgCtx.stroke();
      }

    //   // Vertical fade
    //   const gradient = bgCtx.createLinearGradient(0, 0, 0, height);
    //   gradient.addColorStop(0.0, 'rgba(0,0,0,1)');
    //   gradient.addColorStop(0.4, 'rgba(0,0,0,0.6)');
    //   gradient.addColorStop(1.0, 'rgba(0,0,0,0)');
    //   bgCtx.globalCompositeOperation = 'destination-in';
    //   bgCtx.fillStyle = gradient;
    //   bgCtx.fillRect(0, 0, width, height);
    //   bgCtx.globalCompositeOperation = 'source-over';

      // Particles
      const particles = [];
      for (let i = -height; i < width + height; i += lineSpacing) {
        if (Math.random() < 0.25) {
          for (let j = 0; j < particlesPerLine; j++) {
            const offset = Math.random() * height;
            particles.push({
                baseX: i,
                offset,
                history: [],
                speed: Math.random() * 3 + 2,            // 0.6 → 1.4 px/frame
                trail: Math.floor(Math.random() * 50 + 40)  // 16 → 28
              });
          }
        }
      }
      particlesRef.current = particles;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const width = fgCanvas.width;
      const height = fgCanvas.height;

      fgCtx.globalCompositeOperation = 'source-over';
      fgCtx.clearRect(0, 0, width, height);

      fgCtx.globalCompositeOperation = 'lighter';
      const r = 0, g = 200, b = 255;

      for (let p of particlesRef.current) {
        const x = p.baseX + p.offset;
        const y = p.offset;

        p.history.unshift({ x, y });
        if (p.history.length > p.trail) p.history.pop();

        // 🌠 Glow blur
        fgCtx.shadowBlur = 8;
        fgCtx.shadowColor = `rgba(${r},${g},${b},0.4)`;

        // ✨ Draw trail
        for (let i = p.history.length - 1; i >= 0; i--) {
            const pt = p.history[i];
            const t = i / (p.history.length - 1); // 0 (newest) → 1 (oldest)
          
            // Interpolate blue → purple
            const r = Math.round(0 + (160 - 0) * t);     // 0 → 160
            const g = Math.round(200 - 100 * t);         // 200 → 100
            const b = 255;                               // constant blue
          
            const radius = lineThickness;
            const offsetX = Math.sin(i * 0.4) * curveAmount;
          
            fgCtx.fillStyle = `rgba(${r},${g},${b},0.6)`; // strong trail
            fgCtx.beginPath();
            fgCtx.arc(pt.x + offsetX, pt.y, radius, 0, Math.PI * 2);
            fgCtx.fill();
          }
          
        // 💥 Head flare
        fgCtx.fillStyle = 'rgba(160,100,255,0.8)';
        fgCtx.beginPath();
        fgCtx.arc(x, y, lineThickness * 1.25, 0, Math.PI * 2);
        fgCtx.fill();

        // Reset shadow
        fgCtx.shadowBlur = 0;
        fgCtx.shadowColor = 'transparent';

        p.offset += p.speed;
        const buffer = trailLength * 5;
        if (x > width + height + buffer || y > height + buffer) {
          p.offset = -Math.random() * height;
          p.history = [];
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [
    lineSpacing,
    lineThickness,
    particleSpeed,
    particlesPerLine,
    trailLength,
    curveAmount
  ]);

  return (
    <>
      <canvas
        ref={bgCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -2,
          pointerEvents: 'none'
        }}
      />
      <canvas
        ref={fgCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
    </>
  );
}
