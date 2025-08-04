document.addEventListener('DOMContentLoaded', () => {

    // --- ARTWORK LIST (Your action item) ---
  // Corrected and complete artworks array in script.js
const artworks = [
    // === YOUR ACTION REQUIRED: EDIT THE DETAILS FOR EACH PIECE ===
    // Make sure the 'file' name matches your image file exactly.
    
    { file: 'art01.png', title: 'The Independent Fox', medium: 'gouache on canvas', dimensions: '24" x 36"' },
    { file: 'art02.png', title: 'The American Dream', medium: 'gouache on canvas', dimensions: '16" x 20"' },
    { file: 'art03.png', title: 'What Time Is It', medium: 'Medium', dimensions: '00" x 00"' },
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
