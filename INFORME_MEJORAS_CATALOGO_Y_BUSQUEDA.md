# Informe Técnico y Plan de Implementación: Rediseño de Serie Selectorizada y Buscador Global

**Proyecto:** Catálogo Web Life Fitness & Hammer Strength Venezuela  
**Fecha:** Octubre 2026  
**Documento:** Informe de Cambios Arquitectónicos y de UI/UX  

---

## 1. Resumen Ejecutivo

El presente informe detalla las modificaciones técnicas, estructurales y visuales necesarias para implementar dos requerimientos clave orientados a optimizar la experiencia de usuario (UX), la navegabilidad y la tasa de conversión en el catálogo web:

1. **Transformación de la Sección "Serie Selectorizada" (Página Equipos de Gimnasio):**
   - Transición de un carrusel horizontal a una **vista de cuadrícula (Grid de 5 columnas)** idéntica a la maqueta de referencia.
   - Incorporación del atributo y filtro por **Enfoque Muscular / Zona Corporal** (*Tren Superior*, *Tren Inferior*, *Abdominales*, *Cardio / Funcional*).
   - Implementación de **paginación optimizada** (10 productos por vista: 2 filas x 5 columnas) para gestionar cómodamente los más de 60 equipos.
   - Rediseño de las tarjetas de producto con estética sobria y técnica (imagen centrada, tipografía técnica, botón rojo de *COTIZAR* y botón oscuro de *MANUAL / FICHA*).

2. **Integración de Barra / Botón de Búsqueda Global para las 3 Páginas (*Home*, *Equipos Gimnasio*, *Equipos Hogar*):**
   - Incorporación de un componente de búsqueda interactivo accesible desde la barra de navegación (*Navbar*) y/o cabeceras de catálogo.
   - Búsqueda en tiempo real por **Nombre**, **Marca**, **Categoría**, **Subcategoría** y **Enfoque Corporal**.
   - Despliegue de resultados instantáneos con miniaturas, badges de uso (*Hogar* / *Gimnasio*) y accesos directos de cotización por WhatsApp.

---

## 2. Requerimiento 1: Rediseño de "Serie Selectorizada" y Filtro de Enfoque Muscular

### 2.1 Diagnóstico de la Situación Actual
Actualmente, el componente `DynamicCatalog.jsx` renderiza todas las subcategorías en filas de carrusel horizontal con scroll (`SubCategoryRow`).  
Para categorías con pocos ítems (3 a 8 equipos) esto es funcional, pero para la **Serie Selectorizada** (>60 equipos):
- El scroll horizontal infinito se vuelve fatigante e ineficiente.
- El usuario no puede comparar equipos ni encontrar rápidamente máquinas para un grupo muscular específico (ej. sólo piernas o sólo pecho).
- Se pierde visibilidad del catálogo completo.

### 2.2 Especificaciones de la Nueva Vista (Según Maqueta de Referencia)

```
+---------------------------------------------------------------------------------------------------------+
| SERIE SELECTORIZADA  [69 EQUIPOS]                   [Tren Superior v] [Tren Inferior v] [Abdomen v] ... |
+---------------------------------------------------------------------------------------------------------+
| [Card 1]          [Card 2]          [Card 3]          [Card 4]          [Card 5]                        |
| [Card 6]          [Card 7]          [Card 8]          [Card 9]          [Card 10]                       |
+---------------------------------------------------------------------------------------------------------+
|                               [Anterior]   1   2   3  ...  7   [Siguiente]                              |
+---------------------------------------------------------------------------------------------------------+
```

#### A. Encabezado de Sección y Contador de Equipos
- Título: `SERIE SELECTORIZADA` en tipografía bold oscura (`#111111` / `var(--dark)`).
- Badge de cantidad: Etiqueta redondeada (*pill badge*) con fondo rojo corporativo (`#a6192e`) y texto blanco indicando la cantidad de productos filtrados (ej. `69 EQUIPOS`).

#### B. Barra de Filtros por Enfoque Muscular / Zona Corporal
Botones / menús desplegables en el extremo derecho con estilos de alto contraste:
- **Botón Activo:** Fondo rojo (`#a6192e`), texto blanco, borde sutil e indicador de flecha/despliegue `v`.
- **Botones Inactivos:** Fondo negro (`#111111`), texto blanco, efecto hover con transición roja.
- **Categorías de Enfoque Propuestas:**
  1. **Todos** (Vista general).
  2. **Tren Superior** (Pectoral, Espalda, Hombros, Bíceps, Tríceps, Deltoides).
  3. **Tren Inferior** (Cuádriceps, Isquiotibiales/Femoral, Glúteos, Gemelos, Aductores/Abductores).
  4. **Abdominales / Core** (Abdominales, Lumbar, Torso / Oblicuos).
  5. **Cardio / Híbrido** (si aplica a series específicas).

