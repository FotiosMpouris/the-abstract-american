document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // === YOUR ACTION REQUIRED: EDIT THE ARTWORK LIST BELOW ===
    // =================================================================
    // Instructions:
    // 1. Add your image files to the `/images` folder.
    // 2. For each piece of art, create a new object in the `artworks` array.
    // 3. Make sure the `file` name matches your image file in the `/images` folder exactly.
    // 4. Fill in the `title`, `medium`, and `dimensions` for each piece.
    // 5. To add more art, just copy one of the objects, paste it at the end of the list, and change the details.

    const artworks = [
        {
            file: 'art01.png',
            title: 'Chromatic Pulse',
            medium: 'Acrylic on Canvas',
            dimensions: '24" x 36"'
        },
        {
            file: 'art02.png',
            title: 'Urban Dreamscape',
            medium: 'Watercolor on Paper',
            dimensions: '18" x 24"'
        },
        {
            file: 'art03.png',
            title: 'Subterranean Flow',
            medium: 'Gouache and Ink',
            dimensions: '22" x 22"'
        },
        // --- Add your next 22+ pieces below this line ---
        // Example for a new piece:
        // {
        //     file: 'art04.png',
        //     title: 'New Artwork Title',
        //     medium: 'Medium Used',
        //     dimensions: 'Width x Height'
        // },
        
    ];

    // =================================================================
    // === NO MORE EDITING NEEDED BELOW THIS LINE ===
    // =================================================================

    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('art-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const closeButton = document.querySelector('.close-button');

    // Function to create and display gallery
    function populateGallery() {
        if (!galleryGrid) return;
        
        artworks.forEach((art, index) => {
            const card = document.createElement('div');
            card.className = 'art-card';
            card.style.animationDelay = `${index * 100}ms`; // Staggered fade-in effect
            
            const img = document.createElement('img');
            img.src = `images/${art.file}`;
            img.alt = art.title;
            img.loading = 'lazy'; // Improves performance

            card.appendChild(img);
            
            card.addEventListener('click', () => {
                openModal(art);
            });
            
            galleryGrid.appendChild(card);
        });
    }

    // Function to open the modal with specific art info
    function openModal(art) {
        modalImg.src = `images/${art.file}`;
        modalImg.alt = art.title;
        modalTitle.textContent = art.title;
        modalDetails.textContent = `${art.medium} | ${art.dimensions}`;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners
    closeButton.addEventListener('click', closeModal);
    
    // Close modal if user clicks outside the content area
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // Initialize the gallery
    populateGallery();
});
