/* ========= The Abstract American =========
   - Keeps all current behavior
   - Fixes placement via CSS (see style.css)
   - Mobile: swipe-only; right arrow hidden via CSS
   - Explicit file mapping so PNG/JPG mixes work and titles match the right image
===================================================== */

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

/* ================== GALLERY DATA ==================
   Edit the FILES array to control order, filename/extension, and text.
   Title = short gallery label; Teaser = 2–3 words shown in gallery;
   Story = longer, fun write-up shown in the lightbox. */
const FILES = [
  { src:'images/art01.png', title:'The Independent Fox', teaser:'research independently' },
  { src:'images/art02.png', title:'Queen of Stars', teaser:'angles in motion' },
  { src:'images/art03.png', title:'Street Fox', teaser:'urban trickster' },
  { src:'images/art04.png', title:'Constellation Curl', teaser:'orbits of hair' },
  { src:'images/art05.png', title:'Beacon', teaser:'light through weather' },
  { src:'images/art06.png', title:'Radiant Muse', teaser:'galaxy curls' },
  { src:'images/art07.png', title:'Equinox Horse', teaser:'prism mare' },
  { src:'images/art08.png', title:'Fury Mask', teaser:'geometry, loud' },
  { src:'images/art09.png', title:'Trojan', teaser:'poise + cosmos' },  // jpg example
  { src:'images/art10.png', title:'Shark City', teaser:'mechanical grin' },
  { src:'images/art11.png', title:'Barrel Run', teaser:'moment of speed' },
  { src:'images/art12.png', title:'Spiral Madonna', teaser:'eyes like spirals' },
  { src:'images/art13.png', title:'Sail of Fire', teaser:'sunlit wake'}, // jpg example
  { src:'images/art14.png', title:'Circuit Gaze', teaser:'signals and eyes' },
  { src:'images/art15.png', title:'Sail at Dusk', teaser:'harbor gold' },
  { src:'images/art16.png', title:'Island Light', teaser:'home by the water' },
  { src:'images/art17.png', title:'Maria Keeterna', teaser:'split-face harmony' },   // jpg example
  { src:'images/art18.png', title:'Howl', teaser:'fractured beast' },
  { src:'images/art19.png', title:'Mycelias Network', teaser:'wisdom, discrepancy' }
];

/* Stories in a voice that’s part Tom Wolfe, part Natalie Goldberg, with a cosmic
   wink from Jerry Garcia. Keep them punchy and alive. */
