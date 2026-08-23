# Guía del Sistema de Catálogo Dinámico - Life Fitness Venezuela

Este proyecto utiliza una arquitectura **data-driven** (basada en datos). Esto significa que no necesitas editar código HTML/JSX para añadir o quitar productos; solo necesitas gestionar un archivo de datos centralizado.

## 1. Cómo Cargar Productos
Toda la información del catálogo reside en: `src/data/gym_data.js`.

### Estructura de un Producto
Para añadir un nuevo equipo, copia y pega este bloque dentro del array `gymData`:

```javascript
{
  id: "id_unico_aqui",        // Ej: "g1", "pro-001"
  Brand: "Life Fitness",      // "Life Fitness" o "Hammer Strength"
  Category: "Fuerza",         // "Fuerza" o "Cardio"
  SubCategory: "Selectorizado", // Ej: "Placas", "Cintas", "Bancos"
  usage: "Gimnasio",          // "Gimnasio" o "Hogar"
  img: "url_de_la_imagen",    // Link de la imagen (fondo blanco recomendado)
  Titles: "Nombre del Equipo", 
  Desc: "Descripción corta del equipo.",
  Manual: "/manuals/archivo.pdf" // Link al PDF o manual
}
```

### Reglas de Visualización
- **Bloque A**: Los productos con `Category: "Fuerza"` aparecen en la parte superior.
- **Bloque B**: Los productos con `Category: "Cardio"` aparecen en la parte inferior (debajo de Specs).
- **Subcategorías**: El sistema crea automáticamente una nueva fila (carrusel) por cada `SubCategory` diferente que encuentre.
- **Filtrado por Página**:
  - En la página **Equipos Gimnasio**, solo se ven los que tengan `usage: "Gimnasio"`.
  - En la página **Equipos Hogar**, solo se ven los que tengan `usage: "Hogar"`.

---

## 2. Cómo funciona el Sistema (Arquitectura)
El sistema utiliza un componente inteligente llamado `DynamicCatalog.jsx`:
1. **Filtra**: Recibe solo los productos que le corresponden a esa sección.
2. **Agrupa**: Clasifica los productos por su `SubCategory`.
3. **Renderiza**: Genera un carrusel táctil responsivo para cada grupo.

---

## 3. Cómo Cambiar el Diseño (Cards y Secciones)

### Cambiar el Estilo de las Tarjetas (Cards)
Si quieres cambiar colores, sombras, bordes o el tamaño de la tarjeta, debes editar el archivo:
`src/index.css`

Busca estas secciones:
- `.product-card`: Estilo general de la tarjeta (fondo, sombras, transiciones).
- `.product-img-wrapper`: Controla cómo se ve la imagen (tamaño, fondo blanco).
- `.product-info`: Padding y espaciado del texto dentro de la tarjeta.
- `.product-actions`: Diseño de los botones (Cotizar / Info).

### Cambiar el Fondo de las Secciones
El fondo de las secciones de productos es blanco por defecto (`#ffffff`). Para cambiarlo, busca en `index.css`:
```css
.product-section {
  background-color: #ffffff;
}
```

### Cambiar el Diseño del Carrusel
Para ajustar cuántos productos se ven o el comportamiento del scroll táctil, busca:
- `.product-carousel`: Controla el flujo horizontal.
- `.carousel-item`: Define el ancho de cada tarjeta (actualmente 25% en PC para mostrar 4).

---

## 4. Notas Importantes
- **Imágenes**: Se recomienda usar imágenes con fondo blanco transparente o blanco puro. El sistema usará `object-fit: contain` para asegurar que el producto no se corte.
- **WhatsApp**: El botón de cotización construye automáticamente un mensaje con el nombre del equipo seleccionado. Puedes cambiar el número de teléfono en `src/components/DynamicCatalog.jsx`.
- **Mantenimiento**: Si cambias el nombre de una `SubCategory` en el archivo de datos, el título de la sección en la web cambiará automáticamente.
