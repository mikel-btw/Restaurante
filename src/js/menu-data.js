/**
 * ARCHIVO: menu-data.js
 * PROPÓSITO: Fuente única de verdad del menú del restaurante.
 * RESPONSABILIDAD: Este es el ÚNICO archivo que debes editar
 *   para actualizar platos, precios, categorías, fotos o
 *   descripciones. La página menu.html se construye 100% de
 *   forma dinámica a partir de este arreglo mediante menu.js.
 *   No se debe escribir contenido de platos directamente en el
 *   HTML.
 * DEPENDENCIAS: Ninguna (debe cargarse antes de menu.js)
 * AUTOR: Equipo de desarrollo — El Leñador de Colombia
 * FECHA DE CREACIÓN: 2026-07-10
 *
 * ══════════════════════════════════════════════════════════
 * ZONA EDITABLE — CONTENIDO REAL DEL MENÚ
 * Los valores de "name", "price" y "description" de abajo son
 * PLACEHOLDERS de ejemplo con platos típicos colombianos, a la
 * espera de que el propietario confirme la carta real y los
 * precios vigentes de El Leñador de Colombia.
 *
 * Cómo editar cada plato:
 *   id          -> identificador único en minúsculas, sin tildes/espacios
 *   category    -> debe coincidir EXACTO con un "id" de MENU_CATEGORIES
 *   name        -> nombre del plato tal como aparece en la carta física
 *   description -> descripción corta (máx. ~120 caracteres)
 *   price       -> número entero en pesos colombianos, SIN puntos ni signo $
 *   image       -> ruta dentro de assets/images/menu/ (ver README)
 *   tags        -> combinación de: "popular", "picante", "vegetariano"
 * ══════════════════════════════════════════════════════════
 */

'use strict';

const MENU_CATEGORIES = [
  { id: 'entradas', label: 'Entradas' },
  { id: 'sopas', label: 'Sopas y Cazuelas' },
  { id: 'fuertes', label: 'Platos Fuertes' },
  { id: 'asados', label: 'A la Leña' },
  { id: 'acompanamientos', label: 'Acompañamientos' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'postres', label: 'Postres' },
];

