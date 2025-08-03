document.addEventListener('DOMContentLoaded', () => {

    // --- ARTWORK LIST (Your action item) ---
    // Update this list with your 25 pieces.
    const artworks = [
        { file: 'art01.png', title: 'Chromatic Pulse', medium: 'Acrylic on Canvas', dimensions: '24" x 36"' },
        { file: 'art02.png', title: 'Urban Dreamscape', medium: 'Watercolor on Paper', dimensions: '18" x 24"' },
        // ... and so on for all 25 pieces
    ];

    // =================================================================
    // === NO MORE EDITING NEEDED BELOW THIS LINE ===
    // =================================================================

    const galleryContainer = document.getElementById('gallery-container');
    const modal = document.getElementById('art-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const closeButton = document.querySelector('.close-button');
    const header = document.getElementById('header');
    const heroFrame = document.querySelector('.hero-frame'); // NEW

    // Scroll-based animations
    window.addEventListener('scroll', () => {
        // Dynamic Navigation Bar
        const scrollPosition = window.scrollY;
        if (scrollPosition > window.innerHeight - 200) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
        
        // NEW: Fade out Hero Frame
        if (heroFrame) {
            if (scrollPosition > 50) {
                heroFrame.classList.add('hidden');
            } else {
                heroFrame.classList.remove('hidden');
            }
        }
    });

    // --- The rest of the script remains the same ---
    
    // Function to populate the new gallery format
    function populateGallery() {
        if (!galleryContainer) return;
        artworks.forEach((art) => {
            const card = document.createElement('div');
            card.className = 'art-card';
            card.innerHTML = `<div class="image-wrapper"><img src="images/${art.file}" alt="${art.title}" loading="lazy"></div><div class="art-details"><h3>${art.title}</h3><p>${art.medium} | ${art.dimensions}</p></div>`;
            card.addEventListener('click', () => openModal(art));
            galleryContainer.appendChild(card);
        });
    }

    // Intersection Observer for the "reveal" effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-in-view');
            }
        });
    }, { threshold: 0.4 }); 

    function observeCards() {
        const artCards = document.querySelectorAll('.art-card');
        artCards.forEach(card => observer.observe(card));
    }
    
    // Modal Functions
    function openModal(art) {
        modalImg.src = `images/${art.file}`;
        modalImg.alt = art.title;
        modalTitle.textContent = art.title;
        modalDetails.textContent = `${art.medium} | ${art.dimensions}`;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.style.display === 'flex') closeModal(); });

    // Initialize
    populateGallery();
    observeCards();
});
