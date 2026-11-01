/* ============================================================
   SVG-ПЕРСОНАЖИ
   Файл: js/svg-characters.js
   Часть 1: boySVG, girlSVG
   ============================================================ */

function boySVG(x, y, pose, shirt) {
  shirt = shirt || '#4FA8D8';
  const skin = '#FFDDB0', hair = '#5D4037';
  let armGroup = '';
  if (pose === 'self') {
    armGroup = `<g class="anim-self" style="transform-box: fill-box;">
      <path d="M13,3 Q26,6 6,-2" stroke="${skin}" stroke-width="6" stroke-linecap="round" fill="none"/>
    </g>`;
  } else if (pose === 'point') {
    armGroup = `<g class="anim-point" style="transform-box: fill-box;">
      <path d="M13,3 L26,26" stroke="${skin}" stroke-width="6" stroke-linecap="round" fill="none"/>
      <circle cx="27" cy="27" r="3" fill="${skin}"/>
    </g>`;
  } else if (pose === 'wave') {
    armGroup = `<g class="anim-wave" style="transform-box: fill-box; transform-origin: 20% 90%;">
      <path d="M13,3 Q24,-8 22,-18" stroke="${skin}" stroke-width="6" stroke-linecap="round" fill="none"/>
      <circle cx="22" cy="-19" r="4" fill="${skin}"/>
    </g>`;
  } else {
    armGroup = `<path d="M13,3 L20,20" stroke="${skin}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  }
  const badge = pose === 'self'
    ? `<circle cx="0" cy="12" r="10" fill="#FFD700" stroke="#333" stroke-width="1.5"/>
       <text x="0" y="17" font-size="13" text-anchor="middle" font-weight="bold" fill="#333" font-family="Arial, sans-serif">I</text>`
    : '';
  return `<g transform="translate(${x},${y})">
    <rect x="-13" y="0" width="26" height="22" rx="3" fill="${shirt}" stroke="#333" stroke-width="2"/>
    <rect x="-11" y="22" width="22" height="12" rx="2" fill="#2C3E50" stroke="#333" stroke-width="1.5"/>
    ${badge}
    <path d="M-13,3 L-20,20" stroke="${skin}" stroke-width="6" stroke-linecap="round" fill="none"/>
    ${armGroup}
    <line x1="-6" y1="34" x2="-6" y2="46" stroke="#333" stroke-width="6" stroke-linecap="round"/>
    <line x1="6" y1="34" x2="6" y2="46" stroke="#333" stroke-width="6" stroke-linecap="round"/>
    <circle cx="0" cy="-12" r="12" fill="${skin}" stroke="#333" stroke-width="2"/>
    <path d="M-12,-20 Q0,-26 12,-20 L12,-15 Q0,-18 -12,-15 Z" fill="${hair}"/>
    <circle cx="-4" cy="-12" r="1.8" fill="#333"/>
    <circle cx="4" cy="-12" r="1.8" fill="#333"/>
    <path d="M-3,-7 Q0,-5 3,-7" stroke="#333" stroke-width="1.5" fill="none"/>
  </g>`;
}

function girlSVG(x, y, pose, dress) {
  dress = dress || '#E91E63';
  const skin = '#FFDDB0', hair = '#8B4513';
  let armGroup = '';
  if (pose === 'wave') {
    armGroup = `<g class="anim-wave" style="transform-box: fill-box; transform-origin: 20% 90%;">
      <path d="M13,3 Q24,-8 22,-18" stroke="${skin}" stroke-width="6" stroke-linecap="round" fill="none"/>
      <circle cx="22" cy="-19" r="4" fill="${skin}"/>
    </g>`;
  } else {
    armGroup = `<path d="M13,3 L20,20" stroke="${skin}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  }
  return `<g transform="translate(${x},${y})">
    <polygon points="-13,0 13,0 19,34 -19,34" fill="${dress}" stroke="#333" stroke-width="2"/>
    <path d="M-13,3 L-20,20" stroke="${skin}" stroke-width="6" stroke-linecap="round" fill="none"/>
    ${armGroup}
    <line x1="-6" y1="34" x2="-6" y2="46" stroke="#333" stroke-width="6" stroke-linecap="round"/>
    <line x1="6" y1="34" x2="6" y2="46" stroke="#333" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="-17" cy="-2" rx="5" ry="14" fill="${hair}" stroke="#5D4037" stroke-width="1"/>
    <ellipse cx="17" cy="-2" rx="5" ry="14" fill="${hair}" stroke="#5D4037" stroke-width="1"/>
    <polygon points="-17,-16 -23,-12 -17,-8" fill="#FF4081" stroke="#333" stroke-width="1"/>
    <polygon points="17,-16 23,-12 17,-8" fill="#FF4081" stroke="#333" stroke-width="1"/>
    <circle cx="0" cy="-12" r="12" fill="${skin}" stroke="#333" stroke-width="2"/>
    <path d="M-12,-20 Q0,-26 12,-20 L12,-15 Q0,-18 -12,-15 Z" fill="${hair}"/>
    <circle cx="-4" cy="-12" r="1.8" fill="#333"/>
    <circle cx="4" cy="-12" r="1.8" fill="#333"/>
    <line x1="-7" y1="-13" x2="-9" y2="-15" stroke="#333" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="7" y1="-13" x2="9" y2="-15" stroke="#333" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="-5" y1="-15" x2="-6" y2="-17" stroke="#333" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="5" y1="-15" x2="6" y2="-17" stroke="#333" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M-3,-7 Q0,-5 3,-7" stroke="#333" stroke-width="1.5" fill="none"/>
    <circle cx="-8" cy="-7" r="2.5" fill="#FF8A80" opacity="0.6"/>
    <circle cx="8" cy="-7" r="2.5" fill="#FF8A80" opacity="0.6"/>
  </g>`;
}
/* ============================================================
   Часть 2: catSVG, prepositionCardScene
   ============================================================ */

function catSVG(x, y, pose) {
  pose = pose || 'sit';
  if (pose === 'eat') {
    return `<g transform="translate(${x},${y})">
      <g>
        <ellipse cx="0" cy="10" rx="24" ry="18" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
        <circle cx="2" cy="-10" r="15" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
        <path d="M-10,-22 L-12,-38 L-2,-28 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
        <path d="M14,-22 L16,-38 L6,-28 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
        <circle cx="-2" cy="-10" r="2.2" fill="#333"/>
        <circle cx="8" cy="-10" r="2.2" fill="#333"/>
        <path d="M0,-3 Q3,0 6,-3" stroke="#333" stroke-width="2" fill="none"/>
        <ellipse cx="22" cy="26" rx="16" ry="6" fill="#8B5A2B"/>
        <path d="M6,26 Q22,38 38,26 L36,34 Q22,42 8,34 Z" fill="#E53935"/>
        <ellipse cx="22" cy="26" rx="12" ry="4" fill="#FF9800"/>
        <text x="22" y="24" font-size="10" text-anchor="middle">🍎</text>
        <path d="M20,10 Q28,16 26,22" stroke="#E06A1E" stroke-width="3" fill="none" stroke-linecap="round"/>
      </g>
    </g>`;
  }
  if (pose === 'run') {
    return `<g transform="translate(${x},${y})">
      <g>
        <ellipse cx="0" cy="5" rx="28" ry="16" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
        <circle cx="22" cy="-8" r="14" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
        <path d="M30,-18 L34,-32 L22,-22 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
        <path d="M18,-20 L14,-34 L10,-22 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
        <circle cx="26" cy="-8" r="2" fill="#333"/>
        <circle cx="17" cy="-8" r="2" fill="#333"/>
        <path d="M22,-2 Q24,0 26,-2" stroke="#333" stroke-width="1.5" fill="none"/>
        <path d="M-26,8 L-42,18" stroke="#E06A1E" stroke-width="5" stroke-linecap="round"/>
        <path d="M-14,14 L-22,28" stroke="#E06A1E" stroke-width="5" stroke-linecap="round"/>
        <path d="M4,14 L10,28" stroke="#E06A1E" stroke-width="5" stroke-linecap="round"/>
        <path d="M-30,0 Q-42,-8 -38,-22" stroke="#E06A1E" stroke-width="4" fill="none" stroke-linecap="round"/>
        <line x1="-60" y1="10" x2="-48" y2="10" stroke="#999" stroke-width="2" stroke-linecap="round"/>
        <line x1="-58" y1="20" x2="-46" y2="20" stroke="#999" stroke-width="2" stroke-linecap="round"/>
      </g>
    </g>`;
  }
  return `<g transform="translate(${x},${y})">
    <g>
      <path d="M20,10 Q34,5 32,-8" stroke="#E06A1E" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="0" cy="10" rx="24" ry="18" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
      <circle cx="0" cy="-12" r="15" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
      <path d="M-12,-22 L-14,-36 L-4,-27 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
      <path d="M12,-22 L14,-36 L4,-27 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
      <circle cx="-5" cy="-12" r="2.2" fill="#333"/>
      <circle cx="5" cy="-12" r="2.2" fill="#333"/>
      <path d="M-3,-5 Q0,-2 3,-5" stroke="#333" stroke-width="2" fill="none"/>
    </g>
  </g>`;
}

/* ============================================================
   ПРЕДЛОГИ — КАРТОЧКИ
   ============================================================ */
function prepositionCardScene(type) {
  if (type === 'above') return pictureSceneDynamic(type);
  if (type === 'below') return thermometerScene(type);

  const boxBack = `<rect x="40" y="75" width="120" height="80" rx="4" fill="#3A2010" stroke="#7A4A20" stroke-width="3"/>`;
  const boxFront = `<rect x="40" y="105" width="120" height="55" rx="4" fill="#C89860" stroke="#7A4A20" stroke-width="3"/>
    <line x1="70" y1="105" x2="70" y2="160" stroke="#7A4A20" stroke-width="2" opacity="0.5"/>
    <line x1="130" y1="105" x2="130" y2="160" stroke="#7A4A20" stroke-width="2" opacity="0.5"/>`;
  const boxClosed = `<rect x="40" y="80" width="120" height="80" rx="4" fill="#C89860" stroke="#7A4A20" stroke-width="3"/>
    <rect x="40" y="80" width="120" height="14" fill="#8B5A2B" stroke="#7A4A20" stroke-width="2"/>`;

  const catFull = (cx, cy) => `<g transform="translate(${cx},${cy})">
    <ellipse cx="0" cy="18" rx="26" ry="18" fill="#FFB073" stroke="#E06A1E" stroke-width="3"/>
    <circle cx="0" cy="-10" r="18" fill="#FFB073" stroke="#E06A1E" stroke-width="3"/>
    <path d="M-14,-22 L-18,-42 L-4,-28 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="3"/>
    <path d="M14,-22 L18,-42 L4,-28 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="3"/>
    <circle cx="-6" cy="-10" r="2.5" fill="#333"/>
    <circle cx="6" cy="-10" r="3" fill="#333"/>
    <path d="M-4,-2 Q0,2 4,-2" stroke="#333" stroke-width="2" fill="none"/>
    <path d="M22,14 Q32,6 30,-10" stroke="#E06A1E" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </g>`;

  const catHead = (cx, cy) => `<g transform="translate(${cx},${cy})">
    <circle cx="0" cy="0" r="20" fill="#FFB073" stroke="#E06A1E" stroke-width="3"/>
    <path d="M-16,-12 L-20,-34 L-4,-18 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="3"/>
    <path d="M16,-12 L20,-34 L4,-18 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="3"/>
    <circle cx="-6" cy="0" r="2.5" fill="#333"/>
    <circle cx="6" cy="0" r="3" fill="#333"/>
    <path d="M-4,8 Q0,12 4,8" stroke="#333" stroke-width="2" fill="none"/>
  </g>`;

  // Мяч немного приплюснут (scale 1, 0.8), так как на нём стоит коробка
  const ball = (cx, cy) => `<g transform="translate(${cx},${cy}) scale(1, 0.8)">
    <circle cx="0" cy="0" r="22" fill="#FFF" stroke="#333" stroke-width="3"/>
    <circle cx="0" cy="0" r="8" fill="#333"/>
    <path d="M0,-22 L0,-8 M0,8 L0,22 M-22,0 L-8,0 M8,0 L22,0" stroke="#333" stroke-width="3"/>
  </g>`;

  let content = '';
  switch (type) {
    case 'in':
      content = boxBack + catHead(100, 95) + boxFront;
      break;
    case 'on':
      content = boxClosed + catFull(100, 45);
      break;
    case 'under':
      // Сначала рисуем мяч, потом коробку ПОВЕРХ него (коробка стоит на мяче)
      content = ball(100, 155) + `<g transform="translate(0, -20)">${boxClosed}</g>`;
      break;
    case 'next to':
      content = `<g transform="translate(-30, 0)">${boxClosed}</g>` + catFull(155, 115);
      break;
    case 'behind':
      content = catHead(100, 75) + boxClosed;
      break;
    case 'in front of':
      content = boxClosed + catFull(100, 160);
      break;
  }
  return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block;">${content}</svg>`;
}
function thermometerScene(type) {
  // Вертикальный градусник по центру
  const tube = `
    <rect x="88" y="20" width="24" height="130" rx="12"
          fill="#FFF" stroke="#333" stroke-width="3"/>
    <rect x="94" y="26" width="12" height="118" rx="6"
          fill="#E0E0E0" stroke="none"/>
  `;
  const bulb = `
    <circle cx="100" cy="160" r="16" fill="#E53935"
            stroke="#333" stroke-width="3"/>
    <circle cx="100" cy="160" r="10" fill="#FF7043"/>
  `;

  // Уровень жидкости зависит от предлога
  const isAbove = type === 'above';
  const fillTop = isAbove ? 40 : 100;
  const fillH   = isAbove ? 118 : 60;
  const liquid = `
    <rect x="94" y="${fillTop}" width="12" height="${fillH}" rx="6"
          fill="#E53935"/>
  `;

  // Деления
  const ticks = [40, 60, 80, 100, 120, 140].map(y =>
    `<line x1="82" y1="${y}" x2="88" y2="${y}"
           stroke="#333" stroke-width="2" stroke-linecap="round"/>`
  ).join('');

  // Красная стрелка-подсказка
  const arrow = isAbove
    ? `<polygon points="60,50 48,65 54,65 54,90 66,90 66,65 72,65"
                fill="#E53935" stroke="#333" stroke-width="1.5"/>`
    : `<polygon points="60,150 48,135 54,135 54,110 66,110 66,135 72,135"
                fill="#1E88E5" stroke="#333" stroke-width="1.5"/>`;


  return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet"
               style="width:100%;height:100%;display:block;">
    ${tube}${liquid}${bulb}${ticks}${arrow}
  </svg>`;
}
/* ============================================================
   Часть 3: itScene, pronounScene, SHAPE_COLORS, shapeSVG
   ============================================================ */

function itScene() {
  const sun = `
    <circle cx="160" cy="40" r="18" fill="#FFD700" stroke="#FFA000" stroke-width="2"/>
    <line x1="160" y1="14" x2="160" y2="6" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
    <line x1="160" y1="66" x2="160" y2="74" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
    <line x1="134" y1="40" x2="126" y2="40" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
    <line x1="186" y1="40" x2="194" y2="40" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
  `;
  const grass = `
    <rect x="0" y="170" width="200" height="30" fill="#A8E6A3"/>
    <path d="M0,170 Q50,160 100,170 Q150,180 200,170 L200,200 L0,200 Z" fill="#8BC34A"/>
  `;
  const cat = catSVG(100, 145);
  return sun + grass + cat + `<text x="100" y="195" font-size="14" text-anchor="middle" font-weight="bold" fill="#2E7BAE">it</text>`;
}

function pronounScene(type) {
  let content = '';
  const CX = 100, CY = 100;
  
  // Добавляем стили для увеличения и анимаций прямо в SVG
  const style = `<style>
    .scale-up { transform: scale(1.6) translate(-10px, -10px); }
    .anim-point-self { animation: pointSelf 1.5s infinite; transform-origin: 0px 0px; }
    .anim-point-away { animation: pointAway 1.5s infinite; transform-origin: 0px 0px; }
    .anim-hello { animation: helloWave 1.5s infinite; transform-origin: 10px 0px; }
    
    @keyframes pointSelf {
      0%, 100% { transform: scale(1.6) translate(-10px, -10px) rotate(0deg); }
      50% { transform: scale(1.6) translate(-5px, -12px) rotate(-5deg); }
    }
    @keyframes pointAway {
      0%, 100% { transform: scale(1.6) translate(-10px, -10px) rotate(0deg); }
      50% { transform: scale(1.6) translate(-15px, -10px) rotate(10deg); }
    }
    @keyframes helloWave {
      0%, 100% { transform: scale(1.6) translate(-10px, -10px) rotate(0deg); }
      25% { transform: scale(1.6) translate(-10px, -10px) rotate(5deg); }
      75% { transform: scale(1.6) translate(-10px, -10px) rotate(-5deg); }
    }
  </style>`;

  switch(type) {
    case 'I':
      // Показывает на себя
      content = `<g class="anim-point-self">${boySVG(50, 60, 'self', '#4FA8D8')}</g>`;
      content += `<text x="100" y="170" font-size="32" text-anchor="middle" font-weight="bold" fill="#2E7BAE">I</text>`;
      break;
    case 'you':
      // Указывает на зрителя (вправо) и машет
      content = `<g class="anim-point-away">${boySVG(50, 60, 'point', '#9C27B0')}</g>`;
      content += `<text x="100" y="170" font-size="32" text-anchor="middle" font-weight="bold" fill="#9C27B0">you</text>`;
      break;
    case 'he':
      // Просто машет
      content = `<g class="anim-hello">${boySVG(50, 60, 'wave', '#4CAF50')}</g>`;
      content += `<text x="100" y="170" font-size="32" text-anchor="middle" font-weight="bold" fill="#4CAF50">he</text>`;
      break;
    case 'she':
      content = `<g class="anim-hello">${girlSVG(50, 60, 'wave', '#E91E63')}</g>`;
      content += `<text x="100" y="170" font-size="32" text-anchor="middle" font-weight="bold" fill="#E91E63">she</text>`;
      break;
    case 'it':
      // Для кота тоже увеличиваем
      content = `<g transform="scale(1.3) translate(-20, -20)">${itScene()}</g>`;
      break;
    case 'we':
      content = `<g transform="scale(1.2) translate(-20, 0)">${boySVG(50, 80, 'wave', '#4FA8D8')}</g>`;
      content += `<g transform="scale(1.2) translate(20, 0)">${girlSVG(80, 80, 'wave', '#E91E63')}</g>`;
      content += `<text x="100" y="170" font-size="32" text-anchor="middle" font-weight="bold" fill="#2E7BAE">we</text>`;
      break;
    case 'they':
      content = `<g transform="scale(1.1) translate(-30, 10)">${boySVG(30, 70, 'idle', '#4CAF50')}</g>`;
      content += `<g transform="scale(1.1) translate(0, 0)">${girlSVG(70, 70, 'idle', '#E91E63')}</g>`;
      content += `<g transform="scale(1.1) translate(30, 10)">${boySVG(110, 70, 'idle', '#9C27B0')}</g>`;
      content += `<text x="100" y="170" font-size="32" text-anchor="middle" font-weight="bold" fill="#2E7BAE">they</text>`;
      break;
  }
  
  return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block;">${style}${content}</svg>`;
}

function shapeSVG(name, colorOverride) {
  const c = colorOverride || SHAPE_COLORS[name] || '#4FA8D8';
  const paths = {
    circle:    `<circle cx="50" cy="50" r="42" fill="${c}" stroke="#333" stroke-width="3"/>`,
    square:    `<rect x="10" y="10" width="80" height="80" rx="4" fill="${c}" stroke="#333" stroke-width="3"/>`,
    triangle:  `<polygon points="50,10 90,85 10,85" fill="${c}" stroke="#333" stroke-width="3" stroke-linejoin="round"/>`,
    rectangle: `<rect x="8" y="28" width="84" height="44" rx="4" fill="${c}" stroke="#333" stroke-width="3"/>`,
    star:      `<polygon points="50,8 61,38 93,38 67,58 78,88 50,70 22,88 33,58 7,38 39,38" fill="${c}" stroke="#333" stroke-width="2.5" stroke-linejoin="round"/>`,
    heart:     `<path d="M50 88 C 18 64, 6 38, 24 22 C 38 11, 50 24, 50 38 C 50 24, 62 11, 76 22 C 94 38, 82 64, 50 88 Z" fill="${c}" stroke="#333" stroke-width="3"/>`
  };
  return `<svg viewBox="0 0 100 100" style="width:100%;height:100%;display:block;">${paths[name] || paths.circle}</svg>`;
}
/* ============================================================
   Часть 4: animalBody, actionSceneSVG
   ============================================================ */

function animalBody(kind) {
  if (kind === 'cat') {
    return `<g>
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
      <circle cx="-22" cy="-18" r="20" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5"/>
      <path d="M-32,-30 L-36,-50 L-22,-36 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-14,-30 L-8,-50 L-4,-36 Z" fill="#FFB073" stroke="#E06A1E" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="-28" cy="-20" r="3" fill="#333"/>
      <circle cx="-16" cy="-20" r="3" fill="#333"/>
      <path d="M-26,-12 Q-22,-8 -18,-12" stroke="#333" stroke-width="2" fill="none"/>
      <path d="M30,0 Q42,-8 38,-22" stroke="#E06A1E" stroke-width="4" fill="none" stroke-linecap="round"/>
      <line x1="-12" y1="20" x2="-12" y2="36" stroke="#E06A1E" stroke-width="4" stroke-linecap="round"/>
      <line x1="12" y1="20" x2="12" y2="36" stroke="#E06A1E" stroke-width="4" stroke-linecap="round"/>
    </g>`;
  }
  if (kind === 'dog') {
    return `<g>
      <ellipse cx="0" cy="0" rx="36" ry="22" fill="#C89860" stroke="#7A4A20" stroke-width="2.5"/>
      <circle cx="-24" cy="-16" r="20" fill="#C89860" stroke="#7A4A20" stroke-width="2.5"/>
      <ellipse cx="-38" cy="-12" rx="7" ry="16" fill="#8B5A2B" stroke="#7A4A20" stroke-width="2"/>
      <ellipse cx="-10" cy="-12" rx="7" ry="16" fill="#8B5A2B" stroke="#7A4A20" stroke-width="2"/>
      <circle cx="-30" cy="-18" r="3" fill="#333"/>
      <circle cx="-18" cy="-18" r="3" fill="#333"/>
      <ellipse cx="-24" cy="-10" rx="6" ry="4" fill="#333"/>
      <path d="M32,0 Q44,-10 40,-24" stroke="#7A4A20" stroke-width="4" fill="none" stroke-linecap="round"/>
      <line x1="-12" y1="20" x2="-12" y2="36" stroke="#7A4A20" stroke-width="4" stroke-linecap="round"/>
      <line x1="12" y1="20" x2="12" y2="36" stroke="#7A4A20" stroke-width="4" stroke-linecap="round"/>
    </g>`;
  }
  if (kind === 'elephant') {
    return `<g>
      <ellipse cx="0" cy="0" rx="44" ry="30" fill="#9E9E9E" stroke="#555" stroke-width="2.5"/>
      <circle cx="-30" cy="-18" r="24" fill="#9E9E9E" stroke="#555" stroke-width="2.5"/>
      <ellipse cx="-50" cy="-18" rx="14" ry="22" fill="#BDBDBD" stroke="#555" stroke-width="2"/>
      <ellipse cx="-10" cy="-18" rx="14" ry="22" fill="#BDBDBD" stroke="#555" stroke-width="2"/>
      <path d="M-42,-4 Q-52,20 -38,28" stroke="#9E9E9E" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="-36" cy="-22" r="3.5" fill="#333"/>
      <circle cx="-22" cy="-22" r="3.5" fill="#333"/>
      <line x1="-16" y1="26" x2="-16" y2="44" stroke="#555" stroke-width="7" stroke-linecap="round"/>
      <line x1="16" y1="26" x2="16" y2="44" stroke="#555" stroke-width="7" stroke-linecap="round"/>
      <path d="M42,0 Q56,-8 50,-24" stroke="#555" stroke-width="4" fill="none" stroke-linecap="round"/>
    </g>`;
  }
  if (kind === 'bird') {
    return `<g>
      <ellipse cx="0" cy="0" rx="26" ry="18" fill="#4FA8D8" stroke="#1E5F8A" stroke-width="2.5"/>
      <circle cx="-20" cy="-14" r="14" fill="#4FA8D8" stroke="#1E5F8A" stroke-width="2.5"/>
      <polygon points="-34,-14 -46,-10 -34,-6" fill="#FFA000" stroke="#B36B00" stroke-width="1.5"/>
      <circle cx="-24" cy="-16" r="2.5" fill="#333"/>
      <path d="M20,-4 Q30,-20 18,-30 Q34,-22 28,-8 Z" fill="#7FC4E8" stroke="#1E5F8A" stroke-width="2"/>
      <line x1="-6" y1="16" x2="-6" y2="30" stroke="#B36B00" stroke-width="3" stroke-linecap="round"/>
      <line x1="8" y1="16" x2="8" y2="30" stroke="#B36B00" stroke-width="3" stroke-linecap="round"/>
    </g>`;
  }
  if (kind === 'fish') {
    return `<g>
      <ellipse cx="0" cy="0" rx="34" ry="18" fill="#FDD835" stroke="#B8860B" stroke-width="2.5"/>
      <polygon points="32,0 52,-18 52,18" fill="#FFB300" stroke="#B8860B" stroke-width="2"/>
      <circle cx="-18" cy="-4" r="4" fill="#333"/>
      <path d="M-10,-10 Q0,-2 -10,6" stroke="#B8860B" stroke-width="2" fill="none"/>
    </g>`;
  }
  return animalBody('cat');
}

function actionSceneSVG(animal, action) {
  const cls = 'act-' + action;
  let bg = '';
  let backExtra = '';
  let frontExtra = '';

  if (action === 'run') {
    bg = `<rect x="0" y="150" width="260" height="50" fill="#A8E6A3"/>`;
    backExtra = `<g class="scene-ground-run">
      <line x1="20"  y1="170" x2="45"  y2="170" stroke="#999" stroke-width="2" stroke-linecap="round"/>
      <line x1="80"  y1="170" x2="105" y2="170" stroke="#999" stroke-width="2" stroke-linecap="round"/>
      <line x1="140" y1="170" x2="165" y2="170" stroke="#999" stroke-width="2" stroke-linecap="round"/>
      <line x1="200" y1="170" x2="225" y2="170" stroke="#999" stroke-width="2" stroke-linecap="round"/>
    </g>`;
  } else if (action === 'walk') {
    bg = `<rect x="0" y="150" width="200" height="50" fill="#A8E6A3"/>`;
    backExtra = `<text x="30" y="180" font-size="14">👣</text><text x="160" y="180" font-size="14">👣</text>`;
  } else if (action === 'jump') {
    bg = `<rect x="0" y="150" width="200" height="50" fill="#A8E6A3"/>`;
    backExtra = `<path d="M30,180 Q60,140 100,180" stroke="#8BC34A" stroke-width="2" fill="none" stroke-dasharray="4 4"/>`;
  } else if (action === 'swim') {
    bg = `<rect x="0" y="110" width="200" height="90" fill="#7FD5FF"/>
          <path d="M0,130 Q30,120 60,130 Q90,140 120,130 Q150,120 180,130 L200,130 L200,200 L0,200 Z" fill="#4FC3F7" opacity="0.5"/>`;
    backExtra = `<text x="30" y="110" font-size="16">💧</text><text x="150" y="115" font-size="16">💧</text>`;
  } else if (action === 'dance') {
    bg = `<rect x="0" y="150" width="200" height="50" fill="#A8E6A3"/>`;
    backExtra = `<text x="30" y="70" font-size="20">🎵</text><text x="155" y="90" font-size="20">🎶</text><text x="80" y="55" font-size="16">🎵</text>`;
  } else if (action === 'eat') {
    bg = `<rect x="0" y="150" width="200" height="50" fill="#A8E6A3"/>`;
    frontExtra = `<text class="act-eat-food" x="66" y="118" font-size="22" text-anchor="middle">🍎</text>`;
  } else if (action === 'sleep') {
    bg = `<rect x="0" y="0" width="200" height="200" fill="#1A237E"/>
          <circle cx="160" cy="40" r="16" fill="#FFD700"/>
          <rect x="0" y="150" width="200" height="50" fill="#2E7D32"/>`;
    backExtra = `<text x="40" y="50" font-size="16">⭐</text><text x="70" y="30" font-size="12">⭐</text>
                 <text x="140" y="70" font-size="20">💤</text><text x="160" y="55" font-size="16">💤</text>`;
  } else if (action === 'read') {
    bg = `<rect x="0" y="150" width="200" height="50" fill="#A8E6A3"/>`;
    frontExtra = `<text x="80" y="138" font-size="20">📖</text>`;
  } else if (action === 'play') {
    bg = `<rect x="0" y="150" width="200" height="50" fill="#A8E6A3"/>`;
    frontExtra = `<text x="140" y="145" font-size="24">⚽</text>`;
  } else if (action === 'sing') {
    bg = `<rect x="0" y="150" width="200" height="50" fill="#A8E6A3"/>`;
    backExtra = `<text x="60" y="95" font-size="20">🎵</text><text x="45" y="75" font-size="16">🎶</text><text x="75" y="65" font-size="14">🎵</text>`;
  }

  const sun = (action !== 'sleep')
    ? `<circle cx="170" cy="30" r="16" fill="#FFD700" stroke="#FFA000" stroke-width="2"/>`
    : '';

  // ВАЖНО: убираем вложенный translate(100,110) — позиция задаётся
  // через transform-origin в CSS (100px 110px), а группа стоит в (0,0).
  return `<svg viewBox="0 0 200 200" style="width:100%;height:100%;display:block;">
    ${sun}
    ${bg}
    ${backExtra}
    <g class="${cls}">
      <g transform="translate(100,110)">${animalBody(animal)}</g>
    </g>
    ${frontExtra}
  </svg>`;
}
/* ============================================================
   Часть 5: SVG-сценки для грамматики (1/2)
   ============================================================ */

function grammarSceneBoy() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    ${boySVG(60, 45, 'idle', '#4FA8D8')}
  </svg>`;
}
function grammarSceneGirl() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    ${girlSVG(60, 45, 'idle', '#E91E63')}
  </svg>`;
}
function grammarSceneKids() {
  return `<svg viewBox="0 0 160 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="160" height="20" fill="#A8E6A3"/>
    ${boySVG(40, 45, 'wave', '#4FA8D8')}
    ${girlSVG(80, 45, 'wave', '#E91E63')}
    ${boySVG(120, 45, 'wave', '#9C27B0')}
  </svg>`;
}
function grammarSceneFamily() {
  return `<svg viewBox="0 0 180 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="180" height="20" fill="#A8E6A3"/>
    ${boySVG(45, 45, 'idle', '#4CAF50')}
    ${girlSVG(90, 45, 'idle', '#E91E63')}
    ${boySVG(135, 45, 'idle', '#FF8C42')}
  </svg>`;
}
function grammarSceneCat() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    ${catSVG(60, 75, 'sit')}
  </svg>`;
}
function grammarSceneDog() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    <g transform="translate(60,75)">${animalBody('dog')}</g>
  </svg>`;
}
function grammarSceneBall() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    <circle cx="60" cy="70" r="30" fill="#FFF" stroke="#333" stroke-width="3"/>
    <circle cx="60" cy="70" r="10" fill="#333"/>
    <path d="M60,40 L60,60" stroke="#333" stroke-width="3"/>
    <path d="M60,80 L60,100" stroke="#333" stroke-width="3"/>
    <path d="M30,70 L50,70" stroke="#333" stroke-width="3"/>
    <path d="M70,70 L90,70" stroke="#333" stroke-width="3"/>
  </svg>`;
}
function grammarSceneBook() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    <rect x="25" y="45" width="70" height="50" rx="4" fill="#FF8C42" stroke="#333" stroke-width="3"/>
    <line x1="35" y1="55" x2="85" y2="55" stroke="#FFF" stroke-width="3"/>
    <line x1="35" y1="65" x2="85" y2="65" stroke="#FFF" stroke-width="3"/>
    <line x1="35" y1="75" x2="70" y2="75" stroke="#FFF" stroke-width="3"/>
  </svg>`;
}
/* ============================================================
   Часть 6: SVG-сценки для грамматики (2/2)
   ============================================================ */

