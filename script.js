document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // === THE DEFINITIVE ARTWORK LIST ===
    // This list MUST contain an entry for every image you want to display.
    // If an image is missing on the site, add its entry here.
    // Your only task is to edit the `title`, `medium`, and `dimensions`.
    // =================================================================
    const artworks = [
        { file: 'art01.png', title: 'Chromatic Pulse', medium: 'Acrylic', dimensions: '24" x 36"' },
        { file: 'art02.png', title: 'Urban Dreamscape', medium: 'Watercolor', dimensions: '18" x 24"' },
        { file: 'art03.png', title: 'Artwork Title 03', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art04.png', title: 'Artwork Title 04', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art05.png', title: 'Artwork Title 05', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art06.png', title: 'Artwork Title 06', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art07.png', title: 'Artwork Title 07', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art08.png', title: 'Artwork Title 08', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art09.png', title: 'Artwork Title 09', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art10.png', title: 'Artwork Title 10', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art11.png', title: 'Artwork Title 11', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art12.png', title: 'Artwork Title 12', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art13.png', title: 'Artwork Title 13', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art14.png', title: 'Artwork Title 14', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art15.png', title: 'Artwork Title 15', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art16.png', title: 'Artwork Title 16', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art17.png', title: 'Artwork Title 17', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art18.png', title: 'Artwork Title 18', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art19.png', title: 'Artwork Title 19', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art20.png', title: 'Artwork Title 20', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art21.png', title: 'Artwork Title 21', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art22.png', title: 'Artwork Title 22', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art23.png', title: 'Artwork Title 23', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art24.png', title: 'Artwork Title 24', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art25.png', title: 'Artwork Title 25', medium: 'Medium', dimensions: '00" x 00"' }
    ];

    // --- Elements ---
    const splashScreen = document.getElementById('splash-screen');
    const enterButton = document.getElementById('enter-button');
    const music = document.getElementById('background-music');
    const musicButton = document.getElementById('music-button');
    const galleryStage = document.getElementById('gallery-stage');
    const modal = document.getElementById('art-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const closeButton = document.querySelector('.close-button');

    let currentImageIndex = 0;
    let galleryInterval = null;

    // --- Rhythmic Gallery Logic ---
    function showNextImage() {
        if (!galleryStage) return;
        const oldImage = galleryStage.querySelector('.current');
        if (oldImage) {
            oldImage.classList.remove('current');
            oldImage.classList.add('outgoing');
            setTimeout(() => { if (oldImage && oldImage.parentElement) { oldImage.parentElement.removeChild(oldImage); } }, 1200);
        }

        const nextArt = artworks[currentImageIndex];
        const newImage = document.createElement('div');
        newImage.className = 'stage-image incoming';
        newImage.innerHTML = `<img src="images/${nextArt.file}" alt="${nextArt.title}">`;
        
        newImage.addEventListener('click', () => { openModal(nextArt); });
        galleryStage.appendChild(newImage);

        setTimeout(() => { newImage.classList.remove('incoming'); newImage.classList.add('current'); }, 50);

        currentImageIndex = (currentImageIndex + 1) % artworks.length;
    }

    function startGallery() {
        if (galleryInterval) clearInterval(galleryInterval);
        showNextImage();
        const BPM = 125;
        const slideCycleDuration = (60 / BPM) * 3;
        galleryInterval = setInterval(showNextImage, slideCycleDuration * 1000);
    }

    // --- Music & Modal Control ---
    function toggleMusic() {
        if (music.paused) {
            music.play();
            musicButton.innerHTML = '❚❚';
            if (galleryInterval === null) startGallery();
        } else {
            music.pause();
            musicButton.innerHTML = '▶';
        }
    }

    function openModal(art) {
        if (!modal) return;
        modalImg.src = `images/${art.file}`;
        modalTitle.textContent = art.title;
        modalDetails.textContent = `${art.medium} | ${art.dimensions}`;
        modal.style.display = 'flex';
        if (galleryInterval) clearInterval(galleryInterval);
        galleryInterval = null;
        if (!music.paused) music.pause();
        musicButton.innerHTML = '▶';
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        if (galleryInterval === null) startGallery();
        if (music.paused) music.play();
        musicButton.innerHTML = '❚❚';
    }

    // --- Entry Point ---
    enterButton.addEventListener('click', () => {
        splashScreen.style.opacity = '0';
        splashScreen.style.pointerEvents = 'none';
        window.scrollTo(0, 0);
        music.play();
        startGallery();
    });

    // --- Navigation ---
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // --- Event Listeners ---
    musicButton.addEventListener('click', toggleMusic);
    if(closeButton) closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => { if (event.target == modal) closeModal(); });
});
