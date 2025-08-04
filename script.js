document.addEventListener('DOMContentLoaded', () => {

   
    // Corrected and complete artworks array in script.js
const artworks = [
    // === YOUR ACTION REQUIRED: EDIT THE DETAILS FOR EACH PIECE ===
    // Make sure the 'file' name matches your image file exactly.
    
    { file: 'art01.png', title: 'Chromatic Pulse', medium: 'Acrylic on Canvas', dimensions: '24" x 36"' },
    { file: 'art02.png', title: 'Urban Dreamscape', medium: 'Watercolor on Paper', dimensions: '18" x 24"' },
    { file: 'art03.png', title: 'Title for art03.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art04.png', title: 'Title for art04.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art05.png', title: 'Title for art05.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art06.png', title: 'Title for art06.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art07.png', title: 'Title for art07.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art08.png', title: 'Title for art08.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art09.png', title: 'Title for art09.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art10.png', title: 'Title for art10.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art11.png', title: 'Title for art11.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art12.png', title: 'Title for art12.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art13.png', title: 'Title for art13.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art14.png', title: 'Title for art14.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art15.png', title: 'Title for art15.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art16.png', title: 'Title for art16.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art17.png', title: 'Title for art17.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art18.png', title: 'Title for art18.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art19.png', title: 'Title for art19.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art20.png', title: 'Title for art20.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art21.png', title: 'Title for art21.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art22.png', title: 'Title for art22.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art23.png', title: 'Title for art23.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art24.png', title: 'Title for art24.png', medium: 'Medium', dimensions: '00" x 00"' },
    { file: 'art25.png', title: 'Title for art25.png', medium: 'Medium', dimensions: '00" x 00"' }
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
