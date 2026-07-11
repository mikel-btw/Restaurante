/**
 * ARCHIVO: main.js
 * PROPÓSITO: Comportamiento global compartido por TODAS las
 *   páginas del sitio.
 * RESPONSABILIDAD: navbar responsive (menú hamburguesa), header
 *   que cambia de estilo al hacer scroll, botón "volver arriba",
 *   banner de cookies, año dinámico del footer, cierre de menú
 *   con tecla Escape y al hacer click en un enlace.
 * DEPENDENCIAS: utils.js (debe cargarse antes que este archivo)
 * AUTOR: Equipo de desarrollo — El Leñador de Colombia
 * FECHA DE CREACIÓN: 2026-07-10
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initBackToTop();
  initCookieBanner();
  initFooterYear();
});

/**
 * Añade la clase `is-scrolled` al header cuando el usuario baja
 * más de 40px, para pasar de header transparente a header sólido.
 */
function initHeaderScroll() {
  const header = Utils.qs('.site-header');
  if (!header) return;

  const onScroll = Utils.throttle(() => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }, 100);

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Controla la apertura/cierre del menú de navegación en móvil,
 * incluyendo accesibilidad (aria-expanded, cierre con Escape,
 * cierre al seleccionar un enlace y bloqueo de scroll del body).
 */
function initMobileNav() {
  const toggle = Utils.qs('.nav-toggle');
  const menu = Utils.qs('.nav-menu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    menu.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  Utils.qsa('a', menu).forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
}

/**
 * Muestra un botón flotante "volver arriba" tras hacer scroll,
 * con desplazamiento suave al hacer click.
 */
function initBackToTop() {
  const btn = Utils.qs('.float-btn--top');
  if (!btn) return;

  const onScroll = Utils.throttle(() => {
    btn.classList.toggle('is-visible', window.scrollY > 480);
  }, 150);

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Banner de aviso de cookies/localStorage simple: se muestra una
 * vez y recuerda la elección del usuario en localStorage.
 * NOTA (zona editable): si el restaurante usa Google Analytics o
 * Meta Pixel, este es el lugar donde condicionar su carga a la
 * aceptación del usuario.
 */
function initCookieBanner() {
  const banner = Utils.qs('.cookie-banner');
  if (!banner) return;

  const STORAGE_KEY = 'lenador_cookie_consent';
  const alreadyAccepted = localStorage.getItem(STORAGE_KEY);

  if (!alreadyAccepted) {
    setTimeout(() => banner.classList.add('is-visible'), 1200);
  }

  const acceptBtn = Utils.qs('[data-cookie-accept]', banner);
  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    banner.classList.remove('is-visible');
  });
}

/** Inserta el año actual en cualquier elemento [data-current-year]. */
function initFooterYear() {
  Utils.qsa('[data-current-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}
