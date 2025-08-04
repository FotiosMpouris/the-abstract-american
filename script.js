document.addEventListener('DOMContentLoaded', () => {

    // --- ARTWORK LIST (Your action item) ---
    const artworks = [
        { file: 'art01.png', title: 'Chromatic Pulse', medium: 'Acrylic on Canvas', dimensions: '24" x 36"' },
        { file: 'art02.png', title: 'Urban Dreamscape', medium: 'Watercolor on Paper', dimensions: '18" x 24"' },
        // ... ALL 25 OF YOUR PIECES MUST BE IN THIS LIST ...
        { file: 'art03.png', title: 'Title for art03.png', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art04.png', title: 'Title for art04.png', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art05.png', title: 'Title for art05.png', medium: 'Medium', dimensions: '00" x 00"' },
        // ... etc
    ];

    // =================================================================
    // === NEW KINETIC WALL LOGIC ===
    // =================================================================
    const splashScreen = document.getElementById('splash-screen');
    const enterButton = document.getElementById('enter-button');
    const music = document.getElementById('background-music');
    const scrollers = document.querySelectorAll('.scroller');

    // Populate the scrollers
    const scrollerTop = document.getElementById('scroller-top');
    const scrollerBottom = document.getElementById('scroller-bottom');

    const addArtToScroller = (scroller, art) => {
        const card = document.createElement('div');
        card.className = 'scroller-art-card';
        card.innerHTML = `<img src="images/${art.file}" alt="${art.title}" loading="lazy">`;
        card.addEventListener('click', () => {
            openModal(art);
            // Pause the animation when modal opens
            scrollers.forEach(s => s.classList.add('paused'));
        });
        scroller.appendChild(card);
    };

    // Add images to each scroller twice for the infinite loop
    artworks.forEach(art => addArtToScroller(scrollerTop, art));
    artworks.forEach(art => addArtToScroller(scrollerTop, art));

    artworks.forEach(art => addArtToScroller(scrollerBottom, art));
    artworks.forEach(art => addArtToScroller(scrollerBottom, art));


    // Enter Site Logic
    enterButton.addEventListener('click', () => {
        splashScreen.style.opacity = '0';
        splashScreen.style.pointerEvents = 'none';
        
        // Browsers require a user interaction to play audio
        music.play();

        // Start the animation
        scrollers.forEach(scroller => {
            scroller.classList.add('running');
        });
    });

    // Modal elements and functions
    const modal = document.getElementById('art-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const closeButton = document.querySelector('.close-button');

    function openModal(art) {
        modalImg.src = `images/${art.file}`;
        modalTitle.textContent = art.title;
        modalDetails.textContent = `${art.medium} | ${art.dimensions}`;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Resume animation when modal closes
        scrollers.forEach(s => s.classList.remove('paused'));
    }

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
});
