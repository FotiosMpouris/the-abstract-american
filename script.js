/* ========= The Abstract American =========
   Carousel with transporter-like transitions
   - Desktop: 3 visible, Tablet: 2, Mobile: 1
   - Auto-play + buttons + dots + swipe
==========================================*/

// 1) Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// 2) Build image list automatically (ART01..ART25.png)
const TOTAL_IMAGES = 25;
const IMG_PREFIX = 'images/ART';
const IMG_EXT = '.png';

// Pads to two digits (01..25)
const pad2 = n => String(n).padStart(2, '0');

const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
  src: `${IMG_PREFIX}${pad2(i + 1)}${IMG_EXT}`,
  alt: `Artwork ${i + 1}`,
  label: `ART ${pad2(i + 1)}`
}));

// 3) DOM refs
const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.querySelector('.nav.prev');
const nextBtn = document.querySelector('.nav.next');
const viewport = document.querySelector('.track-viewport');

// 4) State
let currentIndex = 0;
let slidesPerView = getSlidesPerView();
let autoTimer = null;
const AUTO_MS = 4200;
const TRANS_MS = 520; // keep in sync with CSS keyframes

// 5) Build slides
function buildSlides() {
  track.innerHTML = '';
  images.forEach((img, i) => {
    const li = document.createElement('li');
    li.className = 'slide';
    li.setAttribute('role', 'group');
    li.setAttribute('aria-label', `${i + 1} of ${images.length}`);

    const image = document.createElement('img');
    image.loading = i > slidesPerView ? 'lazy' : 'eager';
    image.src = img.src;
    image.alt = img.alt;

    const badge = document.createElement('span');
    badge.className = 'label';
    badge.textContent = img.label;

    li.appendChild(image);
    li.appendChild(badge);
    track.appendChild(li);

    // open image in a new tab (simple lightbox behavior)
    li.addEventListener('click', () => window.open(img.src, '_blank'));
  });
}
buildSlides();

// 6) Build dots
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

// 7) Layout helper
function getSlidesPerView() {
  const w = window.innerWidth;
  if (w <= 680) return 1;
  if (w <= 1024) return 2;
  return 3;
}

// 8) Navigation
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

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
});

// 9) Animate slide move with transporter effect
function animateMove(direction) {
  const slides = [...track.children];
  slides.forEach(s => s.classList.remove('exit-left','enter-right','is-transporting'));
  viewport.classList.remove('pulse');
  void track.offsetWidth; // reflow for restart

  // mark visible range before move (for exit animation)
  const start = currentIndex;
  const end = Math.min(start + slidesPerView - 1, images.length - 1);

  // Approximate width of one card (including gap)
  const gap = parseFloat(getComputedStyle(track).getPropertyValue('--gap')) || 16;
  const card = slides[0];
  const cardWidth = card ? card.getBoundingClientRect().width : 0;
  const offsetX = -(cardWidth + gap) * start;

  // apply exit-left to currently visible (for a nicer effect)
  for (let i = start; i <= end; i++) {
    if (slides[i]) {
      slides[i].classList.add('is-transporting', 'enter-right'); // pre-state for after move
    }
  }

  // move the track
  track.style.transition = `transform ${TRANS_MS}ms cubic-bezier(.2,.65,.25,1)`;
  track.style.transform = `translate3d(${offsetX}px,0,0)`;

  // after the transform finishes, toggle classes to finalize state
  setTimeout(() => {
    slides.forEach(s => s.classList.remove('enter-right','exit-left','is-transporting'));
    updateDots();
  }, TRANS_MS);
}

// 10) Jump to a page (dot controls)
function goToPage(pageIndex) {
  stopAuto();
  const step = slidesPerView;
  currentIndex = Math.min(images.length - step, Math.max(0, pageIndex * step));
  animateMove();
  startAuto();
}

// 11) Autoplay
function startAuto(){
  stopAuto();
  autoTimer = setInterval(() => {
    const step = slidesPerView;
    const maxStart = Math.max(0, images.length - slidesPerView);
    if (currentIndex >= maxStart) {
      currentIndex = 0;
    } else {
      currentIndex += step;
    }
    animateMove('next');
  }, AUTO_MS);
}
function stopAuto(){
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
}
startAuto();

// 12) Resize handling (recompute pages & positions)
let resizeTO = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTO);
  resizeTO = setTimeout(() => {
    const oldSPV = slidesPerView;
    slidesPerView = getSlidesPerView();
    // rebuild dots only if the per-view count changed
    if (oldSPV !== slidesPerView) {
      buildDots();
      // snap to the page boundary to avoid “half pages”
      currentIndex = Math.floor(currentIndex / slidesPerView) * slidesPerView;
    }
    // force transform recalculation
    animateMove();
  }, 120);
});

// 13) Touch / swipe (mobile)
let touchStartX = 0;
let touchDeltaX = 0;
viewport.addEventListener('touchstart', (e) => {
  stopAuto();
  touchStartX = e.touches[0].clientX;
  touchDeltaX = 0;
}, { passive:true });

viewport.addEventListener('touchmove', (e) => {
  touchDeltaX = e.touches[0].clientX - touchStartX;
}, { passive:true });

viewport.addEventListener('touchend', () => {
  const THRESH = 50; // px
  if (touchDeltaX > THRESH) prev();
  else if (touchDeltaX < -THRESH) next();
  startAuto();
});

// 14) Initial snap
requestAnimationFrame(() => animateMove());

/* ===== Optional: if your flag image has a different path/name =====
   Update .hero__backdrop in style.css to match, e.g.:
   background: ..., url('images/your-flag.png') center/cover no-repeat;
*/
