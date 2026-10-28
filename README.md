# A1 Maquetas — Revisión del cliente, 28 de octubre de 2026

Sitio estático multipágina publicado desde la raíz del repositorio dental en GitHub Pages.

## Dirección aprobada

- Paleta exacta de la referencia: #CFF0EA, #88C9C4, #3E9B94, #20666B, #0C3B45.
- Tipografía Manrope servida localmente. La hoja solicita cambiar la tipografía, pero no especifica una familia.
- Portada con galería fotográfica deslizante por gesto, flechas o teclado; ampliación accesible.
- Cinco categorías y 17 nombres de proyectos transcritos del cliente: edificios (6), loteamientos (4), viviendas (2), especiales (3) y hápticas (2).
- Nosotros: más de 20 años de experiencia, Asunción y trabajos internacionales, según el material del cliente.
- Cotización: legajo de obra, perspectivas y modelo 3D. El formulario prepara texto revisable para copiar y compartir por Instagram; no envía ni almacena información.
- Sin WhatsApp, mapa, visor 360°, emojis ni simuladores. Las rutas anteriores redirigen a las secciones vigentes.

## Páginas

Inicio, Portafolio, Edificios, Loteamientos, Viviendas, Especiales, Hápticas, Nosotros y Cotización. En total, nueve páginas de contenido y seis rutas antiguas con redirección.

## Contenido pendiente

El cliente adjuntó dos hojas y la paleta, pero no el archivo del logo, las fotografías finales de portada ni las fotografías por proyecto. Se usa una marca tipográfica provisional y dos fotos públicas de archivo atribuidas en pantalla a ABC Color (2015). No se asignan esas fotos a proyectos de la nueva lista. La identificación del edificio residencial no está confirmada. Ver `content/photography-sources.md` para procedencia y limitaciones. Sustituir por fotografías y logo facilitados por A1 cuando estén disponibles.

No se inventaron escalas, fechas, clientes, países de entrega ni imágenes de los 17 proyectos. Las ilustraciones geométricas representan categorías, no obras concretas.

## Edición y comprobaciones

Los nombres y categorías se mantienen en `content/portfolio.json`. `python scripts/build.py` regenera las páginas. La presentación está en `a1.css` y las interacciones en `a1.js`.

`python scripts/check-site.py` verifica páginas, enlaces y anclas locales, IDs, los 17 proyectos y ausencia de funciones/contactos retirados. `node --check a1.js` comprueba sintaxis.

`python scripts/prepare-preview.py` prepara la carpeta ignorada `dist` para revisión local. El despliegue de GitHub Pages usa los archivos de la raíz.

Verificado en navegador: carrusel, ampliación/cierre con Escape, filtros y búsqueda sin acentos, enlaces de categoría, consulta con referencia preseleccionada, checklist y copia. Revisión responsive a 320, 390 y 768 px, además de escritorio; corregido el desbordamiento de nombres largos en pantallas estrechas. Fuentes e imágenes se sirven localmente.
