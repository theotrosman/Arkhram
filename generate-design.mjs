import sharp from 'sharp';
import fs from 'fs';

const W = 1920, H = 1080;

function grid(cols, rows, op = 0.08) {
  let l = '';
  const cw = W/cols, rh = H/rows;
  for (let i = 0; i <= cols; i++) l += `<line x1="${i*cw}" y1="0" x2="${i*cw}" y2="${H}" stroke="#7c3aed" stroke-width="0.5" opacity="${op}"/>`;
  for (let i = 0; i <= rows; i++) l += `<line x1="0" y1="${i*rh}" x2="${W}" y2="${i*rh}" stroke="#7c3aed" stroke-width="0.5" opacity="${op}"/>`;
  return l;
}

function dots(cols, rows, nth = 4) {
  let d = '';
  const cw = W/cols, rh = H/rows;
  for (let i = 0; i <= cols; i += nth)
    for (let j = 0; j <= rows; j += nth)
      d += `<circle cx="${i*cw}" cy="${j*rh}" r="1.5" fill="#8b5cf6" opacity="0.30"/>`;
  return d;
}

function rings(cx, cy, n, base, step) {
  let r = '';
  for (let i = 0; i < n; i++) {
    const rad = base + i*step;
    const op = Math.max(0.35 - i*0.035, 0.04);
    const sw = Math.max(1.5 - i*0.12, 0.4);
    r += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="#8b5cf6" stroke-width="${sw}" opacity="${op}"/>`;
  }
  return r;
}

function arc(cx, cy, r, s, e, col, sw=1, op=0.5) {
  const a = s*Math.PI/180, b = e*Math.PI/180;
  const x1=cx+r*Math.cos(a), y1=cy+r*Math.sin(a), x2=cx+r*Math.cos(b), y2=cy+r*Math.sin(b);
  return `<path d="M${x1},${y1} A${r},${r} 0 ${e-s>180?1:0},1 ${x2},${y2}" fill="none" stroke="${col}" stroke-width="${sw}" opacity="${op}"/>`;
}

function lbl(x, y, t, a='start', op=0.40) {
  return `<text x="${x}" y="${y}" fill="#a78bfa" font-family="'Courier New',monospace" font-size="10" text-anchor="${a}" opacity="${op}" letter-spacing="3">${t}</text>`;
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <filter id="gblur"><feGaussianBlur stdDeviation="90"/></filter>
  <filter id="mblur"><feGaussianBlur stdDeviation="45"/></filter>
  <filter id="sblur"><feGaussianBlur stdDeviation="3"/></filter>
  <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#6d28d9" stop-opacity="0.55"/>
    <stop offset="100%" stop-color="#6d28d9" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="rg2" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#4338ca" stop-opacity="0.40"/>
    <stop offset="100%" stop-color="#4338ca" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="rg3" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.20"/>
    <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="vig" cx="50%" cy="50%" r="70%">
    <stop offset="0%" stop-color="#050505" stop-opacity="0"/>
    <stop offset="100%" stop-color="#050505" stop-opacity="0.82"/>
  </radialGradient>
  <linearGradient id="textgrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#c4b5fd"/>
    <stop offset="50%" stop-color="#ffffff"/>
    <stop offset="100%" stop-color="#a78bfa"/>
  </linearGradient>
</defs>

<!-- BG -->
<rect width="${W}" height="${H}" fill="#060608"/>

<!-- Glow orbs -->
<ellipse cx="340" cy="320" rx="480" ry="420" fill="url(#rg1)" filter="url(#gblur)"/>
<ellipse cx="1620" cy="760" rx="440" ry="380" fill="url(#rg2)" filter="url(#gblur)"/>
<ellipse cx="960" cy="540" rx="700" ry="500" fill="url(#rg3)" filter="url(#mblur)"/>

<!-- Grid -->
${grid(48, 27, 0.10)}
${dots(48, 27, 3)}

<!-- Rings - center -->
${rings(960, 540, 9, 55, 88)}
<!-- Rings - left -->
${rings(160, 540, 6, 40, 58)}
<!-- Rings - right -->
${rings(1760, 540, 6, 40, 58)}

<!-- Arcs -->
${arc(960, 540, 380, -45, 55, '#8b5cf6', 1.2, 0.38)}
${arc(960, 540, 380, 110, 220, '#6d28d9', 1.0, 0.28)}
${arc(960, 540, 240, 190, 340, '#a78bfa', 0.8, 0.22)}
${arc(960, 540, 520, 5, 85, '#7c3aed', 0.7, 0.18)}
${arc(960, 540, 520, 160, 265, '#5b21b6', 0.7, 0.14)}
${arc(960, 540, 650, -20, 40, '#4c1d95', 0.5, 0.10)}

<!-- Connection lines -->
<line x1="160" y1="540" x2="580" y2="540" stroke="#8b5cf6" stroke-width="0.8" opacity="0.38" stroke-dasharray="5,10"/>
<line x1="1340" y1="540" x2="1760" y2="540" stroke="#8b5cf6" stroke-width="0.8" opacity="0.38" stroke-dasharray="5,10"/>
<line x1="160" y1="540" x2="960" y2="180" stroke="#6d28d9" stroke-width="0.5" opacity="0.22"/>
<line x1="1760" y1="540" x2="960" y2="900" stroke="#6d28d9" stroke-width="0.5" opacity="0.18"/>
<line x1="960" y1="0" x2="960" y2="${H}" stroke="#7c3aed" stroke-width="0.3" opacity="0.12"/>
<line x1="0" y1="540" x2="${W}" y2="540" stroke="#7c3aed" stroke-width="0.3" opacity="0.10"/>

<!-- Secondary nodes -->
<line x1="480" y1="270" x2="960" y2="540" stroke="#5b21b6" stroke-width="0.5" opacity="0.20" stroke-dasharray="3,14"/>
<line x1="1440" y1="270" x2="960" y2="540" stroke="#5b21b6" stroke-width="0.5" opacity="0.20" stroke-dasharray="3,14"/>
<line x1="480" y1="810" x2="960" y2="540" stroke="#5b21b6" stroke-width="0.5" opacity="0.16" stroke-dasharray="3,14"/>
<line x1="1440" y1="810" x2="960" y2="540" stroke="#5b21b6" stroke-width="0.5" opacity="0.16" stroke-dasharray="3,14"/>

<!-- Node circles - secondary -->
<circle cx="480" cy="270" r="4" fill="#7c3aed" opacity="0.60"/>
<circle cx="480" cy="270" r="1.5" fill="#ddd6fe" opacity="0.90"/>
<circle cx="1440" cy="270" r="4" fill="#7c3aed" opacity="0.60"/>
<circle cx="1440" cy="270" r="1.5" fill="#ddd6fe" opacity="0.90"/>
<circle cx="480" cy="810" r="3.5" fill="#6d28d9" opacity="0.55"/>
<circle cx="480" cy="810" r="1.5" fill="#ddd6fe" opacity="0.85"/>
<circle cx="1440" cy="810" r="3.5" fill="#6d28d9" opacity="0.55"/>
<circle cx="1440" cy="810" r="1.5" fill="#ddd6fe" opacity="0.85"/>

<!-- Node circles - main -->
<circle cx="160" cy="540" r="7" fill="#8b5cf6" opacity="0.75"/>
<circle cx="160" cy="540" r="3" fill="#ede9fe" opacity="1"/>
<circle cx="160" cy="540" r="18" fill="none" stroke="#7c3aed" stroke-width="0.8" opacity="0.35"/>
<circle cx="1760" cy="540" r="7" fill="#8b5cf6" opacity="0.75"/>
<circle cx="1760" cy="540" r="3" fill="#ede9fe" opacity="1"/>
<circle cx="1760" cy="540" r="18" fill="none" stroke="#7c3aed" stroke-width="0.8" opacity="0.35"/>
<circle cx="960" cy="540" r="12" fill="#7c3aed" opacity="0.95"/>
<circle cx="960" cy="540" r="4" fill="#f5f3ff" opacity="1"/>
<circle cx="960" cy="540" r="28" fill="none" stroke="#8b5cf6" stroke-width="1.2" opacity="0.45"/>
<circle cx="960" cy="540" r="48" fill="none" stroke="#6d28d9" stroke-width="0.6" opacity="0.28"/>

<!-- Tick marks on outer ring -->
${Array.from({length:24}, (_,i) => {
  const a = i*15*Math.PI/180;
  const r1=380, r2=392;
  const x1=960+r1*Math.cos(a), y1=540+r1*Math.sin(a);
  const x2=960+r2*Math.cos(a), y2=540+r2*Math.sin(a);
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#7c3aed" stroke-width="${i%6===0?1.2:0.5}" opacity="${i%6===0?0.50:0.22}"/>`;
}).join('')}