#### C. Grid de Productos (Layout de 5 Columnas)
- **Distribución en PC:** `grid-template-columns: repeat(5, 1fr)` con separación (`gap: 16px` o `20px`).
- **Responsive:**
  - Pantallas grandes (>1200px): 5 columnas.
  - Tablets / Laptops medianas (768px - 1199px): 3 a 4 columnas.
  - Móviles (<768px): 2 columnas compactas o 1 columna amplia.

#### D. Diseño de Tarjetas de Producto (*Product Cards*)
Cada tarjeta cuenta con:
- **Fondo:** Blanco puro (`#ffffff`) con borde gris ultra fino (`#e5e7eb` / `#eee`) y sombra suave al hacer hover.
- **Imagen Central:** Contenedor de altura fija (aprox. `180px - 220px`) con imagen centrada (`object-fit: contain`) sobre fondo neutro/blanco.
- **Título:** Texto en mayúsculas, negrita (`font-weight: 700` o `800`), tamaño `12px - 14px`, 2 líneas fijas con elipsis.
- **Descripción Breve:** Texto descriptivo en color gris medio (`#666666`), 2 líneas truncadas con explicación de la función biomecánica o músculos involucrados.
- **Botones de Acción (Side-by-side o apilados compactos):**
  - **Botón `COTIZAR`:** Fondo rojo (`#a6192e`), texto blanco, enlace directo a WhatsApp con mensaje precargado del producto exacto.
  - **Botón `MANUAL / FICHA`:** Fondo negro carbón (`#111111`), texto blanco, abre el PDF técnico o manual en pestaña nueva.

#### E. Barra de Paginación Inferior
- Muestra 10 productos por página (2 filas de 5 ítems), evitando sobrecarga cognitiva.
- Navegación: Botones `[ Anterior ]`, números de página con estado activo destacado, puntos suspensivos `...` y botón `[ Siguiente ]`.
- Scroll automático suave al inicio de la sección al cambiar de página.

---

## 3. Requerimiento 2: Buscador para las 3 Páginas (*Home*, *Gimnasio*, *Hogar*)

### 3.1 Arquitectura del Buscador
Para que el buscador esté disponible en las 3 páginas de forma uniforme y accesible, se contemplan dos capas complementarias:

1. **Buscador en el Navbar (Acceso Global Permanente):**
   - Un botón de lupa / barra colapsable en la barra de navegación superior fija (`Navbar.jsx`).
   - Al hacer clic, abre un **Modal de Búsqueda Flotante** (estilo *Command Palette* moderno) con overlay translúcido.
   - Atajo de teclado opcional (ej. `Ctrl + K` o `Cmd + K` / icono de lupa).

2. **Barra de Búsqueda Rápida en el Catálogo (*In-Page Search*):**
   - En las páginas `Equipos_Gimnasio.jsx` y `Equipos_Hogar.jsx`, una barra de filtro rápido integrada arriba de las categorías para filtrar instantáneamente sin abrir modales.

```
+------------------------------------------------------------------------------------------------------------------------+
| [ Life Fitness ]  [ Hammer Strength ]     NOSOTROS  PRODUCTOS  SERVICIO TECNICO  CONTACTO  BUSCAR [🔍]    [ COTIZAR ] |
+------------------------------------------------------------------------------------------------------------------------+
                                                  │
                                                  ▼
+────────────────────────────────────────────────────────────────────────────────────────────────────────────────--------+
|  🔍  Buscar por nombre de equipo, serie, categoría (ej. "Axiom", "Pectoral", "Trotadora")...      [ESC] |
+────────────────────────────────────────────────────────────────────────────────────────────────────────────────--------+
|  RESULTADOS ENCONTRADOS (4):                                                                           |
|  [IMG]  Serie Selectorizada Axiom Pec Fly / Rear Delt   • Fuerza | Gimnasio         [Cotizar] [Ver]     |
|  [IMG]  Trotadora Integrity Series D-Console             • Cardio | Ambos            [Cotizar] [Ver]     |
|  [IMG]  Hammer Strength MTS Abdominal Crunch             • Fuerza | Gimnasio         [Cotizar] [Ver]     |
+─────────────────────────────────────────────────────────────────────────────────────────────────────────+
```

### 3.2 Criterios de Búsqueda y Algoritmo de Coincidencia
La búsqueda evalúa en tiempo real (`useMemo` reactivo):
- Nombre del equipo (`p.Titles` o `p.title`)
- Subcategoría (`p.SubCategory`)
- Categoría principal (`p.Category`: Fuerza / Cardio)
- Marca (`p.Brand`: Life Fitness / Hammer Strength)
- Enfoque muscular (`p.body_focus` / músculos en descripción)
- Tipo de uso (`p.usage`: Gimnasio, Hogar, Ambos)

