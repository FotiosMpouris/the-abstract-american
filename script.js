document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // === YOUR ACTION REQUIRED: EDIT THE ARTWORK LIST BELOW ===
    // =================================================================
    // I've created 25 placeholders for you.
    // Just update the file names, titles, and other details for each piece.

    const artworks = [
        // Replace these placeholders with your actual art details
        { file: 'art01.png', title: 'Chromatic Pulse', medium: 'Acrylic on Canvas', dimensions: '24" x 36"' },
        { file: 'art02.png', title: 'Urban Dreamscape', medium: 'Watercolor on Paper', dimensions: '18" x 24"' },
        { file: 'art03.png', title: 'Subterranean Flow', medium: 'Gouache and Ink', dimensions: '22" x 22"' },
        { file: 'art04.png', title: 'Artwork Title 4', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art05.png', title: 'Artwork Title 5', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art06.png', title: 'Artwork Title 6', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art07.png', title: 'Artwork Title 7', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art08.png', title: 'Artwork Title 8', medium: 'Medium', dimensions: '00" x 00"' },
        { file: 'art09.png', title: 'Artwork Title 9', medium: 'Medium', dimensions: '00" x 00"' },
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
        { file: 'art25.png', title: 'Artwork Title 25', medium: 'Medium', dimensions: '00" x 00"' },
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

    // Dynamic Navigation Bar
    const heroSection = document.getElementById('hero');
    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom - 200) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    });

    // Function to populate the new gallery format
    function populateGallery() {
        if (!galleryContainer) return;
        
        artworks.forEach((art) => {
            const card = document.createElement('div');
            card.className = 'art-card';

            card.innerHTML = `
                <div class="image-wrapper">
                    <img src="images/${art.file}" alt="${art.title}" loading="lazy">
                </div>
                <div class="art-details">
                    <h3>${art.title}</h3>
                    <p>${art.medium} | ${art.dimensions}</p>
                </div>
            `;
            
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
    }, { threshold: 0.4 }); // Trigger when 40% of the item is visible

    function observeCards() {
        const artCards = document.querySelectorAll('.art-card');
        artCards.forEach(card => observer.observe(card));
    }
    
    // Modal Functions (largely unchanged)
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
    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });

    // Initialize
    populateGallery();
    observeCards();
});