<!-- Main title -->
<text x="960" y="522"
  fill="url(#textgrad)"
  font-family="'Courier New',monospace"
  font-size="140"
  font-weight="bold"
  text-anchor="middle"
  letter-spacing="28"
  opacity="0.96">ARKHRAM</text>

<!-- Subtitle -->
<text x="960" y="578"
  fill="#8b5cf6"
  font-family="'Courier New',monospace"
  font-size="11.5"
  text-anchor="middle"
  letter-spacing="9"
  opacity="0.70">INTELLIGENCE · AUTOMATION · PROTOCOL</text>

<!-- Thin rule under subtitle -->
<line x1="760" y1="596" x2="1160" y2="596" stroke="#7c3aed" stroke-width="0.4" opacity="0.35"/>

<!-- Labels -->
${lbl(60, 52, 'SYS://ARKHRAM.ORG', 'start', 0.32)}
${lbl(W-60, 52, 'VERSION 2.0 · 2025', 'end', 0.25)}
${lbl(60, H-36, '© ARKHRAM · ALL SYSTEMS NOMINAL', 'start', 0.22)}
${lbl(W-60, H-36, 'NODE:CENTRAL · STATUS:ACTIVE', 'end', 0.25)}
${lbl(136, 562, 'NODE.A', 'end', 0.30)}
${lbl(1784, 562, 'NODE.B', 'start', 0.30)}
${lbl(975, 182, 'VERTEX.0', 'start', 0.24)}
${lbl(975, 908, 'VERTEX.π', 'start', 0.24)}

