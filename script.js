/* ============================================================
   CASA CHOCAYA — script.js
   ============================================================ */


/* ============================================================
   HEADER — transparent → opaque on scroll
   ============================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ============================================================
   HAMBURGER MENU
   ============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});


/* ============================================================
   GALLERY LIGHTBOX
   ============================================================ */
const galleryImgs  = Array.from(document.querySelectorAll('.gallery-item img'));
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = galleryImgs[index].src;
  lightboxImg.alt = galleryImgs[index].alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + galleryImgs.length) % galleryImgs.length;
  lightboxImg.src = galleryImgs[currentIndex].src;
  lightboxImg.alt = galleryImgs[currentIndex].alt;
}

galleryImgs.forEach((img, i) => {
  img.addEventListener('click', () => openLightbox(i));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigate(-1));
lightboxNext.addEventListener('click', () => navigate(1));

/* Close on backdrop click */
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

/* Keyboard navigation */
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   navigate(-1);
  if (e.key === 'ArrowRight')  navigate(1);
});

/* Touch/swipe support for mobile */
let touchStartX = 0;

lightbox.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', e => {
  const delta = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 50) navigate(delta < 0 ? 1 : -1);
}, { passive: true });


/* ============================================================
   DISTRIBUCIÓN — ROOM CAROUSEL
   ============================================================ */
const layoutTrack = document.getElementById('layoutTrack');
const layoutPrev  = document.getElementById('layoutPrev');
const layoutNext  = document.getElementById('layoutNext');

function getCardStep() {
  const card = layoutTrack.querySelector('.room-card');
  if (!card) return 340;
  return card.offsetWidth + 24; // card width + gap
}

layoutPrev.addEventListener('click', () => {
  layoutTrack.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
});

layoutNext.addEventListener('click', () => {
  layoutTrack.scrollBy({ left: getCardStep(), behavior: 'smooth' });
});

// Per-card image cycling
document.querySelectorAll('.room-card').forEach(card => {
  const images = JSON.parse(card.dataset.images || '[]');
  if (images.length <= 1) return;

  const img    = card.querySelector('.room-img');
  const dots   = card.querySelectorAll('.room-dot');
  const prev   = card.querySelector('.room-img-prev');
  const next   = card.querySelector('.room-img-next');
  let idx = 0;

  function goTo(n) {
    idx = (n + images.length) % images.length;
    img.src = images[idx];
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  prev.addEventListener('click', e => { e.stopPropagation(); goTo(idx - 1); });
  next.addEventListener('click', e => { e.stopPropagation(); goTo(idx + 1); });
});

// "Ver más" toggle
document.querySelectorAll('.room-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const details = btn.closest('.room-card').querySelector('.room-details');
    const isOpen  = !details.hidden;
    details.hidden = isOpen;
    btn.textContent = isOpen ? 'Ver más' : 'Ver menos';
  });
});


/* ============================================================
   MODAL COMODIDADES
   ============================================================ */
const modalOverlay  = document.getElementById('modalComodidades');
const btnAmenities  = document.getElementById('btnAmenities');
const modalClose    = document.getElementById('modalClose');

function openModal() {
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

btnAmenities.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
});


/* ============================================================
   SCROLL REVEAL — IntersectionObserver
   ============================================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));
