document.addEventListener('DOMContentLoaded', () => {

    // --- YOUR ACTION REQUIRED: FILL THIS LIST! ---
    const artworks = [
        { file: 'art01.png', title: 'Chromatic Pulse', medium: 'Acrylic on Canvas', dimensions: '24" x 36"' },
        { file: 'art02.png', title: 'Urban Dreamscape', medium: 'Watercolor on Paper', dimensions: '18" x 24"' },
        // ... YOU MUST FILL THIS WITH ALL 25 PIECES TO SEE THEM ...
        { file: 'art25.png', title: 'Final Piece', medium: 'Medium', dimensions: '00" x 00"' }
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
    function showNextImage() {
        const oldImage = galleryStage.querySelector('.current');
        if (oldImage) {
            oldImage.classList.remove('current');
            oldImage.classList.add('outgoing');
            // Remove the old image from the DOM after it slides out
            setTimeout(() => {
                if (oldImage && oldImage.parentElement) {
                     oldImage.parentElement.removeChild(oldImage);
                }
            }, 700);
        }

        // Create the new image element
        const nextArt = artworks[currentImageIndex];
        const newImage = document.createElement('div');
        newImage.className = 'stage-image incoming';
        newImage.innerHTML = `<img src="images/${nextArt.file}" alt="${nextArt.title}">`;
        
        // Add click listener for modal
        newImage.addEventListener('click', () => {
            openModal(nextArt);
            clearInterval(galleryInterval); // Stop the gallery when modal is open
            music.pause(); // Also pause music
            musicButton.innerHTML = '▶';
        });

        galleryStage.appendChild(newImage);

        // Animate the new image in
        setTimeout(() => {
            newImage.classList.remove('incoming');
            newImage.classList.add('current');
        }, 50); // Short delay to ensure transition applies

        // Update index for the next cycle
        currentImageIndex = (currentImageIndex + 1) % artworks.length;
    }

    function startGallery() {
        showNextImage(); // Show the first image immediately
        const BPM = 125;
        const slideDuration = (60 / BPM) * 3; // Slide every 3 counts
        galleryInterval = setInterval(showNextImage, slideDuration * 1000);
    }

    // --- Music Control ---
    function toggleMusic() {
        if (music.paused) {
            music.play();
            musicButton.innerHTML = '❚❚';
            // If the gallery was stopped for the modal, restart it
            if (!galleryInterval) {
                 startGallery();
            }
        } else {
            music.pause();
            musicButton.innerHTML = '▶';
        }
    }
    musicButton.addEventListener('click', toggleMusic);

    // --- Entry Point ---
    enterButton.addEventListener('click', () => {
        splashScreen.style.opacity = '0';
        splashScreen.style.pointerEvents = 'none';
        
        music.play();
        startGallery();
    });

    // --- Modal Logic (largely unchanged) ---
    const modal = document.getElementById('art-modal');
    function openModal(art) { /* ... same as before ... */ }
    function closeModal() {
        modal.style.display = 'none';
        // Restart music and gallery when modal is closed
        toggleMusic(); 
    }
    // ... rest of modal listeners ...
});
