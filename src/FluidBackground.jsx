import { useEffect, useRef } from 'react';
import './FluidBackground.css';

export default function FluidBackground({ 
  colors = ['#ff6b00', '#ff9500', '#ffb347'],
  speed = 0.5 
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;
    let blobs = [];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      // Reinitialize blobs on resize
      initBlobs();
    };

    const initBlobs = () => {
      blobs = [];
      const numBlobs = 6;
      for (let i = 0; i < numBlobs; i++) {
        blobs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 80 + Math.random() * 120,
          xSpeed: (Math.random() - 0.5) * speed,
          ySpeed: (Math.random() - 0.5) * speed,
          color: colors[i % colors.length],
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    const drawBlob = (blob, t) => {
      const { x, y, radius, color, phase } = blob;
      
      // Create pulsating effect
      const pulseRadius = radius + Math.sin(t * 0.5 + phase) * 20;
      
      // Create gradient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseRadius);
      gradient.addColorStop(0, color + 'cc');
      gradient.addColorStop(0.5, color + '66');
      gradient.addColorStop(1, color + '00');
      
      ctx.beginPath();
      ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const updateBlob = (blob) => {
      blob.x += blob.xSpeed;
      blob.y += blob.ySpeed;

      // Bounce off edges with smooth transition
      if (blob.x < -blob.radius) blob.x = width + blob.radius;
      if (blob.x > width + blob.radius) blob.x = -blob.radius;
      if (blob.y < -blob.radius) blob.y = height + blob.radius;
      if (blob.y > height + blob.radius) blob.y = -blob.radius;
    };

    const animate = () => {
      time += 0.016;
      
      // Clear with dark background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);
      
      // Set blend mode for glowing effect
      ctx.globalCompositeOperation = 'lighter';
      
      // Update and draw blobs
      blobs.forEach(blob => {
        updateBlob(blob);
        drawBlob(blob, time);
      });
      
      // Reset blend mode
      ctx.globalCompositeOperation = 'source-over';
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fluid-background"
    />
  );
}
