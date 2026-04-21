# Life Fitness Venezuela 🏋️

Sitio web oficial de **Life Fitness Venezuela** — catálogo de equipos de fitness comerciales y residenciales.

## 🚀 Stack Tecnológico

- **React 18** + **Vite** — arquitectura SPA moderna
- **Tailwind CSS v4** — sistema de diseño utility-first
- **React Router v6** — navegación entre páginas sin recarga
- **Vanilla CSS** — estilos personalizados de la marca

## 📄 Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal — hero, trust bar, categorías, CTA, footer |
| `/cardio` | Catálogo de equipos de Cardio (Integrity, Platinum Club, etc.) |
| `/fuerza` | Catálogo de Fuerza (Hammer Strength, Insignia Series, etc.) |

## 🎨 Identidad Visual

- **Color corporativo**: Rojo Life Fitness `#E31837`
- **Fuentes**: Lexend (headlines), Manrope (body), Montserrat (labels)
- **Estilo**: Dark mode premium con acentos rojos

## 🛠️ Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   └── Navbar.jsx          # Navegación con dropdown
├── pages/
│   ├── Home.jsx            # Página principal
│   ├── Cardio.jsx          # Catálogo Cardio
│   └── Fuerza.jsx          # Catálogo Fuerza
├── App.jsx                 # Router principal
├── main.jsx                # Entry point
└── index.css               # Estilos globales + tema Tailwind

respaldo_vanilla/           # Respaldo del sitio original HTML/CSS/JS
public/fotos/               # Imágenes locales del catálogo
```

## 🌐 Marcas

- **Life Fitness** — Equipos Integrity Series, Platinum Club
- **Hammer Strength** — Racks, benches, plataformas
- **ICG** — Bicicletas indoor

---

> Desarrollado con ❤️ en Venezuela · Life Fitness Venezuela © 2024