const MENU_ITEMS = [
  // ---- ENTRADAS -------------------------------------------------
  {
    id: 'empanadas-santandereanas',
    category: 'entradas',
    name: 'Empanadas santandereanas',
    description: 'Porción de empanadas de maíz rellenas de carne y papa, servidas con ají casero.',
    price: 12000,
    image: 'assets/images/menu/empanadas-santandereanas.jpg',
    tags: ['popular'],
  },
  {
    id: 'arepa-santandereana',
    category: 'entradas',
    name: 'Arepa santandereana',
    description: 'Arepa de maíz pelado tradicional de la región, ideal para acompañar cualquier plato.',
    price: 6000,
    image: 'assets/images/menu/arepa-santandereana.jpg',
    tags: ['vegetariano'],
  },
  {
    id: 'chorizo-santandereano',
    category: 'entradas',
    name: 'Chorizo santandereano a la parrilla',
    description: 'Chorizo artesanal asado a la leña, servido con arepa y ají.',
    price: 14000,
    image: 'assets/images/menu/chorizo-santandereano.jpg',
    tags: ['popular'],
  },

  // ---- SOPAS ------------------------------------------------------
  {
    id: 'mute-santandereano',
    category: 'sopas',
    name: 'Mute santandereano',
    description: 'Sopa tradicional de mazorca, fríjol, garbanzo, carne de res y cerdo.',
    price: 22000,
    image: 'assets/images/menu/mute-santandereano.jpg',
    tags: ['popular'],
  },
  {
    id: 'sancocho-de-gallina',
    category: 'sopas',
    name: 'Sancocho de gallina campesina',
    description: 'Sancocho servido con presa de gallina, yuca, plátano y mazorca. Incluye arroz y aguacate.',
    price: 26000,
    image: 'assets/images/menu/sancocho-de-gallina.jpg',
    tags: [],
  },

  // ---- PLATOS FUERTES -----------------------------------------
  {
    id: 'bandeja-paisa',
    category: 'fuertes',
    name: 'Bandeja paisa',
    description: 'Frijoles, arroz, carne molida, chicharrón, chorizo, huevo, plátano, arepa y aguacate.',
    price: 32000,
    image: 'assets/images/menu/bandeja-paisa.jpg',
    tags: ['popular'],
  },
  {
    id: 'pepitoria-de-cabro',
    category: 'fuertes',
    name: 'Pepitoria de cabro',
    description: 'Guiso tradicional santandereano de cabro con arroz, sangre y vísceras, receta de la casa.',
    price: 28000,
    image: 'assets/images/menu/pepitoria-de-cabro.jpg',
    tags: ['picante'],
  },
  {
    id: 'cabro-al-horno',
    category: 'fuertes',
    name: 'Cabro al horno de leña',
    description: 'Cabro adobado y horneado lentamente en horno de leña, acompañado de papa criolla.',
    price: 34000,
    image: 'assets/images/menu/cabro-al-horno.jpg',
    tags: ['popular'],
  },

  // ---- A LA LEÑA (parrilla) ---------------------------------------
  {
    id: 'churrasco-a-la-lena',
    category: 'asados',
    name: 'Churrasco a la leña',
    description: 'Corte de res asado a fuego de leña, servido con papa salada, ensalada y arepa.',
    price: 38000,
    image: 'assets/images/menu/churrasco-a-la-lena.jpg',
    tags: ['popular'],
  },
  {
    id: 'costillas-bbq-lena',
    category: 'asados',
    name: 'Costillas de cerdo BBQ a la leña',
    description: 'Costillas glaseadas en salsa BBQ de la casa, cocción lenta a la leña.',
    price: 36000,
    image: 'assets/images/menu/costillas-bbq-lena.jpg',
    tags: [],
  },
  {
    id: 'pollo-a-la-lena',
    category: 'asados',
    name: 'Pollo entero a la leña',
    description: 'Pollo campesino asado en horno de leña con hierbas, para compartir.',
    price: 42000,
    image: 'assets/images/menu/pollo-a-la-lena.jpg',
    tags: ['popular'],
  },

  // ---- ACOMPAÑAMIENTOS --------------------------------------------
  {
    id: 'papa-criolla',
    category: 'acompanamientos',
    name: 'Papa criolla frita',
    description: 'Porción de papa criolla dorada, crocante por fuera y suave por dentro.',
    price: 9000,
    image: 'assets/images/menu/papa-criolla.jpg',
    tags: ['vegetariano'],
  },
  {
    id: 'yuca-frita',
    category: 'acompanamientos',
    name: 'Yuca frita',
    description: 'Porción de yuca frita crocante, servida con suero costeño.',
    price: 9000,
    image: 'assets/images/menu/yuca-frita.jpg',
    tags: ['vegetariano'],
  },

  // ---- BEBIDAS ------------------------------------------------------
  {
    id: 'limonada-de-coco',
    category: 'bebidas',
    name: 'Limonada de coco',
    description: 'Limonada natural batida con coco fresco.',
    price: 10000,
    image: 'assets/images/menu/limonada-de-coco.jpg',
    tags: ['popular', 'vegetariano'],
  },
  {
    id: 'masato',
    category: 'bebidas',
    name: 'Masato santandereano',
    description: 'Bebida fermentada tradicional a base de arroz o maíz.',
    price: 7000,
    image: 'assets/images/menu/masato.jpg',
    tags: ['vegetariano'],
  },
  {
    id: 'aguardiente-santandereano',
    category: 'bebidas',
    name: 'Aguardiente santandereano (botella)',
    description: 'Botella de aguardiente regional, ideal para compartir en familia.',
    price: 55000,
    image: 'assets/images/menu/aguardiente-santandereano.jpg',
    tags: [],
  },

  // ---- POSTRES -----------------------------------------------------
  {
    id: 'obleas-santandereanas',
    category: 'postres',
    name: 'Obleas con arequipe y queso',
    description: 'Obleas artesanales rellenas de arequipe, queso campesino y mermelada.',
    price: 8000,
    image: 'assets/images/menu/obleas-santandereanas.jpg',
    tags: ['popular', 'vegetariano'],
  },
  {
    id: 'cortado-de-guayaba',
    category: 'postres',
    name: 'Cortado de guayaba con queso',
    description: 'Postre tradicional de bocadillo de guayaba en cuadros, acompañado de queso fresco.',
    price: 9000,
    image: 'assets/images/menu/cortado-de-guayaba.jpg',
    tags: ['vegetariano'],
  },
];
