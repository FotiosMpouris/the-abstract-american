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
  const step = slidesPerView;
  const maxStart = Math.max(0, images.length - slidesPerView);
  currentIndex = Math.min(maxStart, currentIndex + step);
  animateMove('next');
  startAuto();
}
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

document.addEventListener('keydown', (e) => {
  if (isLightboxOpen()) return; // avoid conflicting with lightbox
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
});

function animateMove() {
  const slides = [...track.children];
  slides.forEach(s => s.classList.remove('exit-left','enter-right','is-transporting'));
  void track.offsetWidth;

  const start = currentIndex;
  const gap = parseFloat(getComputedStyle(track).getPropertyValue('--gap')) || 16;
  const card = slides[0];
  const cardWidth = card ? card.getBoundingClientRect().width : 0;
  const offsetX = -(cardWidth + gap) * start;

  track.style.transition = `transform ${TRANS_MS}ms cubic-bezier(.2,.65,.25,1)`;
  track.style.transform = `translate3d(${offsetX}px,0,0)`;

  setTimeout(() => {
    slides.forEach(s => s.classList.remove('enter-right','exit-left','is-transporting'));
    updateDots();
  }, TRANS_MS);
}

function goToPage(pageIndex) {
  stopAuto();
  const step = slidesPerView;
  currentIndex = Math.min(images.length - step, Math.max(0, pageIndex * step));
  animateMove();
  startAuto();
}

function startAuto(){
  stopAuto();
  autoTimer = setInterval(() => {
    const step = slidesPerView;
    const maxStart = Math.max(0, images.length - slidesPerView);
    currentIndex = currentIndex >= maxStart ? 0 : currentIndex + step;
    animateMove('next');
  }, AUTO_MS);
}
function stopAuto(){
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
}
startAuto();

// Resize handling
let resizeTO = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTO);
  resizeTO = setTimeout(() => {
    const oldSPV = slidesPerView;
    slidesPerView = getSlidesPerView();
    if (oldSPV !== slidesPerView) {
      buildDots();
      currentIndex = Math.floor(currentIndex / slidesPerView) * slidesPerView;
    }
    animateMove();
  }, 120);
});

// Touch / swipe on main viewport
let touchStartX = 0, touchDeltaX = 0;
viewport.addEventListener('touchstart', (e) => { stopAuto(); touchStartX = e.touches[0].clientX; touchDeltaX = 0; }, { passive:true });
viewport.addEventListener('touchmove', (e) => { touchDeltaX = e.touches[0].clientX - touchStartX; }, { passive:true });
viewport.addEventListener('touchend', () => {
  const THRESH = 50;
  if (touchDeltaX > THRESH) prev();
  else if (touchDeltaX < -THRESH) next();
  startAuto();
});
requestAnimationFrame(() => animateMove());

/* ---------- LIGHTBOX (Image Mode) ---------- */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImage');
const lbTitle = document.getElementById('lbTitle');
const lbDesc = document.getElementById('lbDesc');
const lbCount = document.getElementById('lbCount');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const lbFrame = document.getElementById('lbFrame');

let lbIndex = 0;
let lbKeyHandler = null;

function isLightboxOpen(){ return lb.classList.contains('is-open'); }

function openLightbox(i){
  lbIndex = i;
  updateLightbox();
  lb.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  lbKeyHandler = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  };
  document.addEventListener('keydown', lbKeyHandler);
}

function closeLightbox(){
  lb.classList.remove('is-open');
  document.body.style.overflow = '';
  if (lbKeyHandler) document.removeEventListener('keydown', lbKeyHandler);
}

function updateLightbox(){
  const item = images[lbIndex];
  lbImg.src = item.src;
  lbImg.alt = item.alt;
  lbTitle.textContent = item.label;
  lbDesc.textContent = item.desc || '';
  lbCount.textContent = `${lbIndex + 1} / ${images.length}`;
}

function prevLightbox(){
  lbIndex = (lbIndex - 1 + images.length) % images.length;
  updateLightbox();
}
function nextLightbox(){
  lbIndex = (lbIndex + 1) % images.length;
  updateLightbox();
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevLightbox);
lbNext.addEventListener('click', nextLightbox);