const STORIES = [
  // 1 Howl
  "The canvas leans forward and bares its teeth. A junkyard radio tuned to moonlight, a carnival siren, a beast stitched from traffic cones and cathedral glass. You don’t tame it—you tip your hat and let it pass through you like thunder.",
  // 2 Twin Suns
  "Two hemispheres arguing politely over coffee. One eye maps the freeway; the other counts stars like rosary beads. The face doesn’t choose—she holds both suns in her jaw and walks out smiling.",
  // 3 Sail of Fire
  "Wind is the drummer, the boat is the bass line, and the sail—good Lord—the sail is a lighter flicked against the sky. Water copies everything like a devoted bootlegger and sells it back as gold.",
  // 4 Iron Horse
  "A horse built from rulers and fever dreams. Chrome bones, sunset mane, hooves that punch exclamation points into the dark. You can hear the snort: smoke, cinnamon, electricity.",
  // 5 Radiant Muse
  "She carries a galaxy in her hair like it’s a casual Tuesday. Her look says: I’ve read your aura and it checks out—now do something brave. The circles orbit because gravity is a fan.",
  // 6 Beacon
  "The lighthouse minds its own holiness while the weather auditions for disaster films. Paint, patience, gulls debating maritime policy—somehow the light keeps winning.",
  // 7 Shark City
  "Everything with a deadline grew teeth. Elevators, invoices, that guy from accounting. The shark grins like a billboard for capitalism and swims off with your to-do list between its molars.",
  // 8 Barrel Run
  "Momentum is a language and the rider speaks it fast. Dirt leaps up to applaud; the horse bows without slowing. Somewhere a stopwatch faints.",
  // 9 Queen of Stars
  "Crowns are for heads; constellations are for hair. She carries both. Flags in the back salute, not out of duty but because elegance just walked in.",
  // 10 Circuit Gaze
  "Her eyes are vinyl—warm, crackling—and all the geometry around her keeps trying to remix the track. Spoiler: the analog wins.",
  // 11 Fox, Incorporated
  "A CEO from the mythic forest. Tie knotted like a plot twist, ears tuned to quarterly whispers. He signs in pawprint cursive and the boardroom howls approval.",
  // 12 Street Fox
  "Urban folklore in orange and cobalt. He smells like spray paint and good trouble, the kind of friend who returns your lighter with a better story attached.",
  // 13 Constellation Curl
  "Hair as a night map—each curl a galaxy kiosk saying You Are Here. She’s not posing; she’s orbiting slowly, taking attendance of the planets.",
  // 14 Equinox Horse
  "Dawn on one flank, midnight on the other. The horse steps out of a star chart and onto asphalt, and the street has the good sense to hush.",
  // 15 Spiral Madonna
  "A saint for artists and beautiful mistakes. Her halo is a traffic circle for ideas; they merge, they honk, they find their lane and fly.",
  // 16 Sail at Dusk
  "The harbor liquefies into stained glass. Boats hover like prayer beads pulled slow through the hour. The sun signs its autograph and leaves town.",
  // 17 Island Light
  "Stairs to the sea, lemons in the air, a boat napping in cobalt. The moon RSVP’d yes and brought dessert.",
  // 18 Fury Mask
  "A roar engineered from geometry and gossip. Fear shows up, laughs, and stays for the party. Even monsters deserve flattering lighting."
];

/* ===== Build normalized image objects ===== */
const images = FILES.map((f, i) => ({
  src: f.src, alt: `Artwork ${i+1}`,
  label: `ART ${String(i+1).padStart(2,'0')}`,
  title: f.title, teaser: f.teaser || "", story: STORIES[i] || ""
}));

/* ================== MAIN CAROUSEL ================== */
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

// Build slides with short meta
function buildSlides(){
  track.innerHTML = '';
  images.forEach((img, i) => {
    const li = document.createElement('li');
    li.className = 'slide';
    li.setAttribute('role','group');
    li.setAttribute('aria-label', `${i+1} of ${images.length}`);

    const el = document.createElement('img');
    el.src = img.src; el.alt = img.alt;
    el.loading = i > slidesPerView ? 'lazy' : 'eager';

    const meta = document.createElement('div');
    meta.className = 'meta';
    const short = img.teaser ? ` — ${img.teaser}` : '';
    meta.innerHTML = `<strong>${img.title}</strong>${short}`;

    li.append(el, meta);
    li.addEventListener('click', () => openLightbox(i));
    track.appendChild(li);
  });
}
buildSlides();

// Dots
function buildDots(){
  dotsWrap.innerHTML = '';
  const pages = Math.ceil(images.length / slidesPerView);
  for (let i=0;i<pages;i++){
    const b = document.createElement('button');
    b.setAttribute('aria-label',`Go to set ${i+1}`);
    b.addEventListener('click', ()=>goToPage(i));
    dotsWrap.appendChild(b);
  }
  updateDots();
}
buildDots();

function updateDots(){
  const page = Math.floor(currentIndex / slidesPerView);
  [...dotsWrap.children].forEach((d,i)=>d.setAttribute('aria-current', i===page ? 'true':'false'));
}
function getSlidesPerView(){ const w=window.innerWidth; if(w<=680) return 1; if(w<=1024) return 2; return 3; }

