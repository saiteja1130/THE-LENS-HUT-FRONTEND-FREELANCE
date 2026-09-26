/**
 * Visual assets and vector optical renders for The Lens Hut.
 * Guarantees zero broken images with high-fidelity optical product rendering.
 */

// Generate a high-resolution SVG Data URI of optical frames with studio lighting
export function generateEyewearSvg({
  type = 'round',
  color = '#14232E',
  lensTint = 'rgba(215, 235, 250, 0.45)',
  accentColor = '#B8860B',
  polarized = false
}) {
  let content = '';
  if (type === 'contact') {
    content = `
      <!-- Contact Lens Blister Pack & Hydrogel Lens -->
      <defs>
        <radialGradient id="lensGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#E0F2FE" stop-opacity="0.9"/>
          <stop offset="60%" stop-color="#38BDF8" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#0284C7" stop-opacity="0.8"/>
        </radialGradient>
        <linearGradient id="foilGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F1F5F9"/>
          <stop offset="50%" stop-color="#E2E8F0"/>
          <stop offset="100%" stop-color="#CBD5E1"/>
        </linearGradient>
      </defs>
      <!-- Blister Foil Pack -->
      <rect x="140" y="80" width="320" height="240" rx="24" fill="url(#foilGrad)" stroke="#94A3B8" stroke-width="2"/>
      <rect x="155" y="95" width="290" height="70" rx="14" fill="#14232E"/>
      <text x="180" y="138" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="20" letter-spacing="1.5">THE LENS HUT</text>
      <text x="180" y="154" fill="#38BDF8" font-family="sans-serif" font-size="12">AQUA-HYDRO DAILY DISPOSABLE</text>
      <circle cx="300" cy="225" r="50" fill="#F5F6F7" stroke="#CBD5E1" stroke-width="3"/>
      <!-- Soft Contact Lens Floating -->
      <circle cx="300" cy="225" r="38" fill="url(#lensGrad)"/>
      <ellipse cx="290" cy="215" rx="16" ry="8" fill="#FFFFFF" opacity="0.6"/>
      <text x="245" y="295" fill="#64748B" font-family="sans-serif" font-size="11" font-weight="600">BC: 8.6 | DIA: 14.2 | -2.50D</text>
    `;
  } else if (type === 'cleaner') {
    content = `
      <!-- Lens Cleaner Spray & Microfiber Cloth -->
      <defs>
        <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#14232E"/>
          <stop offset="70%" stop-color="#1E3445"/>
          <stop offset="100%" stop-color="#0F1A22"/>
        </linearGradient>
      </defs>
      <!-- Spray Bottle -->
      <rect x="230" y="70" width="40" height="30" rx="4" fill="#94A3B8"/>
      <rect x="240" y="50" width="20" height="20" rx="2" fill="#64748B"/>
      <rect x="260" y="55" width="25" height="10" rx="3" fill="#64748B"/>
      <rect x="200" y="100" width="100" height="220" rx="18" fill="url(#bottleGrad)"/>
      <rect x="210" y="150" width="80" height="110" rx="6" fill="#FFFFFF"/>
      <text x="220" y="180" fill="#E4232C" font-family="sans-serif" font-weight="bold" font-size="12">LENS HUT</text>
      <text x="220" y="196" fill="#14232E" font-family="sans-serif" font-weight="bold" font-size="9">ANTI-FOG</text>
      <text x="220" y="210" fill="#64748B" font-family="sans-serif" font-size="8">LENS CLEANSER</text>
      <!-- Folded Premium Microfiber Cloth -->
      <polygon points="320,240 450,220 420,320 290,310" fill="#E4232C" opacity="0.95"/>
      <polygon points="330,245 440,228 415,310 305,302" fill="#C81921"/>
      <text x="340" y="275" fill="#FFFFFF" font-family="sans-serif" font-weight="600" font-size="12">THE LENS HUT</text>
    `;
  } else if (type === 'aviator') {
    content = `
      <defs>
        <linearGradient id="lensA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${lensTint}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="${polarized ? '#0B1720' : '#14232E'}" stop-opacity="0.75"/>
        </linearGradient>
      </defs>
      <!-- Top Brow Bar -->
      <path d="M 180 150 Q 300 135 420 150" stroke="${accentColor}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <!-- Nose Bridge -->
      <path d="M 270 178 Q 300 168 330 178" stroke="${accentColor}" stroke-width="4" fill="none"/>
      <!-- Left Teardrop Lens -->
      <path d="M 170 170 C 275 160 275 240 230 265 C 180 290 145 240 170 170 Z" fill="url(#lensA)" stroke="${color}" stroke-width="6"/>
      <!-- Right Teardrop Lens -->
      <path d="M 430 170 C 325 160 325 240 370 265 C 420 290 455 240 430 170 Z" fill="url(#lensA)" stroke="${color}" stroke-width="6"/>
      <!-- Temples -->
      <line x1="150" y1="175" x2="90" y2="195" stroke="${accentColor}" stroke-width="4" stroke-linecap="round"/>
      <line x1="450" y1="175" x2="510" y2="195" stroke="${accentColor}" stroke-width="4" stroke-linecap="round"/>
      <!-- Lens glare highlights -->
      <ellipse cx="205" cy="200" rx="28" ry="12" transform="rotate(-30 205 200)" fill="#FFFFFF" opacity="0.3"/>
      <ellipse cx="395" cy="200" rx="28" ry="12" transform="rotate(-30 395 200)" fill="#FFFFFF" opacity="0.3"/>
    `;
  } else if (type === 'cat-eye') {
    content = `
      <defs>
        <linearGradient id="lensCE" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${lensTint}"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.3"/>
        </linearGradient>
      </defs>
      <!-- Bridge -->
      <path d="M 270 190 Q 300 178 330 190" stroke="${accentColor}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Left Cat-Eye Winged Rim -->
      <path d="M 130 150 C 200 160 260 175 260 215 C 260 260 190 275 155 240 C 130 215 120 180 130 150 Z" fill="url(#lensCE)" stroke="${color}" stroke-width="9" stroke-linejoin="round"/>
      <!-- Right Cat-Eye Winged Rim -->
      <path d="M 470 150 C 400 160 340 175 340 215 C 340 260 410 275 445 240 C 470 215 480 180 470 150 Z" fill="url(#lensCE)" stroke="${color}" stroke-width="9" stroke-linejoin="round"/>
      <!-- Temples -->
      <path d="M 132 153 L 80 170" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
      <path d="M 468 153 L 520 170" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
      <!-- Accents on corners -->
      <circle cx="138" cy="158" r="3.5" fill="${accentColor}"/>
      <circle cx="462" cy="158" r="3.5" fill="${accentColor}"/>
      <!-- Anti-reflection flare -->
      <ellipse cx="200" cy="210" rx="30" ry="14" transform="rotate(-20 200 210)" fill="#FFFFFF" opacity="0.35"/>
      <ellipse cx="400" cy="210" rx="30" ry="14" transform="rotate(-20 400 210)" fill="#FFFFFF" opacity="0.35"/>
    `;
  } else if (type === 'clubmaster') {
    content = `
      <defs>
        <linearGradient id="lensCM" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${lensTint}"/>
          <stop offset="100%" stop-color="${polarized ? '#111827' : '#1E293B'}" stop-opacity="0.6"/>
        </linearGradient>
      </defs>
      <!-- Metal Lower Rims -->
      <circle cx="215" cy="225" r="54" fill="url(#lensCM)" stroke="${accentColor}" stroke-width="4"/>
      <circle cx="385" cy="225" r="54" fill="url(#lensCM)" stroke="${accentColor}" stroke-width="4"/>
      <!-- Bold Browline Acetate -->
      <path d="M 145 200 C 150 170 190 162 275 178 L 275 198 C 210 185 175 190 155 210 Z" fill="${color}"/>
      <path d="M 455 200 C 450 170 410 162 325 178 L 325 198 C 390 185 425 190 445 210 Z" fill="${color}"/>
      <!-- Metal Bridge -->
      <path d="M 270 195 Q 300 182 330 195" stroke="${accentColor}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Temples -->
      <line x1="145" y1="195" x2="85" y2="190" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
      <line x1="455" y1="195" x2="515" y2="190" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
      <!-- Rivets -->
      <rect x="150" y="185" width="6" height="3" rx="1.5" fill="${accentColor}"/>
      <rect x="444" y="185" width="6" height="3" rx="1.5" fill="${accentColor}"/>
      <!-- Flares -->
      <ellipse cx="205" cy="215" rx="25" ry="12" transform="rotate(-25 205 215)" fill="#FFFFFF" opacity="0.3"/>
      <ellipse cx="375" cy="215" rx="25" ry="12" transform="rotate(-25 375 215)" fill="#FFFFFF" opacity="0.3"/>
    `;
  } else if (type === 'wayfarer') {
    content = `
      <defs>
        <linearGradient id="lensWF" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${lensTint}"/>
          <stop offset="100%" stop-color="${polarized ? '#020617' : '#14232E'}" stop-opacity="0.85"/>
        </linearGradient>
      </defs>
      <!-- Thick Wayfarer Frame Left -->
      <path d="M 140 160 L 270 175 L 260 255 L 160 250 Z" fill="url(#lensWF)" stroke="${color}" stroke-width="12" stroke-linejoin="round"/>
      <!-- Thick Wayfarer Frame Right -->
      <path d="M 460 160 L 330 175 L 340 255 L 440 250 Z" fill="url(#lensWF)" stroke="${color}" stroke-width="12" stroke-linejoin="round"/>
      <!-- Bridge -->
      <path d="M 270 182 Q 300 172 330 182" stroke="${color}" stroke-width="10" fill="none"/>
      <!-- Silver Pins -->
      <ellipse cx="148" cy="168" rx="4" ry="2.5" fill="#E2E8F0"/>
      <ellipse cx="452" cy="168" rx="4" ry="2.5" fill="#E2E8F0"/>
      <!-- Temples -->
      <path d="M 136 164 L 75 178" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
      <path d="M 464 164 L 525 178" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
      <!-- Glare -->
      <ellipse cx="200" cy="205" rx="26" ry="12" transform="rotate(-30 200 205)" fill="#FFFFFF" opacity="0.25"/>
      <ellipse cx="400" cy="205" rx="26" ry="12" transform="rotate(-30 400 205)" fill="#FFFFFF" opacity="0.25"/>
    `;
  } else {
    // Elegant Classic Round or Geometric Acetate / Titanium
    content = `
      <defs>
        <radialGradient id="lensR" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7"/>
          <stop offset="25%" stop-color="${lensTint}"/>
          <stop offset="100%" stop-color="#93C5FD" stop-opacity="0.3"/>
        </radialGradient>
      </defs>
      <!-- Left Round Rim -->
      <circle cx="215" cy="205" r="56" fill="url(#lensR)" stroke="${color}" stroke-width="7"/>
      <!-- Right Round Rim -->
      <circle cx="385" cy="205" r="56" fill="url(#lensR)" stroke="${color}" stroke-width="7"/>
      <!-- Keyhole Bridge -->
      <path d="M 271 205 C 275 190 288 184 300 184 C 312 184 325 190 329 205" stroke="${accentColor || color}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Temples -->
      <line x1="159" y1="205" x2="90" y2="198" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
      <line x1="441" y1="205" x2="510" y2="198" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
      <!-- Glare highlight -->
      <ellipse cx="195" cy="190" rx="24" ry="10" transform="rotate(-35 195 190)" fill="#FFFFFF" opacity="0.45"/>
      <ellipse cx="365" cy="190" rx="24" ry="10" transform="rotate(-35 365 190)" fill="#FFFFFF" opacity="0.45"/>
    `;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
    <rect width="600" height="400" fill="#F5F6F7"/>
    <!-- Subtle optical grid shadow -->
    <ellipse cx="300" cy="330" rx="220" ry="16" fill="#E2E8F0" opacity="0.7" filter="blur(6px)"/>
    <g transform="translate(0, 0)">
      ${content}
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}