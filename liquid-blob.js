(function initLiquidBlob() {
  // Mouse tracking state
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let isMouseMoved = false;
  let isVisible = true;

  // Define our 3 blobs (Main + 2 Satellites)
  const blobs = [
    { id: 'blob-main', contId: 'blob-main-container', x: mouseX, y: mouseY, lerp: 0.4, phase: 0.0 },
    { id: 'blob-sat1', contId: 'blob-sat1-container', x: mouseX, y: mouseY, lerp: 0.2, phase: 1.5 },
    { id: 'blob-sat2', contId: 'blob-sat2-container', x: mouseX, y: mouseY, lerp: 0.1, phase: 3.0 }
  ];

  // Cache DOM elements
  blobs.forEach(b => {
    b.el = document.getElementById(b.contId);
    b.path = document.getElementById(b.id);
  });
  
  // Wait until DOM is fully loaded in case script is loaded early
  document.addEventListener('DOMContentLoaded', () => {
    blobs.forEach(b => {
      if (!b.el) b.el = document.getElementById(b.contId);
      if (!b.path) b.path = document.getElementById(b.id);
    });
  });

  // Update target position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isMouseMoved) {
      isMouseMoved = true;
      blobs.forEach(b => {
        if (b.el) b.el.style.opacity = 'var(--blob-opacity, 0.9)';
      });
    }
  });

  // Pause when off-screen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  });
  if (document.body) observer.observe(document.body);
  
  document.addEventListener('visibilitychange', () => {
    isVisible = document.visibilityState === 'visible';
  });

  let startTime = performance.now();
  
  function render(time) {
    if (isVisible) {
      const rootStyles = getComputedStyle(document.documentElement);
      let duration = parseFloat(rootStyles.getPropertyValue('--blob-duration')) || 8;
      duration = Math.max(3, Math.min(duration, 18));
      const speed = (Math.PI * 2) / (duration * 1000); 
      
      blobs.forEach((b) => {
        if (!b.el || !b.path) return;

        // 1. Smooth cursor follow (LERP)
        b.x += (mouseX - b.x) * b.lerp;
        b.y += (mouseY - b.y) * b.lerp;
        
        b.el.style.transform = `translate(${b.x}px, ${b.y}px) translate(-50%, -50%)`;

        // 2. Morphing Logic
        const t = (time - startTime) * speed + b.phase;
        
        const numPoints = 6;
        const center = 50;
        
        const baseRadius = parseFloat(rootStyles.getPropertyValue('--blob-radius')) || 28;
        const variation = parseFloat(rootStyles.getPropertyValue('--blob-variation')) || 18;
        
        const points = [];
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          const offset = Math.sin(t + i * 1.5) * Math.cos(t * 0.8 + i * 2.1);
          const radius = baseRadius + variation * offset;
          
          points.push({
            x: center + Math.cos(angle) * radius,
            y: center + Math.sin(angle) * radius,
            angle: angle
          });
        }
        
        // 3. Generate SVG Path
        let d = `M ${points[0].x} ${points[0].y} `;
        for (let i = 0; i < numPoints; i++) {
          const p1 = points[i];
          const p2 = points[(i + 1) % numPoints];
          
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          const cpLen = dist * 0.33; 
          
          const tang1 = p1.angle + Math.PI / 2;
          const tang2 = p2.angle + Math.PI / 2;
          
          const cp1x = p1.x + Math.cos(tang1) * cpLen;
          const cp1y = p1.y + Math.sin(tang1) * cpLen;
          
          const cp2x = p2.x - Math.cos(tang2) * cpLen;
          const cp2y = p2.y - Math.sin(tang2) * cpLen;
          
          d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y} `;
        }
        b.path.setAttribute('d', d);
      });
    }
    requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);
})();
