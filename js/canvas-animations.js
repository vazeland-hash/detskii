/* ============================================================
   CANVAS-АНИМАЦИИ ДЛЯ ГЛАГОЛОВ
   Файл: js/canvas-animations.js
   ============================================================ */

const CanvasAnimations = (() => {
  const activeAnimations = new Map();

  function drawElephant(ctx, t) {
    const walk = Math.sin(t * 4) * 3;
    ctx.save(); ctx.translate(0, walk); ctx.scale(-1, 1);
    ctx.fillStyle = '#6b6b7d';
    [-30, -10, 15, 35].forEach((lx, i) => {
      const swing = Math.sin(t * 8 + i * 1.5) * 8;
      ctx.save(); ctx.translate(lx, 20); ctx.rotate(swing * 0.02);
      ctx.fillRect(-6, 0, 12, 32);
      ctx.beginPath(); ctx.ellipse(0, 32, 8, 5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
    ctx.fillStyle = '#9b9bb0'; ctx.beginPath(); ctx.ellipse(0, 0, 50, 35, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#8f8fa5'; ctx.beginPath(); ctx.ellipse(-45, -10, 28, 25, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a0a0b8'; ctx.beginPath(); ctx.ellipse(-35, -15, 15, 20, 0.3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#9b9bb0'; ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-65, -5); ctx.quadraticCurveTo(-85, 10 + Math.sin(t * 3) * 5, -75, 30); ctx.stroke();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-52, -18, 3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#f5f5dc'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-62, 5); ctx.quadraticCurveTo(-75, 10, -70, 20); ctx.stroke();
    ctx.restore();
  }

  function drawCat(ctx, t) {
    const bounce = Math.abs(Math.sin(t * 10)) * 8;
    ctx.save(); ctx.translate(0, -bounce);
    ctx.strokeStyle = '#ff8c42'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(25, 0); ctx.quadraticCurveTo(45, -15 + Math.sin(t * 12) * 8, 40, -30); ctx.stroke();
    ctx.fillStyle = '#e07b39'; const legPhase = t * 14;
    ctx.save(); ctx.translate(15, 10); ctx.rotate(Math.sin(legPhase) * 0.5); ctx.fillRect(-3, 0, 6, 18); ctx.restore();
    ctx.save(); ctx.translate(5, 10); ctx.rotate(Math.sin(legPhase + Math.PI) * 0.5); ctx.fillRect(-3, 0, 6, 18); ctx.restore();
    ctx.save(); ctx.translate(-12, 10); ctx.rotate(Math.sin(legPhase + Math.PI) * 0.5); ctx.fillRect(-3, 0, 6, 18); ctx.restore();
    ctx.save(); ctx.translate(-22, 10); ctx.rotate(Math.sin(legPhase) * 0.5); ctx.fillRect(-3, 0, 6, 18); ctx.restore();
    ctx.fillStyle = '#ff9f5a'; ctx.beginPath(); ctx.ellipse(0, 0, 28, 16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffb070'; ctx.beginPath(); ctx.arc(-28, -8, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff9f5a'; ctx.beginPath(); ctx.moveTo(-35, -18); ctx.lineTo(-32, -30); ctx.lineTo(-25, -20); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-25, -18); ctx.lineTo(-20, -30); ctx.lineTo(-18, -18); ctx.fill();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-32, -8, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-24, -8, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff6b6b'; ctx.beginPath(); ctx.arc(-28, -3, 2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawFish(ctx, t) {
    const wiggle = Math.sin(t * 6) * 0.2;
    ctx.save(); ctx.rotate(wiggle);
    ctx.fillStyle = '#ff6b9d'; ctx.beginPath(); ctx.moveTo(25, 0); ctx.lineTo(45, -12); ctx.lineTo(45, 12); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ff9ec7'; ctx.beginPath(); ctx.ellipse(0, 0, 30, 16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff6b9d'; ctx.beginPath(); ctx.moveTo(-5, -15); ctx.quadraticCurveTo(5, -28, 15, -14); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-18, -3, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-19, -3, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawBird(ctx, t) {
    const bob = Math.sin(t * 3) * 3; const flap = Math.sin(t * 12) * 0.4;
    ctx.save(); ctx.translate(0, bob); ctx.scale(-1, 1);
    ctx.fillStyle = '#4a90d9'; ctx.beginPath(); ctx.moveTo(15, 0); ctx.lineTo(30, -8); ctx.lineTo(30, 8); ctx.fill();
    ctx.fillStyle = '#6bb0f5'; ctx.beginPath(); ctx.ellipse(0, 0, 18, 13, 0, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.translate(-2, -2); ctx.rotate(flap);
    ctx.fillStyle = '#4a90d9'; ctx.beginPath(); ctx.ellipse(0, 0, 12, 6, -0.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#6bb0f5'; ctx.beginPath(); ctx.arc(-15, -8, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffb400'; const beakOpen = Math.abs(Math.sin(t * 10)) * 4;
    ctx.beginPath(); ctx.moveTo(-24, -8); ctx.lineTo(-34, -8 - beakOpen); ctx.lineTo(-24, -4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-24, -4); ctx.lineTo(-34, -4 + beakOpen); ctx.lineTo(-24, 0); ctx.fill();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-18, -10, 2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawDog(ctx, t) {
    const jump = Math.abs(Math.sin(t * 3)) * 40;
    ctx.save(); ctx.translate(0, -jump);
    ctx.strokeStyle = '#b5651d'; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(28, -5); ctx.quadraticCurveTo(45, -15 + Math.sin(t * 15) * 10, 50, -25); ctx.stroke();
    ctx.fillStyle = '#a0522d';
    ctx.save(); ctx.translate(15, 10); ctx.rotate(-0.3); ctx.fillRect(-4, 0, 8, 20); ctx.restore();
    ctx.save(); ctx.translate(20, 10); ctx.rotate(-0.2); ctx.fillRect(-4, 0, 8, 20); ctx.restore();
    ctx.fillStyle = '#c87f3e'; ctx.beginPath(); ctx.ellipse(0, 0, 32, 18, 0, 0, Math.PI * 2); ctx.fill();
    const legLift = jump > 5 ? -0.6 : 0;
    ctx.fillStyle = '#a0522d';
    ctx.save(); ctx.translate(-18, 10); ctx.rotate(legLift); ctx.fillRect(-4, 0, 8, 20); ctx.restore();
    ctx.save(); ctx.translate(-24, 10); ctx.rotate(legLift + 0.1); ctx.fillRect(-4, 0, 8, 20); ctx.restore();
    ctx.fillStyle = '#d48f4f'; ctx.beginPath(); ctx.arc(-32, -8, 16, 0, Math.PI * 2); ctx.fill();
    const earSwing = Math.sin(t * 8) * 0.15;
    ctx.save(); ctx.translate(-38, -20); ctx.rotate(earSwing);
    ctx.fillStyle = '#a0522d'; ctx.beginPath(); ctx.ellipse(0, 8, 6, 12, 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#e0a76c'; ctx.beginPath(); ctx.ellipse(-42, -2, 10, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-48, -3, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-35, -12, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function start(canvasId, type) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width || 300;
    canvas.height = rect.height || 300;
    let animationFrame;
    const startTime = performance.now();
    function loop(now) {
      const t = (now - startTime) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2 + 20);
      const scale = Math.min(canvas.width, canvas.height) / 200;
      ctx.scale(scale, scale);
      if (type === 'run') drawCat(ctx, t);
      else if (type === 'walk') drawElephant(ctx, t);
      else if (type === 'swim') drawFish(ctx, t);
      else if (type === 'sing') drawBird(ctx, t);
      else if (type === 'jump') drawDog(ctx, t);
      ctx.restore();
      animationFrame = requestAnimationFrame(loop);
    }
    activeAnimations.set(canvasId, () => cancelAnimationFrame(animationFrame));
    loop(startTime);
  }

  function stop(canvasId) {
    if (activeAnimations.has(canvasId)) {
      activeAnimations.get(canvasId)();
      activeAnimations.delete(canvasId);
    }
  }
  function stopAll() {
    activeAnimations.forEach(stopFn => stopFn());
    activeAnimations.clear();
  }
  return { start, stop, stopAll };
})();