function grammarSceneSchool() {
  return `<svg viewBox="0 0 140 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="140" height="20" fill="#A8E6A3"/>
    <rect x="30" y="40" width="80" height="60" fill="#FFD54F" stroke="#333" stroke-width="3"/>
    <polygon points="70,10 20,40 120,40" fill="#E53935" stroke="#333" stroke-width="3"/>
    <rect x="55" y="65" width="30" height="35" fill="#8D6E63" stroke="#333" stroke-width="2"/>
    <rect x="40" y="50" width="15" height="15" fill="#7FD5FF" stroke="#333" stroke-width="2"/>
    <rect x="85" y="50" width="15" height="15" fill="#7FD5FF" stroke="#333" stroke-width="2"/>
  </svg>`;
}
function grammarSceneSun() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    <circle cx="60" cy="55" r="30" fill="#FFD700" stroke="#FFA000" stroke-width="3"/>
    <line x1="60" y1="10" x2="60" y2="0" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="60" y1="110" x2="60" y2="100" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="15" y1="55" x2="5" y2="55" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="115" y1="55" x2="105" y2="55" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="30" y1="25" x2="22" y2="17" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="90" y1="25" x2="98" y2="17" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="30" y1="85" x2="22" y2="93" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="90" y1="85" x2="98" y2="93" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}
