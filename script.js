/* ========= The Abstract American =========
   - Main carousel: 3-up desktop, 2-up tablet, 1-up mobile
   - Gallery captions short; lightbox stories longer
   - Lightbox: arrows on desktop, SWIPE on mobile (+right arrow hidden via CSS)
   - Mini promo carousel kept intact
===================================================== */

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

/* ================== MAIN GALLERY DATA ================== */
/* Images should exist as: images/art01.png ... images/art18.png (lowercase) */
const TOTAL_IMAGES = 18;
const pad2 = n => String(n).padStart(2, '0');
const SRC = i => `images/art${pad2(i)}.png`; // keeps your existing structure

/* Short front-facing captions (2–4 words).
   Longer stories appear in the lightbox. Edit freely. */
const TITLES = [
  "Howl","Twin Suns","Sail of Fire","Iron Horse","Radiant Muse","Beacon",
  "Shark City","Barrel Run","Queen of Stars","Circuit Gaze","Fox, Incorporated",
  "Street Fox","Constellation Curl","Equinox Horse","Spiral Madonna",
  "Sail at Dusk","Island Light","Fury Mask"
];

const TEASERS = [
  "fractured beast","split-face harmony","sunlit wake","angles in motion",
  "galaxy curls","light through weather","mechanical grin","moment of speed",
  "poise + cosmos","signals and eyes","sharp suit, sly grin","urban trickster",
  "orbits of hair","prism mare","eyes like spirals","harbor gold",
  "home by the water","geometry, loud"
];

const STORIES = [
  // 01 Howl
  "Some dreams purr. This one howls. A creature made of rivets and rhythm opens its mouth to modern noise. It’s part warning siren, part laugh track, and fully alive.",
  // 02 Twin Suns
  "Two sides of the same human: solar and lunar, careful and chaotic. A face spliced by circuitry that still finds room to breathe. The eyes know more than they’re saying.",
  // 03 Sail of Fire
  "A boat cutting across a mirror of melted daylight. The sail catches a stray comet, and the sea politely pretends this is normal behavior.",
  // 04 Iron Horse
  "A stallion assembled from geometry, posture, and memory. You can almost hear the snort — chrome, cinnamon, and electricity.",
  // 05 Radiant Muse
  "Hair like an orbiting festival. She’s calm in the middle of a color storm, the look of someone who can read your future but won’t ruin the surprise.",
  // 06 Beacon
  "Weather churns; lighthouse shrugs. A steady hum of paint and patience holds the line while gulls talk politics overhead.",
  // 07 Shark City
  "A metropolis builds a fish and gives it teeth. It eats deadlines, parking tickets, and half-finished coffee. The smile is strictly business.",
  // 08 Barrel Run
  "Speed turns corners into diagonals. Sand leaps; the horse answers; the rider grins into the dust. Momentum is the medium.",
  // 09 Queen of Stars
  "A crown of constellations, a backdrop of flags. Country meets cosmos and neither blinks first.",
  // 10 Circuit Gaze
  "Signals orbit her like moons, but the eyes are analog: warm, stubborn, and a little amused by gravity.",
  // 11 Fox, Incorporated
  "Dress sharp, scheme sharper. This fox knows boardrooms are just forests with carpets. Stars in the background… for optics.",
  // 12 Street Fox
  "Rust, paint, and neon whiskers. A city-sized slyness. If he borrowed your lighter, he’d bring it back with a new story.",
  // 13 Constellation Curl
  "The night sky tries a new hairstyle. Spirals, orbits, and a thousand tiny decisions that somehow add up to a face.",
  // 14 Equinox Horse
  "Built from twilight angles, this horse steps out of a constellation and onto the road. Hooves? More like exclamation points.",
  // 15 Spiral Madonna
  "Saint of good trouble. A halo of spirals, a quiet joke in the eyes, and a promise not to play it safe.",
  // 16 Sail at Dusk
  "Harbor glass turns to liquid fire; boats float on top of their own reflections. Time finally sits down and watches the sun.",
  // 17 Island Light
  "A staircase to the sea, a boat napping in cobalt. The house says ‘stay for dinner’; the moon RSVP’d yes.",
  // 18 Fury Mask
  "A roar turned into architecture. Fear, humor, and a dash of carnival — because even monsters deserve good lighting."
];

