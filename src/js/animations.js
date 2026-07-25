/**
 * ARCHIVO: animations.js
 * PROPÓSITO: Activar las animaciones de "aparición al hacer
 *   scroll" definidas en animations.css (atributo [data-reveal]).
 * RESPONSABILIDAD: Usar IntersectionObserver (no scroll listeners
 *   costosos) para añadir la clase `is-visible` cuando un
 *   elemento entra en el viewport. Respeta prefers-reduced-motion.
 * DEPENDENCIAS: utils.js
 * AUTOR: Equipo de desarrollo — El Leñador de Colombia
 * FECHA DE CREACIÓN: 2026-07-10
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
});

function initScrollReveal() {
  const targets = Utils.qsa('[data-reveal]');
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    // Fallback: navegadores muy antiguos sin soporte, mostrar todo directo.
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}
