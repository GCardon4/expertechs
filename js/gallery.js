// Dynamic gallery builder for /images/gallery
// Generated manifest is embedded here (created from server-side filesystem)
const GALLERY_MANIFEST = {
  "alarmas": [
    { "src": "/images/gallery/alarmas/image_01.jpg", "caption": "Alarmas" }
  ],
  "camaras": [
    { "src": "/images/gallery/camaras/image_01.jpg", "caption": "Cámaras de Seguridad" },
    { "src": "/images/gallery/camaras/image_02.jpg", "caption": "Centro de Monitoreo" },
    { "src": "/images/gallery/camaras/image_03.jpg", "caption": "Cámaras de Seguridad" },
    { "src": "/images/gallery/camaras/image_04.jpg", "caption": "Cámaras de Seguridad" },
    { "src": "/images/gallery/camaras/image_05.jpg", "caption": "Centro de Monitoreo" },
    { "src": "/images/gallery/camaras/image_06.jpg", "caption": "Cámaras de Seguridad" },
    { "src": "/images/gallery/camaras/image_07.jpg", "caption": "Proyecto de Seguridad Ciudadana" },
    { "src": "/images/gallery/camaras/image_08.jpg", "caption": "Protección Perimetral on IA" },
    { "src": "/images/gallery/camaras/image_09.jpg", "caption": "Cámaras de Seguridad" },
    { "src": "/images/gallery/camaras/image_10.jpg", "caption": "Cámaras de Seguridad" },
    { "src": "/images/gallery/camaras/image_11.jpg", "caption": "Centro de Monitoreo" },
    { "src": "/images/gallery/camaras/image_12.jpg", "caption": "Cámaras de Seguridad" },
    { "src": "/images/gallery/camaras/image_13.jpg", "caption": "Cámaras de Seguridad" },
    { "src": "/images/gallery/camaras/image_14.jpg", "caption": "Cámaras de Seguridad" }
  ],
  "conectividad": [
    { "src": "/images/gallery/conectividad/image_01.jpg", "caption": "Conectividad" },
    { "src": "/images/gallery/conectividad/image_02.jpg", "caption": "Conectividad" },
    { "src": "/images/gallery/conectividad/image_03.jpg", "caption": "Conectividad" }
  ],
  "domotica": [],
  "fibra": [
    { "src": "/images/gallery/fibra/image_01.jpg", "caption": "Fibra Óptica" },
    { "src": "/images/gallery/fibra/image_02.jpg", "caption": "Fibra Óptica" },
    { "src": "/images/gallery/fibra/image_03.jpg", "caption": "Fibra Óptica" },
    { "src": "/images/gallery/fibra/image_04.jpg", "caption": "Fibra Óptica" },
    { "src": "/images/gallery/fibra/image_05.jpg", "caption": "Fibra Óptica" }
  ],
  "redes": [
    { "src": "/images/gallery/redes/image_01.jpg", "caption": "Redes" },
    { "src": "/images/gallery/redes/image_02.jpg", "caption": "Redes" },
    { "src": "/images/gallery/redes/image_03.jpg", "caption": "Redes" },
    { "src": "/images/gallery/redes/image_04.jpg", "caption": "Redes" }
  ],
  "video": [
    { "src": "/images/gallery/video/image_01.jpg", "caption": "Video Portero" },
    { "src": "/images/gallery/video/image_02.jpg", "caption": "Video Portero" },
    { "src": "/images/gallery/video/image_03.jpg", "caption": "Herrajes Metálicos" },
    { "src": "/images/gallery/video/image_04.jpg", "caption": "Instalaciones Personalizadas" },
    { "src": "/images/gallery/video/image_05.jpg", "caption": "Adecuación Civil" },
    { "src": "/images/gallery/video/image_06.jpg", "caption": "Video Portero" },
    { "src": "/images/gallery/video/image_07.jpg", "caption": "Herrajes Metálicos" },
    { "src": "/images/gallery/video/image_08.jpg", "caption": "Control de Acceso" },
    { "src": "/images/gallery/video/image_09.jpg", "caption": "Control de Acceso" },
    { "src": "/images/gallery/video/image_10.jpg", "caption": "Video Portero" },
    { "src": "/images/gallery/video/image_11.jpg", "caption": "Video Portero" },
    { "src": "/images/gallery/video/image_12.jpg", "caption": "Video Portero" }
  ]
};