// Build image objects
const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => {
  const idx = i + 1;
  return {
    src: SRC(idx),
    alt: `Artwork ${idx}`,
    label: `ART ${pad2(idx)}`,
    title: TITLES[i] || `ART ${pad2(idx)}`,
    teaser: TEASERS[i] || "",
    story: STORIES[i] || ""
  };
});

/* ================== MAIN CAROUSEL UI ================== */
const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.querySelector('.nav.prev');
const nextBtn = document.querySelector('.nav.next');
const viewport = document.querySelector('.track-viewport');

let currentIndex = 0;
let slidesPerView = getSlidesPerView();
let autoTimer = null;
const AUTO_MS = 4200;
const TRANS_MS = 520;

// Build slides (alternating caption side on desktop)
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

    // short gallery caption
    const meta = document.createElement('div');
    meta.className = 'meta';
    const shortText = img.teaser ? ` — ${img.teaser}` : '';
    meta.innerHTML = `<strong>${img.title}</strong>${shortText}`;

    li.appendChild(image);
    li.appendChild(badge);
    li.appendChild(meta);
    track.appendChild(li);

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
  [...dotsWrap.children].forEach((d, i) => d.setAttribute('aria-current', i === page ? 'true' : 'false'));
}

function getSlidesPerView() {
  const w = window.innerWidth;
  if (w <= 680) return 1;
  if (w <= 1024) return 2;
  return 3;
}

function prev() {
  stopAuto();
  const step = slidesPerView;
  currentIndex = Math.max(0, currentIndex - step);
  animateMove();
  startAuto();
}
function next() {
  stopAuto();
  const step = slidesPerView;
  const maxStart = Math.max(0, images.length - slidesPerView);
  currentIndex = Math.min(maxStart, currentIndex + step);
  animateMove();
  startAuto();
}
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

// Keyboard (only when lightbox is closed to avoid double handling)
document.addEventListener('keydown', (e) => {
  if (isLightboxOpen()) return;
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

  setTimeout(updateDots, TRANS_MS);
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
    animateMove();
  }, AUTO_MS);
}
function stopAuto(){
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
}
startAuto();

// Responsive
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
  if (touchDeltaX > THRESH) prev(); else if (touchDeltaX < -THRESH) next();
  startAuto();
});
requestAnimationFrame(animateMove);

/* ================== LIGHTBOX (Image Mode) ================== */
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
  lbTitle.textContent = item.title;
  lbDesc.textContent = item.story || '';
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

// Close when clicking backdrop (not buttons/frame)
lb.addEventListener('click', (e) => {
  const inside = e.target.closest('.lb-frame') || e.target.closest('.lb-nav') || e.target.closest('.lb-close');
  if (!inside) closeLightbox();
});

// Swipe on lightbox
let lbTouchStart = 0, lbTouchDelta = 0;
lbFrame.addEventListener('touchstart', (e) => { lbTouchStart = e.touches[0].clientX; lbTouchDelta = 0; }, { passive:true });
lbFrame.addEventListener('touchmove', (e) => { lbTouchDelta = e.touches[0].clientX - lbTouchStart; }, { passive:true });
lbFrame.addEventListener('touchend', () => {
  const TH = 40;
  if (lbTouchDelta > TH) prevLightbox(); else if (lbTouchDelta < -TH) nextLightbox();
});

/* ================== MINI PROMO CAROUSEL ================== */
const TOTAL_CYCLE_IMAGES = 5;               // bump if you add more
const miniTrack = document.getElementById('miniTrack');
const miniDots = document.getElementById('miniDots');
const miniPrev = document.querySelector('.mini-prev');
const miniNext = document.querySelector('.mini-next');

if (miniTrack && miniDots && miniPrev && miniNext) {
  const previews = Array.from({ length: TOTAL_CYCLE_IMAGES }, (_, i) => ({
    src: `images/artcycle${pad2(i + 1)}.png`,
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
    [...miniDots.children].forEach((d, i) => d.setAttribute('aria-current', i === miniIndex ? 'true' : 'false'));
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

  updateMiniDots();
  startMini();
}
