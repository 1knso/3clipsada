document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    // Carga de datos
    fetch('gallery.json')
        .then(res => res.json())
        .then(data => {
            data.obras.forEach((obra, i) => {
                const item = document.createElement('div');
                item.className = 'art-card';
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                
                item.innerHTML = `
                    <div class="image-container" onclick="zoom('${obra.filename}')">
                        <img src="${obra.filename}" alt="${obra.title}">
                    </div>
                    <div class="card-meta">
                        <h2>${obra.title.toUpperCase()}</h2>
                        <span>${obra.technique} // ${obra.year}</span>
                    </div>
                `;
                grid.appendChild(item);
                
                // Animación de entrada secuencial
                setTimeout(() => {
                    item.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, i * 150);
            });
        });

    window.zoom = (src) => {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    document.getElementById('close-btn').onclick = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
});
