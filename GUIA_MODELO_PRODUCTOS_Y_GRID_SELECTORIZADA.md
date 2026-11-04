# Guía Arquitectónica: Modelo de Muestra de Productos, Tarjetas y Transición a Cuadrícula (Serie Selectorizada y Catálogo General)

**Proyecto:** Life Fitness & Hammer Strength Venezuela  
**Objetivo:** Comprender el funcionamiento del sistema actual de tarjetas y catálogo de productos, y disponer de una guía paso a paso con código y arquitectura para implementar una vista en cuadrícula (Grid de 5 columnas, filtros y paginación) tanto para la **Serie Selectorizada (67 equipos)** como para **cualquier categoría o la página completa**.

---

## 1. ¿Cómo Funciona Actualmente el Modelo de Muestra de Productos?

Para entender cómo se muestra cada tarjeta en la pantalla, es necesario seguir la ruta del dato desde la base de datos hasta el navegador del usuario:

```
[ Supabase DB ] (Tabla 'products' + 'brands' + 'subcategories')
       │
       ▼
[ useProducts.js ] (Hook de React: Fetching, normalización de uso, limpieza de títulos)
       │
       ▼
[ Equipos_Gimnasio.jsx / Equipos_Hogar.jsx ] (Filtra por uso: Gimnasio/Hogar y categoría: Fuerza/Cardio)
       │
       ▼
[ DynamicCatalog.jsx ] (Agrupa por SubCategory, ordena por cantidad de equipos)
       │
       ▼
[ SubCategoryRow ] (Fila individual por subcategoría con scroll horizontal / carrusel)
       │
       ▼
[ product-card-v3 ] (Tarjeta visual: imagen, marca, nombre, descripción y botones WhatsApp/Manual)
```

---

### 1.1 El Ciclo Paso a Paso

#### Paso 1: Origen y transformación de datos (`src/hooks/useProducts.js`)
1. El hook `useProducts()` hace una consulta relacional a Supabase:
   ```javascript
   supabase.from('products').select(`
     id, sku, title, description, usage, img_url, manual_url,
     brands ( name ),
     subcategories ( name, categories ( name ) )
   `);
   ```
2. **Normalización (`normalizeUsage`)**: Detecta si el producto es `Gimnasio`, `Hogar` o `Ambos`.
3. **Limpieza de títulos (`cleanTitle`)**: Elimina números o prefijos del título y asegura que el nombre sea legible.
4. **Objeto unificado que llega a los componentes**:
   ```javascript
   {
     id: "142",
     Brand: "Life Fitness",           // o Hammer Strength
     Category: "Fuerza",             // o Cardio
     SubCategory: "Serie Selectorizada",
     usage: "Gimnasio",              // Hogar, Gimnasio o Ambos
     img: "https://...",
     Titles: "Serie Selectorizada Axiom Pec Fly / Rear Delt",
     Desc: "Movimiento biomecánico de doble función para pecho y deltoides...",
     Manual: "https://...pdf"        // URL de la ficha técnica si existe
   }
   ```

#### Paso 2: Filtrado por Página (`src/pages/Equipos_Gimnasio.jsx`)
La página recibe la lista total y la subdivide:
- **Filtro de uso:** `products.filter(p => p.usage === 'Gimnasio' || p.usage === 'Ambos')`
- **Bloque Fuerza:** `products.filter(p => p.Category === 'Fuerza')`
- **Bloque Cardio:** `products.filter(p => p.Category === 'Cardio')`
Luego invoca al catálogo para cada bloque:
```jsx
<DynamicCatalog products={fuerzaProducts} title="Fuerza" />
<DynamicCatalog products={cardioProducts} title="Cardio" />
```

#### Paso 3: Agrupación y Ordenamiento (`src/components/DynamicCatalog.jsx`)
1. **Agrupación (`groupBy`)**: Toma los productos y los divide en listas según su `SubCategory` (ej. `'Serie Selectorizada': [67 items]`, `'Bancos y Racks': [6 items]`).
2. **Priorización**: Ordena las filas mostrando primero aquellas que tienen más productos (por eso la Serie Selectorizada queda de primera).
3. **Renderizado de filas**: Por cada subcategoría genera un `<SubCategoryRow subCategory={...} items={...} />`.

