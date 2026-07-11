# El Leñador de Colombia — Sitio Web

Sitio web premium para **El Leñador de Colombia**, restaurante de comida
típica santandereana ubicado en la Calle 68, Barrio La Victoria,
Bucaramanga, Santander. Construido en **HTML5, CSS3 y JavaScript puro**
(sin frameworks ni dependencias de build), siguiendo una arquitectura
modular, accesible y optimizada para rendimiento.

## 1. Estructura del proyecto

```
lenador/
├── index.html                  Página de inicio
├── nosotros.html                Historia y valores
├── menu.html                    Menú dinámico (lee js/menu-data.js)
├── galeria.html                 Galería con filtros y lightbox
├── reservas.html                Formulario de reservas
├── contacto.html                Formulario de contacto + mapa
├── politica-privacidad.html
├── terminos-condiciones.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── css/
│   ├── variables.css            Design tokens (colores, tipografía, espaciados)
│   ├── reset.css                 Normalización entre navegadores
│   ├── style.css                  Estilos base globales
│   ├── components.css             Componentes UI (botones, navbar, cards, footer...)
│   ├── animations.css             Keyframes y reveal-on-scroll
│   └── responsive.css             Ajustes por breakpoint
├── js/
│   ├── utils.js                   Helpers puros (debounce, formatCOP, validaciones)
│   ├── main.js                    Navbar, header on scroll, cookies, back-to-top
│   ├── animations.js              IntersectionObserver para [data-reveal]
│   ├── menu-data.js                ★ ÚNICA fuente de datos del menú (editar aquí)
│   ├── menu.js                     Render dinámico del menú + búsqueda + filtros
│   ├── gallery.js                  Filtros de galería + lightbox accesible
│   └── forms.js                    Validación de formularios (reservas/contacto)
└── assets/
    ├── images/                    Fotografías (ver README-IMAGENES.txt)
    ├── icons/logo.svg              Logo de marca (placeholder editable)
    ├── favicon/                    Íconos de pestaña del navegador
    ├── fonts/                      (usa Google Fonts por CDN; carpeta reservada
    │                                por si se requieren fuentes autoalojadas)
    └── videos/                     Reservada para video de fondo si se desea
```

## 2. Cómo ejecutar el sitio localmente

No requiere instalación ni build. Basta con servir la carpeta como
archivos estáticos:

```bash
cd lenador
python3 -m http.server 8080
# abrir http://localhost:8080
```

O simplemente abrir `index.html` directamente en el navegador (algunas
funciones como `fetch` a un backend real requerirán un servidor).

## 3. Zonas editables — guía rápida para el propietario

Todas las zonas pensadas para que el propietario complete con datos
reales están marcadas en el código con el comentario
`ZONA EDITABLE`. Resumen de las más importantes:

| Qué quiero cambiar | Dónde lo edito |
|---|---|
| Platos, precios, categorías del menú | `js/menu-data.js` (único archivo) |
| Colores de marca / tipografía | `css/variables.css` (bloque superior) |
| Número de WhatsApp | Buscar `573000000000` en todos los `.html` y reemplazar |
| Teléfono, correo, dirección, horario | Sección `<footer>` y `contacto.html` en cada página |
| Redes sociales | Bloque `.footer-social` en cada página (actualmente `href="#"`) |
| Logo | `assets/icons/logo.svg` |
| Fotografías | `assets/images/` — ver `assets/images/README-IMAGENES.txt` |
| Mapa de ubicación | `iframe` en `contacto.html` (usar "Insertar mapa" de Google Maps) |
| Textos legales (privacidad / términos) | `politica-privacidad.html`, `terminos-condiciones.html` |
| Conectar el envío real de formularios | `js/forms.js`, función `submitForm()` — ver comentario "INTEGRACIÓN BACKEND AQUÍ" |

**Importante:** el número de WhatsApp `573000000000` es un
placeholder de ejemplo (formato internacional colombiano sin `+` ni
espacios). Debe reemplazarse por el número real antes de publicar el
sitio.

## 4. Contenido del menú

El menú **no está escrito en HTML**: se genera dinámicamente en tiempo
de ejecución a partir del arreglo `MENU_ITEMS` en `js/menu-data.js`.
Esto permite agregar, quitar o modificar platos editando un único
archivo, sin tocar el HTML ni el CSS. Cada plato admite:

```js
{
  id: 'identificador-unico',
  category: 'fuertes',          // debe existir en MENU_CATEGORIES
  name: 'Nombre del plato',
  description: 'Descripción corta',
  price: 32000,                  // entero, sin puntos ni símbolo
  image: 'assets/images/menu/archivo.jpg',
  tags: ['popular'],             // 'popular' | 'picante' | 'vegetariano'
}
```

Los platos y precios actuales son de ejemplo (comida típica
colombiana representativa) hasta que se confirme la carta real del
restaurante.

## 5. Accesibilidad

- Navegación completa por teclado (skip-link, focus visible, cierre de
  menú/lightbox con `Escape`).
- Atributos ARIA en navbar, pestañas de menú/galería, formularios y
  modal de imagen.
- Contraste de color verificado sobre la paleta definida en
  `variables.css`.
- Soporte `prefers-reduced-motion`: desactiva animaciones si el
  usuario lo solicita en su sistema operativo.
- Imágenes con `alt` descriptivo; `loading="lazy"` en imágenes fuera
  del viewport inicial.

## 6. Rendimiento

- Sin frameworks ni bundlers: CSS y JS se sirven directamente, sin
  paso de compilación.
- CSS dividido por responsabilidad para permitir cacheo granular.
- `IntersectionObserver` en lugar de listeners de scroll costosos
  para las animaciones de aparición.
- `debounce`/`throttle` en scroll y búsqueda del menú.
- Imágenes con `loading="lazy"` y `object-fit: cover` para evitar
  layout shift.

## 7. SEO

- Metaetiquetas `title`/`description` únicas por página.
- Open Graph básico para vista previa en redes sociales.
- Datos estructurados `schema.org/Restaurant` en `index.html`.
- `robots.txt` y `sitemap.xml` incluidos (actualizar el dominio real
  antes de publicar).

## 8. Navegadores soportados

Últimas 2 versiones de Chrome, Firefox, Safari y Edge. Se incluyen
fallbacks (`onerror` en imágenes, comprobación de `IntersectionObserver`)
para degradar con elegancia en navegadores más antiguos.

## 9. Próximos pasos sugeridos

1. Reemplazar todos los `ZONA EDITABLE` con información real del
   negocio (contacto, redes, horario, menú confirmado).
2. Sustituir las imágenes de stock temporales por fotografía propia.
3. Conectar `js/forms.js` a un backend real de envío de formularios.
4. Configurar el dominio real en `sitemap.xml`, `robots.txt` y las
   etiquetas `canonical`/`og:` de cada página.
5. Ejecutar una auditoría con Lighthouse antes de publicar a
   producción.
