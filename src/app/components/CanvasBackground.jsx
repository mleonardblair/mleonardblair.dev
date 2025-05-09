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
  const performanceRef = useRef('high'); // Track device performance level
  const isEdgeRef = useRef(false); // Track if browser is Edge

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
    const detectEdge = () => {
      const userAgent = navigator.userAgent;
      if (userAgent.indexOf("Edg") !== -1) {
        isEdgeRef.current = true;
        console.log("Microsoft Edge detected - applying Edge-specific optimizations");
        performanceRef.current = 'low';
        return true;
      }
      return false;
    };

    const bgCanvas = bgCanvasRef.current;
    const fgCanvas = fgCanvasRef.current;
    const bgCtx = bgCanvas.getContext('2d', { alpha: false }); // Optimize for non-transparent canvas
    const fgCtx = fgCanvas.getContext('2d', { alpha: true });
    
    const detectPerformance = () => {
      if (detectEdge()) {
        return;
      }
      
      try {
        const testStart = performance.now();
        for (let i = 0; i < 100; i++) {
          fgCtx.beginPath();
          fgCtx.arc(50, 50, 10, 0, Math.PI * 2);
          fgCtx.fill();
        }
        const testTime = performance.now() - testStart;
        
        if (testTime > 50) {
          performanceRef.current = 'low';
        } else if (testTime > 20) {
          performanceRef.current = 'medium';
        } else {
          performanceRef.current = 'high';
        }
        
        console.log(`Device performance: ${performanceRef.current} (${testTime.toFixed(2)}ms)`);
      } catch (e) {
        performanceRef.current = 'medium';
        console.log('Performance test failed, defaulting to medium');
      }
    };
    
    detectPerformance();

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      bgCanvas.width = fgCanvas.width = Math.floor(width);
      bgCanvas.height = fgCanvas.height = Math.floor(height);

      const fgColor = getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim();
      const fgRGB = hexToRgb(fgColor);

      // Diagonal lines
      bgCtx.clearRect(0, 0, width, height);
      
      if (isEdgeRef.current) {
        bgCtx.strokeStyle = `rgb(${fgRGB})`;
        bgCtx.globalAlpha = 0.075; // Use globalAlpha instead of rgba for Edge
      } else {
        bgCtx.strokeStyle = `rgba(${fgRGB}, 0.075)`;
      }
      
      bgCtx.lineWidth = lineThickness;

      const effectiveLineSpacing = isEdgeRef.current ? lineSpacing * 2 : lineSpacing;

      for (let i = -height; i < width + height; i += effectiveLineSpacing) {
        const x1 = Math.floor(i);
        const x2 = Math.floor(i + height);
        bgCtx.beginPath();
        bgCtx.moveTo(x1, 0);
        bgCtx.lineTo(x2, height);
        bgCtx.stroke();
      }

      if (isEdgeRef.current) {
        bgCtx.globalAlpha = 1.0;
      }

      // Particles - adjust based on performance
      const particles = [];
      const performanceLevel = performanceRef.current;
      
      let particleDensity = 0.25; // Default
      let maxParticlesPerLine = particlesPerLine;
      let trailMultiplier = 1;
      
      if (isEdgeRef.current) {
        particleDensity = 0.05;  // 80% fewer particles for Edge
        maxParticlesPerLine = 1; // Only one particle per line for Edge
        trailMultiplier = 0.3;   // Much shorter trails for Edge
      } else if (performanceLevel === 'low') {
        particleDensity = 0.1;   // 60% fewer particles
        maxParticlesPerLine = Math.max(1, Math.floor(particlesPerLine * 0.5));
        trailMultiplier = 0.5;   // Shorter trails
      } else if (performanceLevel === 'medium') {
        particleDensity = 0.15;  // 40% fewer particles
        maxParticlesPerLine = Math.max(1, Math.floor(particlesPerLine * 0.75));
        trailMultiplier = 0.75;  // Slightly shorter trails
      }
      
      // Edge-specific optimization: Use larger spacing between particles
      const effectiveSpacing = isEdgeRef.current ? lineSpacing * 3 : lineSpacing;
      
      for (let i = -height; i < width + height; i += effectiveSpacing) {
        if (Math.random() < particleDensity) {
          for (let j = 0; j < maxParticlesPerLine; j++) {
            const offset = Math.floor(Math.random() * height); // Integer offset for Edge
            particles.push({
                baseX: Math.floor(i), // Integer coordinates for Edge
                offset,
                history: [],
                speed: isEdgeRef.current ? 
                  Math.random() * 1 + 0.5 :  // 0.5-1.5 for Edge
                  Math.random() * 2 + 1,     // 1-3 for other browsers
                trail: Math.floor((Math.random() * 30 + 20) * trailMultiplier)
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
      const performanceLevel = performanceRef.current;
      const isEdge = isEdgeRef.current;

      fgCtx.globalCompositeOperation = 'source-over';
      fgCtx.clearRect(0, 0, width, height);

      // Edge-specific optimization: Use 'source-over' instead of 'lighter' for Edge
      fgCtx.globalCompositeOperation = isEdge ? 'source-over' : 'lighter';
      
      const r = 0, g = 200, b = 255;
      
      // Edge-specific optimization: Never use shadows in Edge
      const useShadows = !isEdge && performanceLevel !== 'low';
      
      // Edge-specific optimization: Use more aggressive frame skipping for Edge
      const skipFrames = isEdge ? 4 : 
                        (performanceLevel === 'low' ? 3 : 
                        (performanceLevel === 'medium' ? 2 : 1));
      
      // Skip frames for performance
      if (typeof animationRef.current === 'number' && 
          animationRef.current % skipFrames !== 0 && 
          skipFrames > 1) {
        animationRef.current = requestAnimationFrame(draw);
        animationRef.current++;
        return;
      }

      // Edge-specific optimization: Limit the number of particles processed per frame
      const particlesToProcess = isEdge ? 
        particlesRef.current.slice(0, 10) : // Only process 10 particles at a time in Edge
        particlesRef.current;
      
      for (let p of particlesToProcess) {
        const x = Math.floor(p.baseX + p.offset); // Integer coordinates for Edge
        const y = Math.floor(p.offset);           // Integer coordinates for Edge

        p.history.unshift({ x, y });
        if (p.history.length > p.trail) p.history.pop();

        // 🌠 Glow blur - only on high performance devices and never in Edge
        if (useShadows) {
          fgCtx.shadowBlur = performanceLevel === 'high' ? 8 : 4;
          fgCtx.shadowColor = `rgba(${r},${g},${b},0.4)`;
        }

        // Edge-specific optimization: Skip more points and use simpler rendering in Edge
        const skipPoints = isEdge ? 3 : 
                          (performanceLevel === 'low' ? 2 : 
                          (performanceLevel === 'medium' ? 1 : 0));
        
        // Edge-specific optimization: Use a simplified trail rendering for Edge
        if (isEdge) {
          // Draw a simple line instead of individual circles for Edge
          if (p.history.length > 1) {
            fgCtx.beginPath();
            fgCtx.moveTo(p.history[0].x, p.history[0].y);
            
            for (let i = Math.min(5, p.history.length - 1); i > 0; i -= 2) {
              fgCtx.lineTo(p.history[i].x, p.history[i].y);
            }
            
            fgCtx.strokeStyle = 'rgba(100,150,255,0.4)';
            fgCtx.lineWidth = lineThickness;
            fgCtx.stroke();
          }
        } else {
          // Normal rendering for other browsers
          for (let i = p.history.length - 1; i >= 0; i -= (skipPoints + 1)) {
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
        }
          
        // 💥 Head flare - simplified for Edge
        if (isEdge) {
          fgCtx.fillStyle = 'rgb(160,100,255)';
          fgCtx.globalAlpha = 0.8;
        } else {
          fgCtx.fillStyle = 'rgba(160,100,255,0.8)';
        }
        
        fgCtx.beginPath();
        fgCtx.arc(x, y, lineThickness * (isEdge ? 1 : 1.25), 0, Math.PI * 2);
        fgCtx.fill();
        
        if (isEdge) {
          fgCtx.globalAlpha = 1.0;
        }

        // Reset shadow
        if (useShadows) {
          fgCtx.shadowBlur = 0;
          fgCtx.shadowColor = 'transparent';
        }

        p.offset += p.speed;
        const buffer = trailLength * 5;
        if (x > width + height + buffer || y > height + buffer) {
          p.offset = -Math.floor(Math.random() * height); // Integer offset for Edge
          p.history = [];
        }
      }

      // Edge-specific optimization: Use setTimeout instead of requestAnimationFrame for Edge
      if (isEdge) {
        animationRef.current = setTimeout(() => {
          requestAnimationFrame(draw);
        }, 16); // ~60fps
      } else {
        animationRef.current = requestAnimationFrame(draw);
        if (skipFrames > 1) {
          animationRef.current++;
        }
      }
    };

    draw();

    return () => {
      // Edge-specific cleanup: Clear timeout if we're using setTimeout
      if (isEdgeRef.current && typeof animationRef.current === 'number') {
        clearTimeout(animationRef.current);
      } else {
        cancelAnimationFrame(animationRef.current);
      }
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