Normalización contra tildes, mayúsculas y caracteres especiales para máxima tolerancia al usuario.

---

## 4. Estrategia de Datos y Clasificación Muscular (`body_focus`)

Para habilitar el filtro de zona corporal en la Serie Selectorizada, se puede implementar bajo dos enfoques complementarios:

### Enfoque A: Detección Inteligente Automática (Inmediato - Frontend)
Se crea un mapeador automático en `src/hooks/useProducts.js` o `src/utils/muscleClassifier.js` que categoriza el equipo según palabras clave en su título y descripción:

```javascript
export function getMuscleFocus(title = '', desc = '') {
  const text = `${title} ${desc}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (/pecho|pec|chest|press|hombro|shoulder|deltoid|bicep|tricep|espalda|back|pulldown|row|remo|lat|brazo|arm|dip|curl/i.test(text)) {
    return 'Tren Superior';
  }
  if (/pierna|leg|squat|prensa|press leg|extension|curl leg|femoral|cuadricep|glute|calf|gemelo|abductor|adductor/i.test(text)) {
    return 'Tren Inferior';
  }
  if (/abdom|abdominal|crunch|core|torso|oblicuo|lumbar|back extension/i.test(text)) {
    return 'Abdominales';
  }
  return 'Tren Superior'; // Fallback por defecto en fuerza selectorizada
}
```

### Enfoque B: Campo Nativo en Supabase (Estructural - Backend)
1. Añadir una columna `body_focus` (tipo `text` o `varchar`) en la tabla `products` de Supabase.
2. Permitir clasificar con precisión cada uno de los 69 productos desde el panel de Supabase o script SQL.

---

## 5. Plan de Cambios en el Código (Archivos Afectados)

| Archivo | Tipo | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/components/SelectorizedGridCatalog.jsx` | **Nuevo** | Componente con la vista en cuadrícula de 5 columnas, filtros de zona corporal, badges, paginación y cards como en la imagen. |
| `src/components/SearchModal.jsx` | **Nuevo** | Modal flotante de búsqueda global en tiempo real para las 3 páginas con filtros instantáneos y navegación directa. |
| `src/components/DynamicCatalog.jsx` | **Modificación** | Lógica condicional para delegar "Serie Selectorizada" al nuevo componente `SelectorizedGridCatalog`, manteniendo el carrusel para el resto de categorías o permitiendo alternar vistas. |
| `src/components/Navbar.jsx` | **Modificación** | Integración del botón/icono de búsqueda rápida y disparador del `SearchModal`. |
| `src/hooks/useProducts.js` | **Modificación** | Incorporación del campo `body_focus` (por inferencia automática o desde Supabase). |
| `src/pages/Equipos_Gimnasio.jsx` | **Modificación** | Integración del bloque selectorizado optimizado y soporte para anclajes directos. |
| `src/pages/Equipos_Hogar.jsx` | **Modificación** | Verificación de compatibilidad y soporte de búsqueda. |
| `src/pages/Home.jsx` | **Modificación** | Acceso al buscador global desde el Navbar y opcionalmente en el Hero. |
| `src/index.css` | **Modificación** | Estilos CSS para el grid de 5 columnas, botones de filtro negros/rojos, tarjetas técnicas, paginador y modal de búsqueda. |

---

## 6. Prototipo de Estilos y Estructura CSS

### Grid de 5 Columnas y Tarjetas
```css
/* Contenedor del Grid */
.selectorized-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-top: 24px;
}

@media (max-width: 1200px) {
  .selectorized-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .selectorized-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
}

/* Tarjeta Técnica */
.selectorized-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.selectorized-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.selectorized-img-box {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.selectorized-img-box img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Botones de Acción */
.card-actions-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
}

.btn-card-red {
  background: #a6192e;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  text-align: center;
  padding: 8px 4px;
  text-decoration: none;
  text-transform: uppercase;
}

.btn-card-dark {
  background: #111111;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  text-align: center;
  padding: 8px 4px;
  text-decoration: none;
  text-transform: uppercase;
}
```

---

## 7. Próximos Pasos para la Ejecución

1. **Aprobación del Enfoque Técnico**: Validar si el filtro de zona muscular se cargará por inferencia automática en frontend o si se añadirá la columna en Supabase.
2. **Creación de Componentes**:
   - Desarrollar `SelectorizedGridCatalog.jsx` con los filtros y la paginación.
   - Desarrollar `SearchModal.jsx` y conectarlo a `Navbar.jsx`.
3. **Pruebas y Verificación**:
   - Verificar la navegación y fluidez en resolución móvil, tablet y escritorio.
   - Probar el comportamiento de búsqueda en las 3 páginas (*Home*, *Gimnasio*, *Hogar*).
   - Validar los enlaces directos a WhatsApp para cotización.