function prev(){ stopAuto(); const step=slidesPerView; currentIndex = Math.max(0, currentIndex-step); animateMove(); startAuto(); }
function next(){ stopAuto(); const step=slidesPerView; const maxStart=Math.max(0, images.length - slidesPerView); currentIndex=Math.min(maxStart, currentIndex+step); animateMove(); startAuto(); }
prevBtn.addEventListener('click', prev); nextBtn.addEventListener('click', next);

document.addEventListener('keydown', (e)=>{ if(isLightboxOpen()) return; if(e.key==='ArrowLeft') prev(); if(e.key==='ArrowRight') next(); });

function animateMove(){
  const gap = parseFloat(getComputedStyle(track).getPropertyValue('--gap')) || 16;
  const first = track.children[0]; const w = first ? first.getBoundingClientRect().width : 0;
  track.style.transition = `transform ${TRANS_MS}ms cubic-bezier(.2,.65,.25,1)`;
  track.style.transform = `translate3d(${-(w+gap)*currentIndex}px,0,0)`;
  setTimeout(updateDots, TRANS_MS);
}

function goToPage(p){ stopAuto(); const step=slidesPerView; currentIndex = Math.min(images.length - step, Math.max(0, p*step)); animateMove(); startAuto(); }

function startAuto(){ stopAuto(); autoTimer = setInterval(()=>{ const step=slidesPerView; const maxStart=Math.max(0, images.length - slidesPerView); currentIndex = currentIndex>=maxStart ? 0 : currentIndex+step; animateMove(); }, AUTO_MS); }
function stopAuto(){ if(autoTimer){ clearInterval(autoTimer); autoTimer=null; } }
startAuto();

let resizeTO=null;
window.addEventListener('resize', ()=>{ clearTimeout(resizeTO); resizeTO=setTimeout(()=>{ const old=slidesPerView; slidesPerView=getSlidesPerView(); if(old!==slidesPerView){ buildDots(); currentIndex=Math.floor(currentIndex/slidesPerView)*slidesPerView; } animateMove(); },120); });

// Touch swipe on main carousel
let touchStartX=0, touchDX=0;
viewport.addEventListener('touchstart', (e)=>{ stopAuto(); touchStartX=e.touches[0].clientX; touchDX=0; }, {passive:true});
viewport.addEventListener('touchmove', (e)=>{ touchDX=e.touches[0].clientX - touchStartX; }, {passive:true});
viewport.addEventListener('touchend', ()=>{ const TH=50; if(touchDX>TH) prev(); else if(touchDX<-TH) next(); startAuto(); });
requestAnimationFrame(animateMove);

/* ================== LIGHTBOX ================== */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImage');
const lbTitle = document.getElementById('lbTitle');
const lbDesc = document.getElementById('lbDesc');
const lbCount = document.getElementById('lbCount');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const lbFrame = document.getElementById('lbFrame');

let lbIndex = 0, lbKeyHandler = null;
const isLightboxOpen = () => lb.classList.contains('is-open');

function openLightbox(i){
  lbIndex = i; updateLightbox();
  lb.classList.add('is-open'); document.body.style.overflow='hidden';
  lbKeyHandler = (e)=>{ if(e.key==='Escape') closeLightbox(); if(e.key==='ArrowLeft') prevLightbox(); if(e.key==='ArrowRight') nextLightbox(); };
  document.addEventListener('keydown', lbKeyHandler);
}
function closeLightbox(){ lb.classList.remove('is-open'); document.body.style.overflow=''; if(lbKeyHandler) document.removeEventListener('keydown', lbKeyHandler); }
function updateLightbox(){ const it=images[lbIndex]; lbImg.src=it.src; lbImg.alt=it.alt; lbTitle.textContent=it.title; lbDesc.textContent=it.story||''; lbCount.textContent=`${lbIndex+1} / ${images.length}`; }
function prevLightbox(){ lbIndex=(lbIndex-1+images.length)%images.length; updateLightbox(); }
function nextLightbox(){ lbIndex=(lbIndex+1)%images.length; updateLightbox(); }

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevLightbox);
lbNext.addEventListener('click', nextLightbox);

