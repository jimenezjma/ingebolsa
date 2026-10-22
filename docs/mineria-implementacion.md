# Incorporación de minería · 22 de octubre de 2026

## Resultado y mantenimiento

La home presenta las dos líneas y “Cómo se compra” justo antes del contacto. Movimiento de tierras conserva inventario, comparador, fichas y
formulario. Minería ofrece siete familias, sin base de datos nueva. El selector automático se pospone.

Los PDF de minería están pendientes. Se añadieron siete imágenes de referencia generadas, sustituibles por fotografías del cliente. `src/lib/mining.ts` admite una imagen y un PDF
por familia. El README explica las rutas públicas y cómo habilitar las descargas. Los textos de
minería son propuestas editoriales para aprobación. No se publica ni modifica el inventario.

## Dirección y argumento visual

Se aplica design-taste-frontend (taste-skill) sobre la dirección existente **Loud and flat**,
`loud-flat-poster`, semilla **681184374**, sin nuevo sorteo ni cambios de paleta o tipografía.
Idea: el rombo de señalización amarillo y negro del logo de IngeBolsa se convierte en la señal
que orienta hacia sus dos líneas comerciales. Los accesos actúan como dos carteles grandes.

Rasgos concretos que sostienen el diseño: logo en rombo, amarillo señal, negro, TikTok Sans ancha,
contacto en Bogotá, venta en Colombia, inventario nuevo/usado, comparación por peso/potencia,
siete familias de minería y catálogos separados por familia.

Argumento: home = elegir línea; tierras = consultar y comparar equipos; minería = identificar la
familia y obtener su catálogo; contacto = llevar esa elección al asesor. Interacción: elegir línea,
filtrar/comparar inventario y abrir WhatsApp con la familia seleccionada. Todo el contenido de
minería y sus enlaces se entrega en HTML, sin depender de interactividad para leerlo.

No se incorporaron imágenes externas ni dibujos nuevos. Se conserva el video ya acreditado en el
pie. Las fotos existentes de obra siguen en movimiento de tierras, con sus créditos originales.

## Revisión visual de taste-skill

Inspección en navegador a 1440, 768 y 390 px. Informes y capturas locales en `.taste-skill/`.

ROUND 1
Seen in one second: cartel amarillo/negro y el nombre de la línea.
Idea: la señal de obra de la marca orienta el catálogo.
Live thing: acceso a cada línea, comparación y contacto contextual.
Layout words by section: home=cartel/paneles/texto/contacto/video; minería=cartel/lista/contacto/video.
Top three problems:
1. El texto de Nosotros resultaba demasiado grande y largo. Se ajustó a tamaño de lectura.
2. En la captura de tableta de tierras, el rombo invadía la introducción del inventario. Se dejó dentro del flujo en pantallas estrechas.
3. Falta fotografía real de minería. Se mantiene tipografía y color según el alcance acordado, sin imágenes ficticias.

ROUND 2
Seen in one second: dos líneas comerciales reconocibles y acciones claras.
Idea: se mantiene la señal de marca en la navegación y los campos de color.
Live thing: navegación entre líneas, inventario funcional y consulta específica por familia.
Layout words by section: cartel/paneles/texto/contacto/video; cartel/lista/contacto/video; cartel/lista/inventario/comparador/proceso/formulario/video.
Scores: home design 6.5 · usability 8 · creativity 7 · content 6 → overall 6.5 (tope por el corte deliberado del titular original).
Scores: minería design 6.5 · usability 8 · creativity 7 · content 6 → overall 7.1.
Scores: tierras design 7.5 · usability 8 · creativity 7 · content 6 → overall 7.5.
Caps applied: falta de cuatro fotografías reales limita la valoración de diseño de home/minería; contenido aún de prototipo.
Remaining: fotografías y PDF del cliente; revisión comercial de textos de muestra existentes y nuevos.