<!-- Cross markers -->
<line x1="954" y1="180" x2="966" y2="180" stroke="#a78bfa" stroke-width="0.9" opacity="0.40"/>
<line x1="960" y1="174" x2="960" y2="186" stroke="#a78bfa" stroke-width="0.9" opacity="0.40"/>
<line x1="954" y1="900" x2="966" y2="900" stroke="#a78bfa" stroke-width="0.9" opacity="0.34"/>
<line x1="960" y1="894" x2="960" y2="906" stroke="#a78bfa" stroke-width="0.9" opacity="0.34"/>

<!-- Corner arcs -->
${arc(0, 0, 100, 0, 90, '#4c1d95', 0.7, 0.22)}
${arc(W, 0, 100, 90, 180, '#4c1d95', 0.7, 0.22)}
${arc(0, H, 100, -90, 0, '#4c1d95', 0.7, 0.20)}
${arc(W, H, 100, 180, 270, '#4c1d95', 0.7, 0.20)}
${arc(0, 0, 60, 0, 90, '#7c3aed', 0.4, 0.16)}
${arc(W, 0, 60, 90, 180, '#7c3aed', 0.4, 0.16)}

<!-- Horizontal rule accents -->
<line x1="80" y1="80" x2="360" y2="80" stroke="#7c3aed" stroke-width="0.5" opacity="0.25"/>
<line x1="${W-360}" y1="80" x2="${W-80}" y2="80" stroke="#7c3aed" stroke-width="0.5" opacity="0.25"/>
<line x1="80" y1="${H-80}" x2="360" y2="${H-80}" stroke="#7c3aed" stroke-width="0.4" opacity="0.22"/>
<line x1="${W-360}" y1="${H-80}" x2="${W-80}" y2="${H-80}" stroke="#7c3aed" stroke-width="0.4" opacity="0.22"/>

<!-- Vignette -->
<rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;

const buf = Buffer.from(svg);
await sharp(buf, { density: 144 }).png({ quality: 100 }).toFile('./arkhram-design.png');

const dest = 'C:/Users/knk/AppData/Roaming/Claude/local-agent-mode-sessions/skills-plugin/9c3eaa50-fd79-488e-ad9f-d0b347b7a0e8/4121bb34-0147-4d6c-b96e-4b7e68de4e1d/skills/canvas-design/arkhram-design.png';
fs.writeFileSync(dest, fs.readFileSync('./arkhram-design.png'));
console.log('Done:', fs.statSync('./arkhram-design.png').size, 'bytes');
