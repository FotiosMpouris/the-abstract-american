document.addEventListener('DOMContentLoaded', () => {

    const artworks = [
        { file: 'art01.png', title: 'Chromatic Pulse', medium: 'Acrylic', dimensions: '24" x 36"' }, { file: 'art02.png', title: 'Urban Dreamscape', medium: 'Watercolor', dimensions: '18" x 24"' }, { file: 'art03.png', title: 'Artwork Title 03', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art04.png', title: 'Artwork Title 04', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art05.png', title: 'Artwork Title 05', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art06.png', title: 'Artwork Title 06', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art07.png', title: 'Artwork Title 07', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art08.png', title: 'Artwork Title 08', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art09.png', title: 'Artwork Title 09', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art10.png', title: 'Artwork Title 10', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art11.png', title: 'Artwork Title 11', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art12.png', title: 'Artwork Title 12', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art13.png', title: 'Artwork Title 13', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art14.png', title: 'Artwork Title 14', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art15.png', title: 'Artwork Title 15', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art16.png', title: 'Artwork Title 16', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art17.png', title: 'Artwork Title 17', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art18.png', title: 'Artwork Title 18', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art19.png', title: 'Artwork Title 19', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art20.png', title: 'Artwork Title 20', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art21.png', title: 'Artwork Title 21', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art22.png', title: 'Artwork Title 22', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art23.png', title: 'Artwork Title 23', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art24.png', title: 'Artwork Title 24', medium: 'Medium', dimensions: '00" x 00"' }, { file: 'art25.png', title: 'Artwork Title 25', medium: 'Medium', dimensions: '00" x 00"' }
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('art-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const modalClose = document.getElementById('modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');

    let currentModalIndex = 0;
    let galleryInterval = null;
    let galleryIndex = 0;
    const itemsPerCycle = window.innerWidth >= 769 ? 3 : 1;
    const cycleTime = 5000;

    function populateGallery() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = ''; // Clear existing items

        for (let i = 0; i < itemsPerCycle; i++) {
            const artIndex = (galleryIndex + i) % artworks.length;
            const art = artworks[artIndex];
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.animationDelay = `${i * 150}ms`;
            item.innerHTML = `<img src="images/${art.file}" alt="${art.title}">`;
            item.addEventListener('click', () => {
                currentModalIndex = artIndex;
                openModal();
            });
            galleryGrid.appendChild(item);
        }
        galleryIndex = (galleryIndex + itemsPerCycle) % artworks.length;
    }

    function startGalleryCycle() {
        populateGallery();
        galleryInterval = setInterval(populateGallery, cycleTime);
    }

    function updateModalContent() {
        const art = artworks[currentModalIndex];
        modalImg.src = `images/${art.file}`;
        modalTitle.textContent = art.title;
        modalDetails.textContent = `${art.medium} | ${art.dimensions}`;
    }

    function openModal() {
        updateModalContent();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        clearInterval(galleryInterval);
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        startGalleryCycle();
    }
    
    modalPrev.addEventListener('click', () => {
        currentModalIndex = (currentModalIndex - 1 + artworks.length) % artworks.length;
        updateModalContent();
    });

    modalNext.addEventListener('click', () => {
        currentModalIndex = (currentModalIndex + 1) % artworks.length;
        updateModalContent();
    });

    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });

    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    startGalleryCycle();
});