// Backdrop close
lb.addEventListener('click', (e)=>{ const inside=e.target.closest('.lb-frame')||e.target.closest('.lb-nav')||e.target.closest('.lb-close'); if(!inside) closeLightbox(); });

// Swipe inside lightbox
let lbStart=0, lbDX=0;
lbFrame.addEventListener('touchstart', (e)=>{ lbStart=e.touches[0].clientX; lbDX=0; }, {passive:true});
lbFrame.addEventListener('touchmove', (e)=>{ lbDX=e.touches[0].clientX - lbStart; }, {passive:true});
lbFrame.addEventListener('touchend', ()=>{ const TH=40; if(lbDX>TH) prevLightbox(); else if(lbDX<-TH) nextLightbox(); });

/* ================== MINI PROMO CAROUSEL (unchanged) ================== */
const TOTAL_CYCLE_IMAGES = 5;
const miniTrack = document.getElementById('miniTrack');
const miniDots = document.getElementById('miniDots');
const miniPrev = document.querySelector('.mini-prev');
const miniNext = document.querySelector('.mini-next');

if (miniTrack && miniDots && miniPrev && miniNext) {
  const pad2 = n => String(n).padStart(2,'0');
  const previews = Array.from({ length: TOTAL_CYCLE_IMAGES }, (_, i) => ({
    src: `images/artcycle${pad2(i+1)}.png`, alt: `ColorFotiFoti preview ${i+1}`
  }));

  previews.forEach(p => {
    const li=document.createElement('li'); li.className='mini-slide';
    const img=document.createElement('img'); img.src=p.src; img.alt=p.alt;
    li.appendChild(img); miniTrack.appendChild(li);
  });

  previews.forEach((_,i)=>{ const b=document.createElement('button'); b.setAttribute('aria-label',`Go to preview ${i+1}`); b.addEventListener('click',()=>goMini(i)); miniDots.appendChild(b); });

  let miniIndex=0, miniTimer=null; const MINI_AUTO_MS=3800;
  const updateMiniDots=()=>{ [...miniDots.children].forEach((d,i)=>d.setAttribute('aria-current', i===miniIndex ? 'true':'false')); };
  const stopMini=()=>{ if(miniTimer){ clearInterval(miniTimer); miniTimer=null; } };
  const startMini=()=>{ stopMini(); miniTimer=setInterval(()=>goMini((miniIndex+1)%previews.length), MINI_AUTO_MS); };

  function goMini(i){
    stopMini(); miniIndex=Math.max(0, Math.min(previews.length-1, i));
    const gap=parseFloat(getComputedStyle(miniTrack).getPropertyValue('--gap'))||10;
    const card=miniTrack.children[0]; const w=card?card.getBoundingClientRect().width:0;
    miniTrack.style.transform=`translate3d(${-(w+gap)*miniIndex}px,0,0)`; updateMiniDots(); startMini();
  }

  miniNext.addEventListener('click', ()=>goMini((miniIndex+1)%previews.length));
  miniPrev.addEventListener('click', ()=>goMini((miniIndex-1+previews.length)%previews.length));

  let tStart=0, tDX=0; const miniViewport=document.querySelector('.mini-viewport');
  miniViewport.addEventListener('touchstart', e=>{ stopMini(); tStart=e.touches[0].clientX; tDX=0; }, {passive:true});
  miniViewport.addEventListener('touchmove', e=>{ tDX=e.touches[0].clientX - tStart; }, {passive:true});
  miniViewport.addEventListener('touchend', ()=>{ const TH=40; if(tDX>TH) goMini((miniIndex-1+previews.length)%previews.length); else if(tDX<-TH) goMini((miniIndex+1)%previews.length); startMini(); });

  updateMiniDots(); startMini();
}

