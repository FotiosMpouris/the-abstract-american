/* ========= The Abstract American =========
   MAIN CAROUSEL (art##.png) + MINI CAROUSEL (artcycle##.png)
   - Desktop: 3 visible, Tablet: 2, Mobile: 1
   - Lightbox image mode: arrows, swipe, Esc close, neon flair
==========================================*/

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- MAIN CAROUSEL CONFIG ---------- */
const TOTAL_IMAGES = 25;                   // number of gallery images
const IMG_PREFIX = 'images/art';           // lowercase as you set
const IMG_EXT = '.png';
const pad2 = n => String(n).padStart(2, '0');

const DESCRIPTIONS = [
  "Neon lattice drifting across midnight blues.",
  "Copper circuitry weaving through turquoise haze.",
  "Desert sunrise fractured into glassy planes.",
  "Rain-slick city lights melting into strokes.",
  "Thunderclouds sketched in chrome and ember.",
  "Horizon lines bending like radio waves.",
  "Rusted gears blooming into electric petals.",
  "Night ocean mapped by pixel constellations.",
  "Sunlit concrete softened by pastel echoes.",
  "Jazz rhythm translated into color shards.",
  "Steam whisked through violet neon corridors.",
  "Memory fragments stitched with silver thread.",
  "Heat shimmer dancing on aluminum dunes.",
  "Skylines folding into origami reflections.",
  "Old maps reimagined as magnetic fields.",
  "Lantern glow spiraling through cobalt fog.",
  "Wind patterns carved into carbon fiber.",
  "Driftwood stories told in electric sienna.",
  "Satellite orbits traced with brushgrain.",
  "Alley graffiti dreaming in chrome daylight.",
  "Sand, steel, and signal noise harmonized.",
  "Tide charts painted with lunar graphite.",
  "Radio towers dissolving into aurora streaks.",
  "Rust, rain, and resonance finding balance.",
  "Afterglow scattered across a quiet grid."
];

const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
  src: `${IMG_PREFIX}${pad2(i + 1)}${IMG_EXT}`,
  alt: `Artwork ${i + 1}`,
  label: `ART ${pad2(i + 1)}`,
  desc: DESCRIPTIONS[i] || ""
}));

// DOM refs
const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.querySelector('.nav.prev');
const nextBtn = document.querySelector('.nav.next');
const viewport = document.querySelector('.track-viewport');

// State
let currentIndex = 0;
let slidesPerView = getSlidesPerView();
let autoTimer = null;
const AUTO_MS = 4200;
const TRANS_MS = 520;

// Build slides with alternating caption sides on desktop
function buildSlides() {
  track.innerHTML = '';
  images.forEach((img, i) => {
    const li = document.createElement('li');
    li.className = 'slide ' + (i % 2 === 0 ? 'meta-left' : 'meta-right');
    li.setAttribute('role', 'group');
    li.setAttribute('aria-label', `${i + 1} of ${images.length}`);

    const image = document.createElement('img');
    image.loading = i > slidesPerView ? 'lazy' : 'eager';
    image.src = img.src;
    image.alt = img.alt;

    const badge = document.createElement('span');
    badge.className = 'label';
    badge.textContent = img.label;

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `<strong>${img.label}:</strong>&nbsp;${img.desc}`;

    li.appendChild(image);
    li.appendChild(badge);
    li.appendChild(meta);
    track.appendChild(li);

    // Open lightbox on click
    li.addEventListener('click', () => openLightbox(i));
  });
}
buildSlides();

// Dots
function buildDots() {
  dotsWrap.innerHTML = '';
  const pages = Math.ceil(images.length / slidesPerView);
  for (let i = 0; i < pages; i++) {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Go to set ${i + 1}`);
    b.addEventListener('click', () => goToPage(i));
    dotsWrap.appendChild(b);
  }
  updateDots();
}
buildDots();

function updateDots() {
  const page = Math.floor(currentIndex / slidesPerView);
  [...dotsWrap.children].forEach((d, i) => {
    d.setAttribute('aria-current', i === page ? 'true' : 'false');
  });
}

function getSlidesPerView() {
  const w = window.innerWidth;
  if (w <= 680) return 1;
  if (w <= 1024) return 2;
  return 3;
}

// Navigation
function prev() {
  stopAuto();
  const step = slidesPerView;
  currentIndex = Math.max(0, currentIndex - step);
  animateMove('prev');
  startAuto();
}
function next() {
  stopAuto();
  const step = sli
