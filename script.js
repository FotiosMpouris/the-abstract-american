/* ===== The Abstract American — Gallery ===== */

document.getElementById('year').textContent = new Date().getFullYear();

/* ===== ARTWORK DATA ===== */
const FILES = [
  { src:'images/art01.png', title:'The Independent Fox', teaser:'research independently' },
  { src:'images/art02.png', title:'Queen of Stars', teaser:'angles in motion' },
  { src:'images/art03.png', title:'Street Fox', teaser:'urban trickster' },
  { src:'images/art04.png', title:'Constellation Curl', teaser:'orbits of hair' },
  { src:'images/art05.png', title:'Beacon', teaser:'light through weather' },
  { src:'images/art06.png', title:'Radiant Muse', teaser:'galaxy curls' },
  { src:'images/art07.png', title:'Equinox Horse', teaser:'prism mare' },
  { src:'images/art08.png', title:'Fury Mask', teaser:'geometry, loud' },
  { src:'images/art09.png', title:'Trojan', teaser:'poise + cosmos' },
  { src:'images/art10.png', title:'Shark City', teaser:'mechanical grin' },
  { src:'images/art11.png', title:'Barrel Run', teaser:'moment of speed' },
  { src:'images/art12.png', title:'Spiral Madonna', teaser:'eyes like spirals' },
  { src:'images/art13.png', title:'Sail of Fire', teaser:'sunlit wake' },
  { src:'images/art14.png', title:'Circuit Gaze', teaser:'signals and eyes' },
  { src:'images/art15.png', title:'Sail at Dusk', teaser:'harbor gold' },
  { src:'images/art16.png', title:'Island Light', teaser:'home by the water' },
  { src:'images/art17.png', title:'Maria Keeterna', teaser:'split-face harmony' },
  { src:'images/art18.png', title:'Howl', teaser:'fractured beast' },
  { src:'images/art19.png', title:'Mycelias Network', teaser:'wisdom, discrepancy' },
  { src:'images/art20.png', title:'What Is A Woman', teaser:'past, sacrifice' },
  { src:'images/art21.png', title:'Headdress', teaser:'selective, memory' },
  { src:'images/art22.png', title:'Fish 1', teaser:'abstract, fish' },
  { src:'images/art23.png', title:'Fish 2', teaser:'abstract, fish' },
  { src:'images/art24.png', title:'Meow 1', teaser:'cat, witch' },
  { src:'images/art25.png', title:'Meow 2', teaser:'cat, sometimes' }
];

