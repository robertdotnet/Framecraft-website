const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;

function openLightbox(index) {
  const item = galleryItems[index];
  const imageUrl = item.getAttribute('href');
  const caption = item.dataset.caption || item.querySelector('strong')?.textContent || '';

  currentIndex = index;
  lightboxImage.src = imageUrl;
  lightboxImage.alt = caption || 'Expanded portfolio item';
  lightboxCaption.textContent = caption;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showNext() {
  const nextIndex = (currentIndex + 1) % galleryItems.length;
  openLightbox(nextIndex);
}

function showPrev() {
  const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(prevIndex);
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    openLightbox(index);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNext);
lightboxPrev.addEventListener('click', showPrev);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;

  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') showNext();
  if (event.key === 'ArrowLeft') showPrev();
});