#### Paso 4: La Fila y el Carrusel (`SubCategoryRow`)
- Cada subcategoría crea un encabezado con:
  - Título (`subcat-title`).
  - Badge rojo con el total de equipos (`subcat-count-badge`).
  - Botones de navegación flecha izquierda `&#10094;` y derecha `&#10095;`.
- El cuerpo es un contenedor con scroll horizontal (`overflow-x: auto; scroll-snap-type: x mandatory`).
- Cada tarjeta ocupa un ancho proporcional fijo (`flex: 0 0 calc(20% - 16px)` en pantallas grandes, es decir, se ven ~5 tarjetas a la vez en el viewport).

#### Paso 5: La Tarjeta de Producto (`product-card-v3`)
Está compuesta por tres zonas principales:
1. **Zona de Imagen (`product-img-wrapper-v3`)**:
   - Marco blanco de altura fija con imagen centrada (`object-fit: contain`).
   - Etiqueta de marca flotante en esquina superior derecha (`product-brand-tag-v3`), fondo negro carbón con texto blanco (ej. `HAMMER STRENGTH` o `LIFE FITNESS`).
2. **Zona de Información (`product-info-v3`)**:
   - Título en negrita mayúscula (`product-name-v3`).
   - Breve descripción de la máquina (`product-description-v3`).
3. **Zona de Acciones (`product-actions-v3`)**:
   - **Botón Rojo "Cotizar"**: Enlace dinámico `https://wa.me/582129856316?text=...` que precarga el texto:  
     *`"Hola, me interesa solicitar cotización e información sobre el equipo [Nombre] ([Marca])."`*
   - **Botón Oscuro "Manual / Ficha"**: Si el producto tiene URL de manual abre el PDF en una pestaña nueva; si no tiene, redirige a WhatsApp solicitando información.

---

## 2. Diagnóstico: ¿Por qué el Modelo Actual Falla con los 67 Equipos de la Serie Selectorizada?

| Aspecto | Con 3 a 6 productos (ej. Remos o Elípticas) | Con 67 productos (Serie Selectorizada) |
| :--- | :--- | :--- |
| **Tipo de navegación** | Carrusel horizontal agradable. | Scroll horizontal infinito agotador. |
| **Exploración visual** | El usuario ve casi todo en 1 o 2 clics. | Debe hacer clic más de 20 veces para ver el final. |
| **Búsqueda por necesidad** | Sencilla porque son pocas opciones. | Imposible si el cliente solo busca "máquinas de pierna" o "pecho". |
| **Carga en memoria (DOM)** | Muy ligera (<6 nodos de tarjeta). | 67 tarjetas cargadas simultáneamente en una sola fila. |

---

## 3. La Solución: Nueva Vista en Cuadrícula (Grid de 5 Columnas)

El objetivo es transformar la forma en que se presentan los productos voluminosos, pasando de una fila deslizante a un catálogo interactivo estructurado:

```
+---------------------------------------------------------------------------------------------------------+
| SERIE SELECTORIZADA  [ 67 EQUIPOS ]                 [ TODOS ] [ TREN SUPERIOR ] [ TREN INFERIOR ] [ ABDOMEN ] |
+---------------------------------------------------------------------------------------------------------+
| [ Card 1 ]        [ Card 2 ]        [ Card 3 ]        [ Card 4 ]        [ Card 5 ]                      |
| [ Card 6 ]        [ Card 7 ]        [ Card 8 ]        [ Card 9 ]        [ Card 10 ]                     |
+---------------------------------------------------------------------------------------------------------+
|                              [ Anterior ]   1   2   3   4   5   6   7   [ Siguiente ]                    |
+---------------------------------------------------------------------------------------------------------+
```

