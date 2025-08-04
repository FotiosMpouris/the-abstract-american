document.addEventListener('DOMContentLoaded', () => {
    // --- YOUR ACTION: COMPLETE THIS LIST ---
    const artworks = [
        { file: 'art01.png', title: 'Chromatic Pulse', medium: 'Acrylic', dimensions: '24" x 36"' },
        { file: 'art02.png', title: 'Urban Dreamscape', medium: 'Watercolor', dimensions: '18" x 24"' },
        // ... ALL 25 PIECES MUST BE LISTED HERE ...
    ];

    // --- Elements ---
    const splashScreen = document.getElementById('splash-screen');
    const enterButton = document.getElementById('enter-button');
    const music = document.getElementById('background-music');
    const musicButton = document.getElementById('music-button');
    const galleryStage = document.getElementById('gallery-stage');

    let currentImageIndex = 0;
    let galleryInterval;

    // --- Rhythmic Gallery Logic ---
    function showNextImage() { /* ... unchanged from before ... */ }
    function startGallery() {
        if (galleryInterval) clearInterval(galleryInterval); // Clear any existing timer
        showNextImage();
        const BPM = 125;
        const slideDuration = (60 / BPM) * 3;
        galleryInterval = setInterval(showNextImage, slideDuration * 1000);
    }
    
    // --- Music & Modal Control ---
    function toggleMusic() { /* ... unchanged ... */ }
    musicButton.addEventListener('click', toggleMusic);
    function openModal(art) {
        /* ... Open modal logic ... */
        clearInterval(galleryInterval);
        galleryInterval = null; // Mark the gallery as stopped
        if (!music.paused) music.pause();
        musicButton.innerHTML = '▶';
    }
    function closeModal() {
        /* ... Close modal logic ... */
        if (galleryInterval === null) startGallery(); // Restart gallery only if it was stopped
        if (music.paused) music.play();
        musicButton.innerHTML = '❚❚';
    }

    // --- FIX: ENTRY POINT LOGIC ---
    enterButton.addEventListener('click', () => {
        splashScreen.style.opacity = '0';
        splashScreen.style.pointerEvents = 'none';
        // Ensure we're at the top of the page
        window.scrollTo(0, 0); 
        music.play();
        startGallery();
    });

    // --- FIX: RESTORED NAVIGATION SCROLLING ---
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Modal setup (simplified) ---
    const modal = document.getElementById('art-modal');
    const closeBtn = document.querySelector('.close-button');
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => { if (event.target == modal) closeModal(); });
});
