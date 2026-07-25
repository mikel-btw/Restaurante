/**
 * ARCHIVO: menu.js
 * PROPÓSITO: Construir dinámicamente la página de menú a partir
 *   de menu-data.js: pestañas de categoría, tarjetas de platos,
 *   buscador en vivo y estado "sin resultados".
 * RESPONSABILIDAD: Únicamente lógica de renderizado e interacción
 *   del menú. No contiene datos de platos (ver menu-data.js).
 * DEPENDENCIAS: utils.js, menu-data.js. Se ejecuta solo si existe
 *   el contenedor #menu-grid en la página (menu.html).
 * AUTOR: Equipo de desarrollo — El Leñador de Colombia
 * FECHA DE CREACIÓN: 2026-07-10
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const grid = Utils.qs('#menu-grid');
  if (!grid) return; // Esta página no es menu.html, no hacer nada.

  const state = {
    activeCategory: 'all',
    searchTerm: '',
  };

  renderTabs();
  renderGrid();
  bindSearch();

  /** Construye las pestañas "Todos" + una por categoría. */
  function renderTabs() {
    const tabsContainer = Utils.qs('#menu-tabs');
    if (!tabsContainer) return;

    const allTab = createTabButton('all', 'Todos');
    tabsContainer.appendChild(allTab);

    MENU_CATEGORIES.forEach((cat) => {
      tabsContainer.appendChild(createTabButton(cat.id, cat.label));
    });

    tabsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.menu-tab');
      if (!btn) return;

      Utils.qsa('.menu-tab', tabsContainer).forEach((t) =>
        t.setAttribute('aria-selected', 'false')
      );
      btn.setAttribute('aria-selected', 'true');

      state.activeCategory = btn.dataset.category;
      renderGrid();
    });
  }

  function createTabButton(categoryId, label) {
    const btn = document.createElement('button');
    btn.className = 'menu-tab';
    btn.type = 'button';
    btn.dataset.category = categoryId;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', categoryId === 'all' ? 'true' : 'false');
    btn.textContent = label;
    return btn;
  }

  /** Conecta el input de búsqueda con el filtrado (debounced). */
  function bindSearch() {
    const input = Utils.qs('#menu-search-input');
    if (!input) return;

    input.addEventListener(
      'input',
      Utils.debounce((e) => {
        state.searchTerm = Utils.normalize(e.target.value.trim());
        renderGrid();
      }, 200)
    );
  }

  /** Filtra MENU_ITEMS según categoría activa y término de búsqueda. */
  function getFilteredItems() {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        state.activeCategory === 'all' || item.category === state.activeCategory;

      const matchesSearch =
        state.searchTerm === '' ||
        Utils.normalize(item.name).includes(state.searchTerm) ||
        Utils.normalize(item.description).includes(state.searchTerm);

      return matchesCategory && matchesSearch;
    });
  }

  /** Vuelve a pintar la grilla completa según el estado actual. */
  function renderGrid() {
    const items = getFilteredItems();
    const emptyState = Utils.qs('#menu-empty-state');

    grid.innerHTML = '';

    if (items.length === 0) {
      emptyState?.classList.add('is-visible');
      return;
    }
    emptyState?.classList.remove('is-visible');

    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.appendChild(buildDishCard(item)));
    grid.appendChild(fragment);
  }

  /** Crea el nodo DOM de una tarjeta de plato individual. */
  function buildDishCard(item) {
    const article = document.createElement('article');
    article.className = 'card dish-card';
    article.setAttribute('data-reveal', '');

    const tagsHTML = item.tags
      .map((tag) => {
        const labelMap = { popular: 'Popular', picante: 'Picante', vegetariano: 'Vegetariano' };
        return `<span class="badge badge--${tag === 'picante' ? 'spicy' : tag === 'vegetariano' ? 'veg' : 'popular'}">${labelMap[tag] || tag}</span>`;
      })
      .join('');

    article.innerHTML = `
      <div class="dish-card__media">
        <img src="${item.image}" alt="${Utils.escapeHTML(item.name)}" loading="lazy" width="400" height="300"
             onerror="this.src='assets/images/menu/placeholder-plato.jpg'">
      </div>
      <div class="dish-card__body">
        <div class="dish-card__top">
          <h3>${Utils.escapeHTML(item.name)}</h3>
          <span class="dish-card__price">${Utils.formatCOP(item.price)}</span>
        </div>
        <p class="dish-card__desc">${Utils.escapeHTML(item.description)}</p>
        ${tagsHTML ? `<div class="dish-card__tags">${tagsHTML}</div>` : ''}
      </div>
    `;

    return article;
  }
});