// click outside image closes
lb.addEventListener('click', (e) => {
  // only close if you click the backdrop, not buttons/frame
  const clickInside = e.target.closest('.lb-frame') || e.target.closest('.lb-nav') || e.target.closest('.lb-close');
  if (!clickInside) closeLightbox();
});

// swipe on lightbox
let lbTouchStart = 0, lbTouchDelta = 0;
lbFrame.addEventListener('touchstart', (e) => { lbTouchStart = e.touches[0].clientX; lbTouchDelta = 0; }, { passive:true });
lbFrame.addEventListener('touchmove', (e) => { lbTouchDelta = e.touches[0].clientX - lbTouchStart; }, { passive:true });
lbFrame.addEventListener('touchend', () => {
  const TH = 40;
  if (lbTouchDelta > TH) prevLightbox();
  else if (lbTouchDelta < -TH) nextLightbox();
});

/* ---------- MINI CAROUSEL: ColorFotiFoti preview ---------- */
const TOTAL_CYCLE_IMAGES = 5;               // bump if you add more
const CYCLE_PREFIX = 'images/artcycle';
const CYCLE_EXT = '.png';

const miniTrack = document.getElementById('miniTrack');
const miniDots = document.getElementById('miniDots');
const miniPrev = document.querySelector('.mini-prev');
const miniNext = document.querySelector('.mini-next');

if (miniTrack && miniDots && miniPrev && miniNext) {
  const previews = Array.from({ length: TOTAL_CYCLE_IMAGES }, (_, i) => ({
    src: `${CYCLE_PREFIX}${pad2(i + 1)}${CYCLE_EXT}`,
    alt: `ColorFotiFoti preview ${i + 1}`
  }));

  previews.forEach((p) => {
    const li = document.createElement('li');
    li.className = 'mini-slide';
    const img = document.createElement('img');
    img.src = p.src; img.alt = p.alt;
    li.appendChild(img);
    miniTrack.appendChild(li);
  });

  previews.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Go to preview ${i + 1}`);
    b.addEventListener('click', () => goMini(i));
    miniDots.appendChild(b);
  });

  let miniIndex = 0;
  const MINI_AUTO_MS = 3800;
  let miniTimer = null;

  function updateMiniDots() {
    [...miniDots.children].forEach((d, i) => {
      d.setAttribute('aria-current', i === miniIndex ? 'true' : 'false');
    });
  }

  function goMini(i) {
    stopMini();
    miniIndex = Math.max(0, Math.min(previews.length - 1, i));
    const gap = parseFloat(getComputedStyle(miniTrack).getPropertyValue('--gap')) || 10;
    const card = miniTrack.children[0];
    const w = card ? card.getBoundingClientRect().width : 0;
    const x = -(w + gap) * miniIndex;
    miniTrack.style.transform = `translate3d(${x}px,0,0)`;
    updateMiniDots();
    startMini();
  }

  function nextMini() { goMini((miniIndex + 1) % previews.length); }
  function prevMini() { goMini((miniIndex - 1 + previews.length) % previews.length); }

  function startMini(){ stopMini(); miniTimer = setInterval(nextMini, MINI_AUTO_MS); }
  function stopMini(){ if (miniTimer) clearInterval(miniTimer); miniTimer = null; }

  miniNext.addEventListener('click', nextMini);
  miniPrev.addEventListener('click', prevMini);

  // touch support
  let tStart = 0, tDelta = 0;
  const miniViewport = document.querySelector('.mini-viewport');
  miniViewport.addEventListener('touchstart', (e) => { stopMini(); tStart = e.touches[0].clientX; tDelta = 0; }, { passive:true });
  miniViewport.addEventListener('touchmove', (e) => { tDelta = e.touches[0].clientX - tStart; }, { passive:true });
  miniViewport.addEventListener('touchend', () => {
    const TH = 40;
    if (tDelta > TH) prevMini();
    else if (tDelta < -TH) nextMini();
    startMini();
  });

  // init
  updateMiniDots();
  startMini();
}