function createFilterButton(key, isActive){
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-outline-primary btn-sm';
  if(isActive) btn.classList.remove('btn-outline-primary'), btn.classList.add('btn-primary');
  btn.textContent = key === 'all' ? 'Todas' : key.charAt(0).toUpperCase() + key.slice(1);
  btn.dataset.filter = key;
  return btn;
}

function renderGallery(filter){
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';

  // build a flat list of items with category info
  const items = [];
  Object.keys(GALLERY_MANIFEST).forEach(cat => {
    GALLERY_MANIFEST[cat].forEach(entry => {
      if (typeof entry === 'string') {
        items.push({ src: entry, cat, caption: null });
      } else {
        items.push({ src: entry.src, cat, caption: entry.caption || null });
      }
    });
  });

  const filtered = filter && filter !== 'all' ? items.filter(i => i.cat === filter) : items;

  // simple shuffle for varied collage
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }

  filtered.forEach((it, idx) => {
    const div = document.createElement('div');
    div.className = 'gallery-item lazy-fade';

    // assign variable spans to create collage effect
    const r = Math.random();
    if (r > 0.92) div.classList.add('span-3');
    else if (r > 0.7) div.classList.add('span-2');

    const img = document.createElement('img');
    img.src = it.src;
  img.alt = it.caption || `${it.cat} - ${idx+1}`;
    img.loading = 'lazy';
    img.className = 'img-fluid';

    const meta = document.createElement('div');
  meta.className = 'meta';
  const short = it.caption ? (it.caption.length > 40 ? it.caption.slice(0,37) + '...' : it.caption) : it.cat;
  meta.textContent = short;

    div.appendChild(img);
    div.appendChild(meta);

    // click => open modal
    div.addEventListener('click', function(){
      const modalImg = document.getElementById('galleryModalImg');
      const caption = document.getElementById('galleryModalCaption');
      modalImg.src = it.src;
      modalImg.alt = img.alt;
      caption.textContent = (it.caption ? it.caption + ' · ' : '') + it.cat + ` · ${idx+1}`;
      const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
      modal.show();
    });

    grid.appendChild(div);
  });

  // re-run lazy-image observer if present
  const lazyImages = [].slice.call(document.querySelectorAll('.lazy-fade'));
  if ('IntersectionObserver' in window) {
    let observer = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    lazyImages.forEach(function(el){ observer.observe(el); });
  } else {
    lazyImages.forEach(function(el){ el.classList.add('loaded'); });
  }
}

document.addEventListener('DOMContentLoaded', function(){
  const filtersWrap = document.getElementById('gallery-filters');
  // add 'all' button first
  filtersWrap.appendChild(createFilterButton('all', true));
  Object.keys(GALLERY_MANIFEST).forEach(k => {
    // skip empty categories
    const count = GALLERY_MANIFEST[k].length;
    if (count === 0) return;
    const btn = createFilterButton(k, false);
    filtersWrap.appendChild(btn);
  });

  // click handler for filters
  filtersWrap.addEventListener('click', function(e){
    const b = e.target.closest('button');
    if (!b) return;
    const filter = b.dataset.filter;
    // toggle active class
    Array.from(filtersWrap.querySelectorAll('button')).forEach(btn => {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline-primary');
    });
    b.classList.remove('btn-outline-primary');
    b.classList.add('btn-primary');
    renderGallery(filter);
  });

  // initial render
  renderGallery('all');
});