function grammarSceneClock() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    <circle cx="60" cy="55" r="35" fill="#FFF" stroke="#333" stroke-width="4"/>
    <circle cx="60" cy="55" r="2" fill="#333"/>
    <line x1="60" y1="55" x2="60" y2="30" stroke="#333" stroke-width="4" stroke-linecap="round"/>
    <line x1="60" y1="55" x2="80" y2="60" stroke="#E53935" stroke-width="3" stroke-linecap="round"/>
    <line x1="25" y1="55" x2="30" y2="55" stroke="#333" stroke-width="2"/>
    <line x1="90" y1="55" x2="95" y2="55" stroke="#333" stroke-width="2"/>
    <line x1="60" y1="20" x2="60" y2="25" stroke="#333" stroke-width="2"/>
    <line x1="60" y1="85" x2="60" y2="90" stroke="#333" stroke-width="2"/>
  </svg>`;
}
function grammarSceneTV() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    <rect x="20" y="30" width="80" height="55" rx="6" fill="#333" stroke="#111" stroke-width="3"/>
    <rect x="28" y="38" width="64" height="39" rx="3" fill="#7FD5FF"/>
    <line x1="45" y1="95" x2="45" y2="85" stroke="#333" stroke-width="4"/>
    <line x1="75" y1="95" x2="75" y2="85" stroke="#333" stroke-width="4"/>
    <line x1="35" y1="95" x2="85" y2="95" stroke="#333" stroke-width="4"/>
  </svg>`;
}
function grammarSceneApple() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    <circle cx="60" cy="65" r="28" fill="#E53935" stroke="#8E0000" stroke-width="3"/>
    <path d="M60,40 Q60,30 68,28" stroke="#5D4037" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="70" cy="30" rx="8" ry="4" fill="#4CAF50" stroke="#2E7D32" stroke-width="1.5" transform="rotate(-30 70 30)"/>
  </svg>`;
}
function grammarSceneCatTwo() {
  return `<svg viewBox="0 0 160 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="160" height="20" fill="#A8E6A3"/>
    <g transform="translate(45,75) scale(0.75)">${animalBody('cat')}</g>
    <g transform="translate(115,75) scale(0.75)">${animalBody('cat')}</g>
  </svg>`;
}
function grammarSceneKidsMany() {
  return `<svg viewBox="0 0 180 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="180" height="20" fill="#A8E6A3"/>
    ${boySVG(40, 45, 'idle', '#4FA8D8')}
    ${girlSVG(75, 45, 'idle', '#E91E63')}
    ${boySVG(110, 45, 'idle', '#4CAF50')}
    ${girlSVG(145, 45, 'idle', '#FF8C42')}
  </svg>`;
}
function grammarSceneBus() {
  return `<svg viewBox="0 0 140 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="140" height="20" fill="#A8E6A3"/>
    <rect x="20" y="40" width="100" height="50" rx="6" fill="#FDD835" stroke="#333" stroke-width="3"/>
    <rect x="28" y="48" width="20" height="15" fill="#7FD5FF" stroke="#333" stroke-width="2"/>
    <rect x="52" y="48" width="20" height="15" fill="#7FD5FF" stroke="#333" stroke-width="2"/>
    <rect x="76" y="48" width="20" height="15" fill="#7FD5FF" stroke="#333" stroke-width="2"/>
    <rect x="100" y="48" width="15" height="15" fill="#7FD5FF" stroke="#333" stroke-width="2"/>
    <circle cx="40" cy="95" r="10" fill="#333"/>
    <circle cx="100" cy="95" r="10" fill="#333"/>
  </svg>`;
}
function grammarSceneBox() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    <rect x="25" y="45" width="70" height="55" rx="4" fill="#C89860" stroke="#7A4A20" stroke-width="3"/>
    <rect x="25" y="45" width="70" height="12" fill="#8B5A2B" stroke="#7A4A20" stroke-width="2"/>
    <line x1="35" y1="65" x2="35" y2="90" stroke="#7A4A20" stroke-width="2" opacity="0.5"/>
    <line x1="85" y1="65" x2="85" y2="90" stroke="#7A4A20" stroke-width="2" opacity="0.5"/>
  </svg>`;
}
function grammarSceneBaby() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    <circle cx="60" cy="55" r="25" fill="#FFDDB0" stroke="#333" stroke-width="2.5"/>
    <circle cx="60" cy="30" r="3" fill="#333"/>
    <circle cx="60" cy="25" r="2" fill="#333"/>
    <circle cx="60" cy="20" r="1.5" fill="#333"/>
    <circle cx="52" cy="52" r="3" fill="#333"/>
    <circle cx="68" cy="52" r="3" fill="#333"/>
    <path d="M55,62 Q60,66 65,62" stroke="#333" stroke-width="2" fill="none"/>
    <circle cx="48" cy="62" r="3" fill="#FF8A80" opacity="0.6"/>
    <circle cx="72" cy="62" r="3" fill="#FF8A80" opacity="0.6"/>
  </svg>`;
}
function grammarSceneMan() {
  return `<svg viewBox="0 0 100 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="100" height="20" fill="#A8E6A3"/>
    <g transform="translate(50,40)">${boySVG(0, 0, 'idle', '#4FA8D8')}</g>
  </svg>`;
}
function grammarSceneWoman() {
  return `<svg viewBox="0 0 100 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="100" height="20" fill="#A8E6A3"/>
    <g transform="translate(50,40)">${girlSVG(0, 0, 'idle', '#E91E63')}</g>
  </svg>`;
}
function grammarSceneMouse() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    <ellipse cx="60" cy="70" rx="25" ry="18" fill="#9E9E9E" stroke="#555" stroke-width="2.5"/>
    <circle cx="45" cy="55" r="12" fill="#9E9E9E" stroke="#555" stroke-width="2.5"/>
    <circle cx="55" cy="55" r="12" fill="#9E9E9E" stroke="#555" stroke-width="2.5"/>
    <circle cx="45" cy="55" r="7" fill="#FFB3B3"/>
    <circle cx="55" cy="55" r="7" fill="#FFB3B3"/>
    <circle cx="42" cy="68" r="2.5" fill="#333"/>
    <circle cx="52" cy="68" r="2.5" fill="#333"/>
    <path d="M85,70 Q100,65 95,55" stroke="#555" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`;
}
function grammarSceneFeet() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#A8E6A3"/>
    <ellipse cx="45" cy="75" rx="12" ry="22" fill="#FFDDB0" stroke="#333" stroke-width="2.5"/>
    <ellipse cx="75" cy="75" rx="12" ry="22" fill="#FFDDB0" stroke="#333" stroke-width="2.5"/>
    <circle cx="40" cy="58" r="4" fill="#FFDDB0" stroke="#333" stroke-width="1.5"/>
    <circle cx="45" cy="56" r="4" fill="#FFDDB0" stroke="#333" stroke-width="1.5"/>
    <circle cx="50" cy="58" r="4" fill="#FFDDB0" stroke="#333" stroke-width="1.5"/>
    <circle cx="70" cy="58" r="4" fill="#FFDDB0" stroke="#333" stroke-width="1.5"/>
    <circle cx="75" cy="56" r="4" fill="#FFDDB0" stroke="#333" stroke-width="1.5"/>
    <circle cx="80" cy="58" r="4" fill="#FFDDB0" stroke="#333" stroke-width="1.5"/>
  </svg>`;
}
function grammarSceneFish() {
  return `<svg viewBox="0 0 120 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="120" height="20" fill="#7FD5FF"/>
    <g transform="translate(60,65)">${animalBody('fish')}</g>
  </svg>`;
}
function grammarSceneHome() {
  return `<svg viewBox="0 0 140 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="140" height="20" fill="#A8E6A3"/>
    <rect x="35" y="50" width="70" height="50" fill="#FFD54F" stroke="#333" stroke-width="3"/>
    <polygon points="70,20 25,50 115,50" fill="#E53935" stroke="#333" stroke-width="3"/>
    <rect x="60" y="70" width="20" height="30" fill="#8D6E63" stroke="#333" stroke-width="2"/>
  </svg>`;
}
function grammarSceneHello() {
  return `<svg viewBox="0 0 140 120" style="width:100%;height:100%;display:block;">
    <rect x="0" y="100" width="140" height="20" fill="#A8E6A3"/>
    <g transform="translate(50,45)">${boySVG(0,0,'wave','#4CAF50')}</g>
    <text x="100" y="55" font-size="16" font-weight="bold" fill="#FF8C42">Hello!</text>
  </svg>`;
}
function thermoSceneDynamic(prep) {
  const isAbove = prep === 'above';

  const tube = `
    <rect x="88" y="30" width="24" height="150" rx="12"
          fill="#FFF" stroke="#333" stroke-width="3"/>
    <rect x="94" y="36" width="12" height="138" rx="6"
          fill="#E0E0E0"/>
  `;
  const bulb = `
    <circle cx="100" cy="185" r="18" fill="#E53935"
            stroke="#333" stroke-width="3"/>
    <circle cx="100" cy="185" r="11" fill="#FF7043"/>
  `;

  const fillTop = isAbove ? 50 : 110;
  const fillH   = isAbove ? 130 : 70;
  const liquidClass = isAbove ? 'mercury-rise' : 'mercury-fall';
  const liquid = `
    <rect class="${liquidClass}"
          x="94" y="${fillTop}" width="12" height="${fillH}" rx="6"
          fill="#E53935"/>
  `;

  const ticks = [50, 70, 90, 110, 130, 150, 170].map(y =>
    `<line x1="82" y1="${y}" x2="88" y2="${y}"
           stroke="#333" stroke-width="2" stroke-linecap="round"/>
     <text x="78" y="${y + 4}" font-size="8" text-anchor="end"
           fill="#333">${(y - 30) / 10}</text>`
  ).join('');

  const arrowClass = isAbove ? 'arrow-bounce-up' : 'arrow-bounce-down';
  const arrowFill  = isAbove ? '#E53935' : '#1E88E5';
  const arrow = isAbove
    ? `<g class="${arrowClass}" style="transform-origin:60px 70px;">
         <polygon points="60,50 48,65 54,65 54,90 66,90 66,65 72,65"
                  fill="${arrowFill}" stroke="#333" stroke-width="1.5"/>
       </g>`
    : `<g class="${arrowClass}" style="transform-origin:60px 140px;">
         <polygon points="60,150 48,135 54,135 54,110 66,110 66,135 72,135"
                  fill="${arrowFill}" stroke="#333" stroke-width="1.5"/>
       </g>`;

  // Вместо кота — просто рисуем нейтральную иконку "измерения"
  // Убираем и текст, и кота, оставляя только саму сцену.

  return `<svg viewBox="0 0 200 220" preserveAspectRatio="xMidYMid meet"
               style="width:100%;height:100%;display:block;">
    ${tube}
    ${liquid}
    ${bulb}
    ${ticks}
    ${arrow}
  </svg>`;
}
/* ============================================================
   Часть 7: детальные SVG-сцены для глаголов eat / read
   ============================================================ */

function catEatingScene() {
  return `<svg viewBox="0 0 800 460" preserveAspectRatio="xMidYMid meet"
               role="img" aria-label="Рыжий кот ест из миски"
               style="width:100%;height:100%;display:block;">
    <ellipse cx="150" cy="75" rx="55" ry="18" fill="white" opacity=".8"/>
    <ellipse cx="590" cy="90" rx="70" ry="20" fill="white" opacity=".8"/>

    <path d="M0 345 Q200 325 400 345 T800 340 V460 H0Z" fill="#a5ca72"/>

    <!-- Хвост -->
    <g class="scene-eat-tail">
      <path d="M220 258 C145 265 130 195 176 175 C207 162 227 190 209 207"
            fill="none" stroke="#e97824" stroke-width="27" stroke-linecap="round"/>
      <path d="M220 258 C145 265 130 195 176 175"
            fill="none" stroke="#f49a3d" stroke-width="17" stroke-linecap="round"/>
    </g>

    <!-- Тело -->
    <ellipse class="scene-eat-body" cx="315" cy="260" rx="135" ry="78" fill="#ed812b"/>

    <path d="M235 207 Q250 180 267 190 L279 207 M315 188 L329 205 M365 190 L375 210"
          fill="none" stroke="#c95e1d" stroke-width="8" stroke-linecap="round"/>

    <!-- Лапы -->
    <path d="M240 302 L232 350 Q230 363 250 363 H278"
          fill="none" stroke="#e97824" stroke-width="23" stroke-linecap="round"/>
    <path d="M335 312 L337 351 Q338 364 357 364 H375"
          fill="none" stroke="#e97824" stroke-width="23" stroke-linecap="round"/>
    <path d="M390 300 L405 350 Q408 362 428 360"
          fill="none" stroke="#e97824" stroke-width="22" stroke-linecap="round"/>
    <path d="M430 295 L448 346 Q452 357 468 354"
          fill="none" stroke="#e97824" stroke-width="22" stroke-linecap="round"/>

    <!-- Голова -->
    <g class="scene-eat-head">
      <circle cx="433" cy="285" r="58" fill="#f08a32"/>
      <path d="M390 247 L389 198 L426 231Z" fill="#e97824"/>
      <path d="M445 233 L474 200 L478 253Z" fill="#e97824"/>
      <path d="M398 231 L397 211 L414 233Z" fill="#f5b0a0"/>
      <path d="M453 236 L469 215 L468 245Z" fill="#f5b0a0"/>

      <path d="M420 287 Q432 278 444 287 Q438 300 432 300 Q425 300 420 287Z" fill="#fff0d8"/>
      <path d="M446 286 Q458 278 468 287 Q463 300 455 300 Q449 299 446 286Z" fill="#fff0d8"/>

      <path d="M440 286 L447 286 L443 292Z" fill="#a84b50"/>
      <path d="M443 292 Q440 300 434 299 M443 292 Q447 300 453 299"
            fill="none" stroke="#78412d" stroke-width="2.5" stroke-linecap="round"/>

      <path d="M407 270 Q416 277 424 270 M454 267 Q462 274 470 267"
            fill="none" stroke="#633b28" stroke-width="3" stroke-linecap="round"/>

      <path d="M426 236 L430 249 M439 232 L441 247 M452 236 L451 249"
            stroke="#c95e1d" stroke-width="4" stroke-linecap="round"/>
    </g>

    <!-- Миска -->
    <ellipse cx="520" cy="353" rx="76" ry="18" fill="#fff0d8"/>
    <path d="M444 353 Q451 410 520 410 Q589 410 596 353Z" fill="#5d9bd3"/>
    <ellipse cx="520" cy="353" rx="76" ry="18" fill="#83b8e8"/>
    <ellipse cx="520" cy="353" rx="61" ry="10" fill="#8b5a36"/>
    <path d="M466 379 Q520 395 574 379"
          fill="none" stroke="#a8d4f4" stroke-width="5" stroke-linecap="round"/>

    <circle cx="477" cy="347" r="3" fill="#f2cf77"/>
    <circle cx="490" cy="350" r="2.5" fill="#f2cf77"/>
  </svg>`;
}

function catReadingScene() {
  return `<svg viewBox="0 0 800 460" preserveAspectRatio="xMidYMid meet"
               role="img" aria-label="Рыжий кот читает книгу"
               style="width:100%;height:100%;display:block;">
    <ellipse cx="150" cy="75" rx="55" ry="18" fill="white" opacity=".8"/>
    <ellipse cx="620" cy="90" rx="70" ry="20" fill="white" opacity=".8"/>

    <path d="M0 345 Q200 325 400 345 T800 340 V460 H0Z" fill="#a5ca72"/>

    <!-- Хвост -->
    <g class="scene-read-tail">
      <path d="M280 300 C210 330 170 270 193 230 C208 204 240 218 232 242"
            fill="none" stroke="#e97824" stroke-width="28" stroke-linecap="round"/>
      <path d="M280 300 C210 330 170 270 193 230"
            fill="none" stroke="#f49a3d" stroke-width="17" stroke-linecap="round"/>
    </g>

    <!-- Тело -->
    <ellipse class="scene-read-body" cx="390" cy="300" rx="145" ry="92" fill="#ed812b"/>

    <path d="M300 235 Q315 215 330 232 M365 214 L372 235 M430 215 L437 236 M475 235 L487 253"
          fill="none" stroke="#c95e1d" stroke-width="8" stroke-linecap="round"/>

    <path d="M300 332 L293 365 Q292 375 313 375 H340"
          fill="none" stroke="#e97824" stroke-width="24" stroke-linecap="round"/>
    <path d="M455 332 L463 365 Q466 375 486 375 H509"
          fill="none" stroke="#e97824" stroke-width="24" stroke-linecap="round"/>

    <!-- Голова -->
    <g class="scene-read-head">
      <circle cx="380" cy="185" r="68" fill="#f08a32"/>
      <path d="M326 148 L322 92 L367 132Z" fill="#e97824"/>
      <path d="M395 132 L443 94 L432 157Z" fill="#e97824"/>
      <path d="M334 132 L331 108 L354 133Z" fill="#f5b0a0"/>
      <path d="M407 133 L431 113 L425 143Z" fill="#f5b0a0"/>

      <path d="M365 126 L369 142 M381 121 L382 139 M398 126 L395 142"
            stroke="#c95e1d" stroke-width="5" stroke-linecap="round"/>

      <ellipse cx="357" cy="177" rx="6" ry="8" fill="#46362c"/>
      <ellipse cx="403" cy="177" rx="6" ry="8" fill="#46362c"/>

      <g fill="none" stroke="#5b4736" stroke-width="3">
        <circle cx="357" cy="177" r="17"/>
        <circle cx="403" cy="177" r="17"/>
        <path d="M374 176 Q380 172 386 176"/>
        <path d="M340 174 L330 171 M420 174 L431 171"/>
      </g>

      <ellipse cx="371" cy="202" rx="18" ry="13" fill="#fff0d8"/>
      <ellipse cx="394" cy="202" rx="18" ry="13" fill="#fff0d8"/>
      <path d="M378 197 L389 197 L383.5 204Z" fill="#a84b50"/>
      <path d="M384 204 Q379 211 374 208 M384 204 Q389 211 394 208"
            fill="none" stroke="#78412d" stroke-width="2.5" stroke-linecap="round"/>

      <path d="M352 202 L326 197 M353 208 L329 211 M411 202 L437 197 M410 208 L434 211"
            fill="none" stroke="#78412d" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Лапы -->
    <path d="M329 300 Q345 285 365 306" fill="none" stroke="#e97824" stroke-width="19" stroke-linecap="round"/>
    <path d="M442 306 Q461 286 477 301" fill="none" stroke="#e97824" stroke-width="19" stroke-linecap="round"/>

    <!-- Книга -->
    <path d="M300 285 Q350 267 390 291 V365 Q348 343 300 358Z" fill="#fff5dc"/>
    <path d="M390 291 Q430 267 480 285 V358 Q432 343 390 365Z" fill="#fffaf0"/>
    <path d="M390 291 V365" stroke="#c7a978" stroke-width="3"/>

    <g stroke="#c9b997" stroke-width="2" opacity=".8">
      <path d="M316 302 Q347 293 373 304"/>
      <path d="M316 316 Q347 307 373 318"/>
      <path d="M316 330 Q347 321 373 332"/>
      <path d="M406 304 Q432 293 464 302"/>
      <path d="M406 318 Q432 307 464 316"/>
      <path d="M406 332 Q432 321 464 330"/>
    </g>

    <!-- Перелистываемая страница -->
    <g class="scene-read-page">
      <path d="M390 291 Q430 267 480 285 V358 Q432 343 390 365Z" fill="#fffdf5"/>
      <path d="M406 304 Q432 293 464 302 M406 318 Q432 307 464 316"
            fill="none" stroke="#c9b997" stroke-width="2"/>
    </g>
  </svg>`;
}
/* Добавьте это в конец файла js/svg-characters.js */

function pictureSceneDynamic(prep) {
  const box = `
    <rect x="50" y="120" width="100" height="60" rx="4" fill="#C89860" stroke="#7A4A20" stroke-width="3"/>
    <rect x="50" y="120" width="100" height="12" fill="#8B5A2B" stroke="#7A4A20" stroke-width="2"/>
    <line x1="70" y1="135" x2="70" y2="180" stroke="#7A4A20" stroke-width="2" opacity="0.5"/>
    <line x1="130" y1="135" x2="130" y2="180" stroke="#7A4A20" stroke-width="2" opacity="0.5"/>
  `;

  const picture = `
    <rect x="60" y="30" width="80" height="60" fill="#FFF" stroke="#5D4037" stroke-width="6"/>
    <rect x="68" y="38" width="64" height="44" fill="#7FD5FF"/>
    <circle cx="85" cy="55" r="8" fill="#FFD700"/>
    <path d="M68 75 L90 60 L110 75 L132 65 V82 H68 Z" fill="#4CAF50"/>
  `;

  const nail = `<circle cx="100" cy="25" r="3" fill="#333"/>`;
  const string = `<path d="M100 25 L70 30 M100 25 L130 30" stroke="#777" stroke-width="1.5"/>`;

  return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block;">
    <rect x="20" y="20" width="160" height="160" fill="#F0F4F8" rx="10"/>
    ${box}
    ${nail}
    ${string}
    ${picture}
  </svg>`;
}