Excepciones documentadas del inspector:
- `few-pictures` en home y minería: se respeta la presentación tipográfica acordada y la falta de materiales reales.
- `covered-text` y `clipped-text` en home: dos copias complementarias del titular original se recortan en campos separados; visualmente forman un único titular completo. No hay contenido superpuesto que lo tape.
- Aviso de longitud en Nosotros: la medición toma el ancho total; CSS lo distribuye en dos columnas legibles.
- Aviso de número de tamaños: se conservan tamaños del comparador, inventario y navegación del diseño existente.
- Lint avisa por guiones de datos sin valor y comentarios existentes, no por nueva redacción promocional.

Los informes pasan con esas excepciones explícitas; no constituyen un cumplimiento sin excepciones.

## Validación funcional

Compilación de producción, ESLint y tipos correctos. Revisión de diferencias sin errores de formato.
25 comprobaciones de navegador: navegación cliente, entradas de contenido, siete mensajes de
WhatsApp, filtros, comparador, preselección al cotizar, regreso desde fichas, cuatro anclas antiguas,
ausencia de desbordamiento móvil, movimiento reducido, foco de teclado y errores de ejecución.
Prueba de renderizado de catálogo con y sin PDF: descarga presente solo cuando existe una ruta,
conservando contacto al asesor. El caso PDF se simula en memoria sin crear archivos ni modificar datos.
No se enviaron solicitudes reales ni se probó la descarga de un catálogo comercial: están pendientes.


## Actualización: sección de compra e imágenes de minería

Esta actualización sustituye el estado visual sin imágenes descrito en las rondas anteriores.
“Cómo se compra” se trasladó a la home, justo antes de “Hablemos de su proyecto”, con un único
identificador `como-comprar`. El pie de todas las páginas enlaza a `/#como-comprar`. Se eliminó
el aviso antiguo para esa ancla y la referencia al formulario de “esta página” en el primer paso.

Se generó una imagen independiente para cada una de las siete familias mediante la herramienta
integrada image_gen, sin CLI. Directorio final: `public/img/mineria/`. Siete WebP de 640 × 480 px,
aproximadamente 25–35 KB cada uno (213 KB en total). Se conservan proporciones y equipo completo.
Los originales PNG permanecen en generated_images de Codex. Prompts exactos y procedencia:
`docs/mineria-imagenes.json`. La página indica que son referencias generadas, no modelos específicos.

ROUND 3
Seen in one second: maquinaria en grafito y amarillo, con una familia claramente identificada.
Idea: catálogo industrial compacto dentro de la señal de marca existente.
Live thing: consulta del catálogo por familia y acordeón de compra en la home.
Layout words by section: minería=cartel/lista ilustrada/contacto/video; home=cartel/paneles/texto/proceso/contacto/video.
Scores: minería design 8 · usability 8 · creativity 7 · content 7 → overall 7.7.
Scores: home design 6.5 · usability 8 · creativity 7 · content 6 → overall 6.0 por el aviso del inspector descrito abajo.
Caps applied: la home conserva la composición original y dos imágenes visibles al cargar; las demás fotos están en paneles plegados.
Remaining: PDF reales y aprobación comercial; sustituir renders cuando existan fotos del cliente.

Inspección de minería a 1440/768/390: 0 FAIL y 0 WARN, sin excepciones. La home conserva los avisos
de medida de columnas, número de tamaños y mínimo de fotografías visibles; no se añaden fotografías
ajenas al cambio solicitado. Se mantienen los recortes complementarios del titular original.
Las nuevas imágenes resuelven el aviso previo de pocas imágenes en minería.

Compilación de producción y tipos correctos. Lint de taste-skill sin errores y con el aviso previo de
guiones en datos/comentarios. Revisión de diferencias correcta. Prueba en navegador: orden y unicidad
de la sección de compra, funcionamiento de sus cinco pestañas, ausencia de esa sección en tierras,
enlace del pie y carga de las siete imágenes sin desbordamientos ni errores a 1440, 768 y 390 px.
