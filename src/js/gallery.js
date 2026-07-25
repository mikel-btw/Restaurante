/**
 * ARCHIVO: gallery.js
 * PROPÓSITO: Filtrado de la galería de fotos por categoría y
 *   visor de imagen ampliada (lightbox) con navegación.
 * RESPONSABILIDAD: Solo lógica de interacción de galeria.html.
 *   Las imágenes y sus categorías se definen como atributos
 *   data-* directamente en el HTML (ver galeria.html).
 * DEPENDENCIAS: utils.js. Se ejecuta solo si existe #gallery-grid.
 * AUTOR: Equipo de desarrollo — El Leñador de Colombia
 * FECHA DE CREACIÓN: 2026-07-10
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const grid = Utils.qs('#gallery-grid');
  if (!grid) return;

  initFilters();
  const lightbox = initLightbox();
  bindGalleryClicks(lightbox);
});

function initFilters() {
  const filters = Utils.qs('#gallery-filters');
  const items = Utils.qsa('.gallery-item');
  if (!filters) return;

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.menu-tab');
    if (!btn) return;

    Utils.qsa('.menu-tab', filters).forEach((b) => b.setAttribute('aria-selected', 'false'));
    btn.setAttribute('aria-selected', 'true');

    const category = btn.dataset.category;
    items.forEach((item) => {
      const matches = category === 'all' || item.dataset.category === category;
      item.hidden = !matches;
    });
  });
}

/** Construye el lightbox (si no existe ya en el DOM) y devuelve sus controladores. */
function initLightbox() {
  let lightbox = Utils.qs('.lightbox');

  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Imagen ampliada de la galería');
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Cerrar imagen">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Imagen anterior">&#10094;</button>
      <img src="" alt="">
      <button class="lightbox-nav lightbox-next" aria-label="Imagen siguiente">&#10095;</button>
    `;
    document.body.appendChild(lightbox);
  }

  const imgEl = Utils.qs('img', lightbox);
  let currentIndex = 0;
  let visibleImages = [];

  function open(index) {
    visibleImages = Utils.qsa('.gallery-item:not([hidden]) img');
    if (!visibleImages.length) return;
    currentIndex = index;
    updateImage();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    Utils.qs('.lightbox-close', lightbox).focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function updateImage() {
    const src = visibleImages[currentIndex]?.src;
    const alt = visibleImages[currentIndex]?.alt;
    if (src) {
      imgEl.src = src;
      imgEl.alt = alt || '';
    }
  }

  function next() {
    currentIndex = (currentIndex + 1) % visibleImages.length;
    updateImage();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    updateImage();
  }

  Utils.qs('.lightbox-close', lightbox).addEventListener('click', close);
  Utils.qs('.lightbox-next', lightbox).addEventListener('click', next);
  Utils.qs('.lightbox-prev', lightbox).addEventListener('click', prev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  return { open };
}

function bindGalleryClicks(lightbox) {
  Utils.qsa('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      const visibleItems = Utils.qsa('.gallery-item:not([hidden])');
      const visibleIndex = visibleItems.indexOf(item);
      lightbox.open(visibleIndex >= 0 ? visibleIndex : 0);
    });

    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Ampliar imagen ${index + 1} de la galería`);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}