### Características Principales:
1. **Contador dinámico**: Indica cuántos equipos hay en la selección activa (ej. `[ 67 EQUIPOS ]` o `[ 24 EQUIPOS - TREN SUPERIOR ]`).
2. **Pestañas de Filtro por Enfoque Muscular**: Botones de alto contraste (activo en rojo corporativo `#a6192e`, inactivos en negro `#111111`).
3. **Grid Responsive de 5 columnas**:
   - Pantallas grandes (>1200px): 5 columnas (2 filas = 10 productos por vista).
   - Pantallas medianas (768px a 1199px): 3 columnas.
   - Móviles (<768px): 2 columnas compactas.
4. **Paginación Inteligente**: 10 productos por página con scroll automático suave hacia el inicio de la sección cada vez que el usuario cambia de página o de filtro.

---

## 4. Clasificación Muscular (`body_focus`): ¿Cómo saber y cambiar a qué grupo pertenece cada equipo?

El sistema cuenta con una arquitectura de triple jerarquía para asignar la zona corporal o enfoque muscular a cada producto (`Tren Superior`, `Tren Inferior`, `Abdominales`, `Cuerpo Completo`):

```
1. Columna 'body_focus' en Supabase (Prioridad Máxima si existe)
        │ (si es null o no existe)
        ▼
2. Diccionario MANUAL_FOCUS_OVERRIDES en src/utils/muscleClassifier.js (Manual por código)
        │ (si no está especificado)
        ▼
3. Clasificador Biomecánico Automático classifyMuscleFocus() (Inferencia inteligente por subcategoría/título)
```

---

### 4.1 Método 1 (Recomendado y más rápido): Asignación Manual por Código

