# IngeBolsa: web de maquinaria

Vitrina y catálogo de IngeBolsa en Colombia. La home presenta dos líneas: movimiento de tierras
(`/movimiento-de-tierras`), con inventario, fichas, comparador y formulario, y minería (`/mineria`),
con familias de equipos y catálogos PDF. Contacto por WhatsApp (+57 315 501 4058).

> **Estado: prototipo. No publicar todavía.** El inventario y las afirmaciones comerciales son de muestra.
> El formulario almacena datos personales y requiere una política de tratamiento y controles contra abuso
> antes de abrirlo al público. La implementación actual usa Prisma con SQLite local y está documentada
> para un servidor Node con Postgres; **todavía no está adaptada a Cloudflare Workers**, que es el
> alojamiento previsto para el proyecto.

## Arrancar

```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Abrir http://localhost:3000. `npm run db:studio` abre Prisma Studio para ver y editar equipos y solicitudes.

## Stack

| Capa | Elección | Por qué |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) + TypeScript | Páginas del catálogo renderizadas en servidor (SEO para "excavadora en venta Bogotá"), API en el mismo proyecto |
| Datos | Prisma 6 | Esquema tipado; SQLite en desarrollo, Postgres en producción sin cambiar el esquema |
| Validación | Zod | El mismo esquema valida el formulario en la API |
| Estilos | CSS Modules + tokens en `globals.css` | Sin dependencias; la marca vive en variables |
| Tipografía | TikTok Sans (Google Fonts, eje de ancho variable) | Una sola familia: ancha para carteles, normal para leer |

## Estructura

```
prisma/
  schema.prisma        Category, Machine, Spec, MachineImage, QuoteRequest
  seed.ts              inventario de MUESTRA (reemplazar)
src/
  app/
    page.tsx           home con acceso a ambas líneas
    movimiento-de-tierras/ catálogo existente conectado a la base
    mineria/           catálogo estático de siete familias
    equipos/[slug]/    ficha técnica de cada equipo
    api/solicitudes/   POST del formulario → QuoteRequest
  components/          una sección por archivo, con su .module.css
  lib/
    catalog.ts         consultas y formatos (kg, COP, estados)
    requests.ts        esquema Zod del formulario
    site.ts            teléfono, WhatsApp
    credits.ts         créditos de fotos y video
docs/credits.json      fuente, autor y licencia de cada imagen descargada
```

## Modelo de datos

- **Category**: familia de equipos (`shortName` es el nombre corto del cartel: "Retros").
- **Machine**: equipo publicado. Peso operativo y potencia van en columnas propias para filtrar y
  comparar; `priceCop` vacío muestra "Precio a consultar"; `status` = DISPONIBLE | RESERVADA | VENDIDA | BAJO_PEDIDO.
- **Spec**: filas libres de ficha técnica agrupadas (Motor, Dimensiones, Capacidades…). Cada familia
  tiene datos distintos, por eso no son columnas fijas.
- **MachineImage**: fotos del equipo, ordenadas. La ficha las muestra en cuanto existan.
- **QuoteRequest**: solicitudes del formulario, con estado comercial (NUEVA → CONTACTADA → COTIZADA → CERRADA).

## Pendiente para producción en Cloudflare

- Adaptar el runtime de Next.js y la capa de datos: Prisma con SQLite local no es un despliegue
  funcional en Cloudflare Workers. Elegir y probar la integración de base de datos antes de migrar datos.
- Crear un flujo de edición de catálogo que pueda usar el cliente sin Prisma Studio ni acceso al código.
- Confirmar contenido, disponibilidad, precios, número de WhatsApp y afirmaciones comerciales con IngeBolsa.
- Publicar la política de tratamiento de datos y reforzar el formulario contra abuso antes de recibir solicitudes reales.
- Configurar dominio, analítica, Search Console y pruebas de producción.

## Fases siguientes

- **Fase 2, panel de administración**: login, CRUD de equipos con subida de fotos (S3/R2/Supabase
  Storage) y bandeja de solicitudes. Mientras tanto, Prisma Studio sirve para cargar inventario.
- Aviso al equipo comercial por correo o WhatsApp Business al llegar una solicitud (marcado en
  `api/solicitudes/route.ts`).
- Filtros por URL (`/equipos?tipo=excavadoras`) y páginas por categoría para SEO.
- Repuestos y alquiler, si el negocio los ofrece.

## Antes de publicar

- El inventario del seed, las fichas técnicas y el texto de "Nosotros" son de muestra.
- Las fotos son de colecciones abiertas (Wikimedia Commons, The Met) y muestran el mundo de la obra,
  no equipos de IngeBolsa. Se acreditan en el pie. Reemplazarlas por fotos propias cuando existan.


## Catálogos de minería

El contenido está en `src/lib/mining.ts`, sin tablas ni API adicionales. Las siete familias y sus
identificadores son estables. Las descripciones son propuestas para validar con el cliente.

- Mientras `catalogPdf` no esté definido, se muestra “Solicitar catálogo por WhatsApp” con la familia en el mensaje.
- Para habilitar una descarga, guardar el PDF real en `public/catalogos/mineria/` y añadir su ruta pública
  en `catalogPdf`, por ejemplo `/catalogos/mineria/trituradoras-de-cono.pdf`. Verificar el archivo antes de habilitar el enlace.
- Para añadir una foto real, colocarla en `public/img/mineria/` y definir `image: { src, alt }` con su ruta y descripción.
- Las descargas no requieren formulario. El selector automático de equipos queda para una fase posterior.
- Las fichas existentes siguen en `/equipos/[slug]`. Los enlaces antiguos de categorías, inventario,
  y comparador en la home muestran un acceso a su nueva ubicación. “Cómo se compra” está en la home, antes del contacto.

El cuestionario de trituración está en `/mineria/cuestionario` y tiene un acceso al inicio y al final
de la página de minería. Cuando estén definidos `RESEND_API_KEY`, `MINING_INQUIRY_FROM` (correo de un
dominio remitente verificado) y `MINING_INQUIRY_TO` en el entorno del servidor, su API enviará las
respuestas por correo. Hasta entonces, el formulario se puede revisar pero el botón de envío queda
deshabilitado y se ofrece WhatsApp. El correo solo se marca como enviado si el proveedor acepta la
solicitud; no se guardan respuestas de minería en la base de datos. Antes de abrirlo al público, añadir
protección contra abuso y publicar la política de tratamiento de datos.

Las siete imágenes de minería son referencias generadas con image_gen, guardadas en `public/img/mineria/`
como WebP de 640 × 480 px (aproximadamente 25–35 KB cada una). No representan modelos ni existencias reales.
Los prompts y la procedencia están en `docs/mineria-imagenes.json`.
