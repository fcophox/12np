# 12enpunto

Plataforma web completa para la marca de pastelería artesanal **12 en Punto** — incluye sitio público con cartas, cotizador B2B y un dashboard CMS para gestionar artículos, productos y la identidad de marca.

---

## Stack tecnológico

| Categoría | Tecnología |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| Lenguaje | TypeScript 5 |
| Runtime | React 19 |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion 12 |
| Editor de texto | Tiptap v3 |
| Iconos | Lucide React |
| Estado | React Context API |
| Fuentes | Montserrat + Fraunces |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── (main)/               # Rutas públicas (Navbar + Footer)
│   │   ├── page.tsx          # Home
│   │   ├── la-pastelera/     # Historia de la marca
│   │   ├── la-carta/         # Carta / catálogo animado
│   │   ├── cotizar/          # Cotizador B2B (wizard 4 pasos)
│   │   ├── contacto/         # Contacto
│   │   └── blog/[slug]/      # Blog dinámico
│   ├── dashboard/            # CMS admin (sidebar layout)
│   │   ├── page.tsx          # Inicio / KPIs
│   │   ├── brand/            # Identidad de marca
│   │   ├── articulos/        # Gestión de artículos
│   │   └── productos/        # Gestión de productos
│   ├── login/                # Inicio de sesión
│   └── pronto/               # Coming soon standalone
├── components/               # Componentes reutilizables
└── context/                  # ArticulosContext · ProductosContext · BrandContext
```

---

## Páginas públicas

| Ruta | Descripción |
|---|---|
| `/` | Home con toggle coming soon |
| `/la-pastelera` | Historia de la fundadora, galería y certificaciones |
| `/la-carta` | Catálogo animado filtrado por categoría (Pâtisserie, Viennoiserie, Cafetería) |
| `/cotizar` | Wizard B2B: selección de productos → cantidades → datos empresa → revisión |
| `/contacto` | Formulario de contacto |
| `/blog/[slug]` | Artículos dinámicos del blog |

---

## Dashboard CMS

| Sección | Ruta | Funcionalidad |
|---|---|---|
| Inicio | `/dashboard` | KPIs (visitas, usuarios, pedidos) + actividad reciente |
| Brand | `/dashboard/brand` | Avatar + nombre de marca con vista previa |
| Artículos | `/dashboard/articulos` | Crear, listar y publicar artículos con Tiptap, estado, categoría, etiquetas y autor |
| Productos | `/dashboard/productos` | Lista de productos con imagen, precio CLP, etiquetas, orden, destacado, pausar/editar/eliminar |

> El estado del dashboard se persiste en `localStorage` via React Context.

---

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build
npm start
```

---

## Variables de entorno

No se requieren variables de entorno para desarrollo local.

---

## Comandos disponibles

```bash
npm run dev      # Inicia servidor de desarrollo en http://localhost:3000
npm run build    # Genera el build de producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta ESLint
```

---

## Notas

- Este proyecto usa **Next.js 16** con App Router — algunas APIs pueden diferir de versiones anteriores.
- Tailwind CSS v4 no usa `tailwind.config.js`; la configuración del tema está en `globals.css` con `@theme inline`.
- El dashboard no incluye autenticación real — es un CMS local con persistencia en `localStorage`.
