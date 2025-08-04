document.addEventListener('DOMContentLoaded', () => {

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

    const header = document.getElementById('header');
    const galleryStage = document.getElementById('gallery-stage');
    const galleryInfo = document.getElementById('gallery-info');
    const modal = document.getElementById('art-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const closeButton = document.querySelector('.close-button');
    
    let currentImageIndex = 0;
    let galleryInterval = null;
    const cycleTime = 4000;

    window.addEventListener('scroll', () => {
        if (!header) return;
        if (window.scrollY > window.innerHeight * 0.5) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    });

    function showNextImage() {
        if (!galleryStage || artworks.length === 0) return;

        const currentActive = galleryStage.querySelector('.active');
        if (currentActive) {
            currentActive.classList.remove('active');
            currentActive.classList.add('exiting');
            setTimeout(() => { if (currentActive) currentActive.remove(); }, 1200);
        }

        const art = artworks[currentImageIndex];
        const newItem = document.createElement('div');
        newItem.className = 'stage-item';
        newItem.innerHTML = `<img src="images/${art.file}" alt="${art.title}">`;
        newItem.addEventListener('click', () => { openModal(art); });
        
        galleryStage.appendChild(newItem);
        if (galleryInfo) galleryInfo.textContent = art.title;

        setTimeout(() => { newItem.classList.add('active'); }, 50);

        currentImageIndex = (currentImageIndex + 1) % artworks.length;
    }

    function startGallery() {
        if (galleryInterval) clearInterval(galleryInterval);
        showNextImage();
        galleryInterval = setInterval(showNextImage, cycleTime);
    }

    function openModal(art) {
        if (!modal) return;
        clearInterval(galleryInterval);
        modalImg.src = `images/${art.file}`;
        modalTitle.textContent = art.title;
        modalDetails.textContent = `${art.medium} | ${art.dimensions}`;
        modal.style.display = 'flex';
    }



    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        startGallery();
    }

    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    if (closeButton) closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => { if (event.target == modal) closeModal(); });

    startGallery();
});