const STORIES = [
  "Standing alone not knowing that there are billions.",
  "Crowns are for heads; she is the dream. She carries both. There is not a single day; we do not ever forget.",
  "Urban folklore in orange and cobalt. He smells like spray paint and good trouble, the kind of friend who returns your lighter with a better story attached.",
  "Hair as a night map—each curl a galaxy kiosk saying You Are Here. She's not posing; she's orbiting slowly, taking attendance of the planets.",
  "The lighthouse minds its own holiness while the weather auditions for disaster films. Paint, patience, gulls debating maritime policy—somehow the light keeps winning.",
  "She carries a galaxy in her hair like it's a casual Tuesday. Her look says: I've read your aura and it checks out—now do something brave. The circles orbit because gravity is a fan.",
  "Dawn on one flank, midnight on the other. The horse steps out of a star chart and onto asphalt, and the street has the good sense to hush.",
  "A roar engineered from geometry and gossip. Fear shows up, laughs, and stays for the party. Even monsters deserve flattering lighting.",
  "A horse built from rulers and fever dreams. Chrome bones, sunset mane, hooves that punch exclamation points into the dark. You can hear the snort: smoke, cinnamon, electricity.",
  "Everything with a deadline grew teeth. Elevators, invoices, that guy from accounting. The shark grins like a billboard for capitalism and swims off with your to-do list between its molars.",
  "Momentum is a language and the rider speaks it fast. Dirt leaps up to applaud; the horse bows without slowing. Somewhere a stopwatch faints.",
  "A saint for artists and beautiful mistakes. Her halo is a traffic circle for ideas; they merge, they honk, they find their lane and fly.",
  "Wind is the drummer, the boat is the bass line, and the sail—good Lord—the sail is a lighter flicked against the sky. Water copies everything like a devoted bootlegger and sells it back as gold.",
  "Her eyes are vinyl—warm, crackling—and all the geometry around her keeps trying to remix the track. Spoiler: the analog wins.",
  "The harbor liquefies into stained glass. Boats hover like prayer beads pulled slow through the hour. The sun signs its autograph and leaves town.",
  "Stairs to the sea, lemons in the air, a boat napping in cobalt. The moon RSVP'd yes and brought dessert.",
  "Two hemispheres arguing politely over coffee. One eye maps the freeway; the other counts stars like rosary beads. The face doesn't choose—she holds both suns in her jaw and walks out smiling.",
  "The canvas leans forward and bares its teeth. A junkyard radio tuned to moonlight, a carnival siren, a beast stitched from traffic cones and cathedral glass. You don't tame it—you tip your hat and let it pass through you like thunder.",
  "The future is a technological breakthrough into the nature of the realistically possible.",
  "Searching for the truth will always end in a battle.",
  "College studies can have that effect on you.",
  "A fish in the space of time heated by the sun.",
  "A fish in the space of time heated by the sun.",
  "A cat is about 32 years old in terms of personality.",
  "A cat is about 32 years old in terms of personality."
];

const images = FILES.map((f, i) => ({
  src: f.src,
  alt: f.title,
  title: f.title,
  teaser: f.teaser || '',
  story: STORIES[i] || ''
}));

/* ===== MASONRY GRID ===== */
const grid = document.getElementById('galleryGrid');

images.forEach((img, i) => {
  const item = document.createElement('div');
  item.className = 'masonry-item';

  const pic = document.createElement('img');
  pic.src = img.src;
  pic.alt = img.alt;
  pic.loading = i > 5 ? 'lazy' : 'eager';

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.innerHTML = `<strong>${img.title}</strong><span>${img.teaser}</span>`;

  item.append(pic, meta);
  item.addEventListener('click', () => openLightbox(i));
  grid.appendChild(item);
});

/* ===== LIGHTBOX ===== */
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

function openLightbox(i) {
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

function closeLightbox() {
  lb.classList.remove('is-open');
  document.body.style.overflow = '';
  if (lbKeyHandler) document.removeEventListener('keydown', lbKeyHandler);
}

function updateLightbox() {
  const it = images[lbIndex];
  lbImg.src = it.src;
  lbImg.alt = it.alt;
  lbTitle.textContent = it.title;
  lbDesc.textContent = it.story || '';
  lbCount.textContent = `${lbIndex + 1} / ${images.length}`;
}

function prevLightbox() { lbIndex = (lbIndex - 1 + images.length) % images.length; updateLightbox(); }
function nextLightbox() { lbIndex = (lbIndex + 1) % images.length; updateLightbox(); }

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevLightbox);
lbNext.addEventListener('click', nextLightbox);

lb.addEventListener('click', (e) => {
  if (!e.target.closest('.lb-frame') && !e.target.closest('.lb-nav') && !e.target.closest('.lb-close')) {
    closeLightbox();
  }
});

let lbStart = 0, lbDX = 0;
lbFrame.addEventListener('touchstart', (e) => { lbStart = e.touches[0].clientX; lbDX = 0; }, { passive: true });
lbFrame.addEventListener('touchmove', (e) => { lbDX = e.touches[0].clientX - lbStart; }, { passive: true });
lbFrame.addEventListener('touchend', () => {
  if (lbDX > 40) prevLightbox();
  else if (lbDX < -40) nextLightbox();
});