En el archivo [`src/utils/muscleClassifier.js`](file:///c:/Users/Lenovo/Desktop/lifefitnes%20venezuela/src/utils/muscleClassifier.js), encontrarás en la parte superior el objeto `MANUAL_FOCUS_OVERRIDES`.

Para cambiar manualmente cualquier producto, simplemente añade su **ID de producto** o su **Título exacto** y la zona muscular deseada:

```javascript
// src/utils/muscleClassifier.js

export const MANUAL_FOCUS_OVERRIDES = {
  // Ejemplos de uso:
  7: 'Tren Inferior',               // Asigna el producto ID 7 a Tren Inferior
  117: 'Cuerpo Completo',           // Asigna el Flexibility Trainer a Cuerpo Completo
  120: 'Tren Superior',             // Asigna la torre Leg Raise/Dip/Chin a Tren Superior
  'Trotadora T3': 'Tren Inferior',  // También puedes usar el nombre exacto
};
```

#### Valores de Enfoque Válidos:
* `'Tren Inferior'` (Cuádriceps, glúteos, isquiotibiales, gemelos, trotadoras, bicicletas)
* `'Tren Superior'` (Pectoral, espalda, hombros, bíceps, tríceps, bancos de press)
* `'Abdominales'` (Core, recto abdominal, lumbares, hiperextensión, elevación de piernas)
* `'Cuerpo Completo'` (Elípticas, remos, air bikes, multigimnasios, estiramiento)

Al guardar el archivo, los cambios se reflejan al instante tanto en el buscador global como en las pestañas del catálogo.

---

### 4.2 Método 2: Asignación Manual desde la Base de Datos (Supabase)

Si prefieres gestionar las zonas musculares desde el panel web de Supabase sin tocar código:

1. Ingresa a tu panel de **Supabase** y ve al **Table Editor**.
2. Selecciona la tabla **`products`**.
3. Haz clic en **Insert Column** (Añadir columna):
   * **Name:** `body_focus`
   * **Type:** `text` (o `varchar`)
   * **Default value:** déjalo vacío / `NULL`
4. En cualquier fila de producto donde desees fijar una zona específica, escribe directamente en la celda:
   * `Tren Inferior`
   * `Tren Superior`
   * `Abdominales`
   * `Cuerpo Completo`
5. Si dejas la celda vacía (`NULL`), el sistema usará automáticamente el clasificador inteligente.

> **Nota Técnica:** En [`src/hooks/useProducts.js`](file:///c:/Users/Lenovo/Desktop/lifefitnes%20venezuela/src/hooks/useProducts.js), la consulta utiliza `select('*')`, por lo que detecta la columna `body_focus` automáticamente sin necesidad de modificar el código frontend.

---

### 4.3 Estilo Visual de las Etiquetas
Todas las etiquetas de enfoque muscular (`Tren Superior`, `Tren Inferior`, `Abdominales` y `Cuerpo Completo`) conservan el diseño corporativo rojo unificado:
* **En el buscador:** Fondo rojo translúcido (`rgba(166, 25, 46, 0.2)`) con texto rojo destacado (`#ff6b7e`).
* **En las tarjetas del catálogo:** Tipografía técnica roja corporativa (`var(--primary, #a6192e)`).

---

## 5. Implementación: Paso a Paso y Código Listo para Usar

A continuación se detallan los 4 pasos necesarios para incorporar este sistema.

---

### Paso 1: Crear el Componente de Cuadrícula Paginada
Crea el archivo `src/components/SelectorizedGridCatalog.jsx` (o `ProductGridCatalog.jsx` si deseas reutilizarlo en otras categorías):

```jsx
// src/components/SelectorizedGridCatalog.jsx
import React, { useState, useMemo, useRef } from 'react';
import { slugify } from './DynamicCatalog';

const ITEMS_PER_PAGE = 10;

// Filtros por Enfoque Muscular
const MUSCLE_FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'superior', label: 'Tren Superior' },
  { id: 'inferior', label: 'Tren Inferior' },
  { id: 'abdomen', label: 'Abdominales' }
];

export default function SelectorizedGridCatalog({ 
  subCategory = 'Serie Selectorizada', 
  items = [] 
}) {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);

  // Clasificador inteligente si no viene asignado de base de datos
  const enrichedItems = useMemo(() => {
    return items.map(item => {
      if (item.body_focus) return item;
      const text = `${item.Titles} ${item.Desc}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      
      let focus = 'Tren Superior';
      if (/pierna|leg|squat|prensa|press leg|extension|curl leg|femoral|cuadricep|glute|calf|gemelo|abductor|adductor|tibial/i.test(text)) {
        focus = 'Tren Inferior';
      } else if (/abdom|crunch|core|torso|oblicuo|lumbar|back extension|rotary/i.test(text)) {
        focus = 'Abdominales';
      }
      return { ...item, body_focus: focus };
    });
  }, [items]);

  // Filtrado de productos según el botón seleccionado
  const filteredItems = useMemo(() => {
    if (activeFilter === 'todos') return enrichedItems;
    const targetLabel = MUSCLE_FILTERS.find(f => f.id === activeFilter)?.label;
    return enrichedItems.filter(item => item.body_focus === targetLabel);
  }, [enrichedItems, activeFilter]);

  // Cálculo de paginación
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id={slugify(subCategory)} ref={sectionRef} className="selectorized-section-block scroll-mt-24">
      
      {/* 1. ENCABEZADO Y FILTROS */}
      <div className="selectorized-header">
        <div className="selectorized-title-box">
          <h3 className="selectorized-title">{subCategory}</h3>
          <span className="selectorized-badge">
            {filteredItems.length} {filteredItems.length === 1 ? 'EQUIPO' : 'EQUIPOS'}
          </span>
        </div>

        {/* Botones de Filtro Muscular */}
        <div className="selectorized-filter-pills">
          {MUSCLE_FILTERS.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`filter-pill-btn ${activeFilter === filter.id ? 'active' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. CUADRÍCULA DE 5 COLUMNAS */}
      <div className="selectorized-grid">
        {paginatedItems.map(p => {
          const encodedMsg = encodeURIComponent(
            `Hola, me interesa solicitar cotización e información sobre el equipo ${p.Titles} (${p.Brand}).`
          );

          return (
            <div key={p.id} className="selectorized-card">
              <div className="selectorized-img-box">
                <img src={p.img} alt={p.Titles} loading="lazy" />
                <span className="selectorized-brand-tag">{p.Brand}</span>
              </div>

              <div className="selectorized-info">
                <span className="selectorized-muscle-label">{p.body_focus}</span>
                <h4 className="selectorized-name" title={p.Titles}>{p.Titles}</h4>
                <p className="selectorized-desc">{p.Desc}</p>
                
                <div className="selectorized-actions">
                  <a
                    href={`https://wa.me/582129856316?text=${encodedMsg}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-card-red"
                  >
                    Cotizar
                  </a>
                  {p.Manual ? (
                    <a
                      href={p.Manual}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-card-dark"
                    >
                      Manual / Ficha
                    </a>
                  ) : (
                    <a
                      href={`https://wa.me/582129856316?text=${encodedMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-card-dark"
                    >
                      Info
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. PAGINADOR */}
      {totalPages > 1 && (
        <div className="selectorized-pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn prev-next"
          >
            &#10094; Anterior
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`pagination-num-btn ${currentPage === num ? 'active' : ''}`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn prev-next"
          >
            Siguiente &#10095;
          </button>
        </div>
      )}
    </div>
  );
}
```

---

### Paso 2: Integrar en `DynamicCatalog.jsx`
Para que el catálogo use automáticamente la cuadrícula en la Serie Selectorizada (o en cualquier subcategoría grande), modifica `src/components/DynamicCatalog.jsx`:

```jsx
// En src/components/DynamicCatalog.jsx
import SelectorizedGridCatalog from './SelectorizedGridCatalog';

// Dentro del return donde se mapean las subcategorías:
<div className="subcategories-container">
  {sortedSubcategories.map((subCategory) => {
    const items = groupedProducts[subCategory];

    // Condición: Si es 'Serie Selectorizada', usar la vista Grid de 5 columnas
    if (subCategory.toLowerCase().includes('selectorizada') || subCategory.toLowerCase().includes('selectorizado')) {
      return (
        <SelectorizedGridCatalog
          key={subCategory}
          subCategory={subCategory}
          items={items}
        />
      );
    }

    // Para el resto de subcategorías (ej. Remos, Elípticas, Bancos), mantener el carrusel
    return (
      <SubCategoryRow
        key={subCategory}
        subCategory={subCategory}
        items={items}
      />
    );
  })}
</div>
```

---

### Paso 3: Estilos CSS para el Grid y los Controles
Agrega los siguientes estilos a `src/index.css`:

```css
/* ==============================================================
   ESTILOS PARA CUADRÍCULA SELECTORIZADA / CATÁLOGO EN GRID
   ============================================================== */

.selectorized-section-block {
  background: #ffffff;
  padding: 2rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.04);
  margin-bottom: 2.5rem;
}

.selectorized-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 2px solid #f0f0f0;
}

.selectorized-title-box {
  display: flex;
  align-items: center;
  gap: 12px;
}

.selectorized-title {
  font-size: 1.35rem;
  font-weight: 900;
  color: #111;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 0.03em;
}

.selectorized-badge {
  background: var(--primary, #a6192e);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 20px;
  text-transform: uppercase;
}

/* Filtros por Músculo */
.selectorized-filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-pill-btn {
  background: #111111;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 7px 14px;
  border: 1px solid #333333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill-btn:hover {
  background: #333333;
  border-color: #555555;
}

.filter-pill-btn.active {
  background: var(--primary, #a6192e) !important;
  border-color: var(--primary, #a6192e) !important;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(166, 25, 46, 0.3);
}

/* Cuadrícula de 5 Columnas */
.selectorized-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-top: 1.5rem;
}

@media (max-width: 1280px) {
  .selectorized-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .selectorized-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .selectorized-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

/* Tarjeta en Cuadrícula */
.selectorized-card {
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.selectorized-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  border-color: #dddddd;
}

.selectorized-img-box {
  width: 100%;
  height: 180px;
  background: #fafafa;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.selectorized-img-box img {
  max-width: 95%;
  max-height: 95%;
  object-fit: contain;
}

.selectorized-brand-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #000000;
  color: #ffffff;
  font-size: 7px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 3px 6px;
  border-radius: 2px;
}

.selectorized-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.selectorized-muscle-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--primary, #a6192e);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.selectorized-name {
  font-size: 0.85rem;
  font-weight: 800;
  color: #111111;
  text-transform: uppercase;
  line-height: 1.25;
  margin: 0 0 6px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.2em;
}

.selectorized-desc {
  font-size: 0.72rem;
  color: #666666;
  line-height: 1.4;
  margin-bottom: 12px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Botones de Acción */
.selectorized-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-top: auto;
}

.btn-card-red,
.btn-card-dark {
  display: block;
  padding: 8px 4px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.btn-card-red {
  background: var(--primary, #a6192e);
  color: #ffffff;
}

.btn-card-red:hover {
  background: #8b1426;
}

.btn-card-dark {
  background: #111111;
  color: #ffffff;
}

.btn-card-dark:hover {
  background: #2a2a2a;
}

/* Paginador */
.selectorized-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f0f0;
}

.pagination-btn {
  background: #ffffff;
  border: 1px solid #dddddd;
  color: #111111;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #999999;
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 4px;
}

.pagination-num-btn {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dddddd;
  background: #ffffff;
  color: #111111;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-num-btn:hover {
  border-color: var(--primary, #a6192e);
  color: var(--primary, #a6192e);
}

.pagination-num-btn.active {
  background: var(--primary, #a6192e);
  border-color: var(--primary, #a6192e);
  color: #ffffff;
}
```

---

## 6. ¿Cómo Aplicar este Modelo a CUALQUIER Categoría o a la Página Completa?

Si en el futuro deseas que **otra categoría** (ejemplo: *Trotadoras*, *Bancos y Racks*, o *Toda la línea de Hogar*) o **todo el catálogo** use esta cuadrícula en vez de carruseles, existen tres estrategias:

### Estrategia A: Umbral Automático por Cantidad de Productos (Recomendada)
Hacer que el sistema decida automáticamente: si una subcategoría tiene más de cierta cantidad de equipos (por ejemplo, más de 8 o 10), se renderiza en **Cuadrícula Paginada**; si tiene pocos equipos (3 a 7), se mantiene en **Carrusel**:

```jsx
// En DynamicCatalog.jsx:
const THRESHOLD = 8; // Más de 8 productos activa cuadrícula

{sortedSubcategories.map((subCategory) => {
  const items = groupedProducts[subCategory];

  if (items.length > THRESHOLD) {
    return (
      <SelectorizedGridCatalog
        key={subCategory}
        subCategory={subCategory}
        items={items}
      />
    );
  }

  return (
    <SubCategoryRow
      key={subCategory}
      subCategory={subCategory}
      items={items}
    />
  );
})}
```

### Estrategia B: Por Configuración Explícita o Prop
Permitir especificar desde la página qué subcategorías deben verse en cuadrícula:

```jsx
// En Equipos_Gimnasio.jsx:
<DynamicCatalog 
  products={fuerzaProducts} 
  title="Fuerza" 
  gridCategories={['Serie Selectorizada', 'Bancos y Racks']} 
/>
```

Y en `DynamicCatalog.jsx`:
```jsx
const shouldBeGrid = gridCategories.includes(subCategory);
```

### Estrategia C: Selector de Vista para el Usuario (Toggle Grid / Carrusel)
Añadir dos botones en la cabecera de la subcategoría para que el visitante elija cómo navegar:
- Icono de cuadrícula `[ ::: ]` (Grid).
- Icono de carrusel horizontal `[ <==> ]` (Carrusel).

---

## 7. Resumen de Archivos y Responsabilidades

| Archivo | Rol |
| :--- | :--- |
| `src/hooks/useProducts.js` | Entrega los productos limpios y con datos relacionales. |
| `src/components/SelectorizedGridCatalog.jsx` | **Nuevo:** Gestiona la cuadrícula de 5 columnas, filtros por zona muscular y paginador. |
| `src/components/DynamicCatalog.jsx` | Orquesta la lista de subcategorías y decide si mostrar cuadrícula o carrusel. |
| `src/index.css` | Define las reglas responsivas de 5 columnas, tarjetas y botones de acción. |
| `src/pages/Equipos_Gimnasio.jsx` | Alimenta a `DynamicCatalog` con los productos de fuerza comercial. |

---

*Documento técnico preparado para el equipo de desarrollo de Life Fitness & Hammer Strength Venezuela.*

