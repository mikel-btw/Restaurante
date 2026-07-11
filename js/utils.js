/**
 * ARCHIVO: utils.js
 * PROPÓSITO: Funciones auxiliares puras y reutilizables por el
 *   resto de módulos JS del sitio (sin efectos secundarios de
 *   inicialización propios).
 * RESPONSABILIDAD: debounce, throttle, formateo de moneda,
 *   selección de DOM abreviada, sanitización básica de inputs.
 * DEPENDENCIAS: Ninguna. Debe cargarse antes que los demás
 *   scripts (main.js, menu.js, gallery.js, forms.js, animations.js).
 * AUTOR: Equipo de desarrollo — El Leñador de Colombia
 * FECHA DE CREACIÓN: 2026-07-10
 */

'use strict';

const Utils = (() => {

  /** Selector corto: retorna el primer elemento que coincide. */
  const qs = (selector, scope = document) => scope.querySelector(selector);

  /** Selector corto: retorna un array de elementos (no NodeList). */
  const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  /**
   * Debounce: retrasa la ejecución de fn hasta que pasen `wait`ms
   * sin nuevas llamadas. Útil para inputs de búsqueda y resize.
   */
  function debounce(fn, wait = 200) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(null, args), wait);
    };
  }

  /**
   * Throttle: garantiza que fn se ejecute como máximo una vez
   * cada `limit`ms. Útil para el evento scroll.
   */
  function throttle(fn, limit = 150) {
    let inThrottle = false;
    return (...args) => {
      if (!inThrottle) {
        fn.apply(null, args);
        inThrottle = true;
        setTimeout(() => { inThrottle = false; }, limit);
      }
    };
  }

  /** Formatea un número entero como pesos colombianos: 25000 -> "$25.000". */
  function formatCOP(value) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  /**
   * Sanitiza texto simple de un input para prevenir inyección de
   * marcado al insertarlo dinámicamente en el DOM (defensa en
   * profundidad; el backend real de procesamiento de formularios,
   * si existe, debe validar/sanitizar también del lado servidor).
   */
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /** Normaliza texto para comparaciones de búsqueda (sin tildes, minúsculas). */
  function normalize(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  /** Valida un correo electrónico con una expresión razonable (no exhaustiva RFC). */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  /** Valida un teléfono colombiano de 10 dígitos, con o sin espacios/guiones. */
  function isValidPhoneCO(value) {
    const digits = value.replace(/[\s-]/g, '');
    return /^(\+?57)?3\d{9}$/.test(digits) || /^\d{7,10}$/.test(digits);
  }

  return {
    qs,
    qsa,
    debounce,
    throttle,
    formatCOP,
    escapeHTML,
    normalize,
    isValidEmail,
    isValidPhoneCO,
  };
})();
