import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { slugify } from './DynamicCatalog';

const ALL_FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'superior', label: 'Tren Superior' },
  { id: 'inferior', label: 'Tren Inferior' },
  { id: 'abdomen', label: 'Abdominales' },
  { id: 'completo', label: 'Cuerpo Completo' }
];

export default function SelectorizedGridCatalog({ 
  subCategory = 'Serie Selectorizada', 
  items = [] 
}) {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const location = useLocation();

  // Ajuste inteligente para mostrar siempre 3 filas completas:
  // 5 columnas (>1350px / ancho >1050px) = 15 productos (3 filas x 5 cols)
  // 4 columnas (<=1350px / laptops 16" al 100%) = 12 productos (3 filas x 4 cols)
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 1350 ? 15 : 12;
    }
    return 15;
  });

  useEffect(() => {
    const updateItemsPerPage = () => {
      let isFiveCols = window.innerWidth > 1350;
      if (gridRef.current) {
        const width = gridRef.current.getBoundingClientRect().width;
        if (width > 1050) isFiveCols = true;
        else if (width < 980) isFiveCols = false;
      }
      const target = isFiveCols ? 15 : 12;
      setItemsPerPage((prev) => (prev !== target ? target : prev));
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    let observer = null;
    if (gridRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => updateItemsPerPage());
      observer.observe(gridRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
      if (observer) observer.disconnect();
    };
  }, []);

  // Conteo reactivo por categoría muscular para mostrar badges informativos
  const counts = useMemo(() => {
    const summary = { todos: items.length, superior: 0, inferior: 0, abdomen: 0, completo: 0 };
    items.forEach(p => {
      if (p.body_focus === 'Tren Superior') summary.superior += 1;
      else if (p.body_focus === 'Tren Inferior') summary.inferior += 1;
      else if (p.body_focus === 'Abdominales') summary.abdomen += 1;
      else if (p.body_focus === 'Cuerpo Completo') summary.completo += 1;
    });
    return summary;
  }, [items]);

  // Mostrar únicamente las pestañas de filtros que tengan equipos (> 0) en esta subcategoría
  const availableFilters = useMemo(() => {
    return ALL_FILTERS.filter(f => f.id === 'todos' || (counts[f.id] && counts[f.id] > 0));
  }, [counts]);

  // Si el filtro activo ya no existe en las opciones disponibles, volver a 'todos'
  useEffect(() => {
    if (!availableFilters.some(f => f.id === activeFilter)) {
      setActiveFilter('todos');
      setCurrentPage(1);
    }
  }, [availableFilters, activeFilter]);

  // Filtrado reactivo de productos
  const filteredItems = useMemo(() => {
    if (activeFilter === 'todos') return items;
    const target = ALL_FILTERS.find(f => f.id === activeFilter);
    if (!target) return items;
    return items.filter(item => item.body_focus === target.label);
  }, [items, activeFilter]);

  // Paginación adaptativa: 3 filas completas según las columnas visibles
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  // Sincronización automática cuando el usuario busca y toca un producto en el buscador
  useEffect(() => {
    const handleTargetProduct = (targetId) => {
      if (!targetId) return;
      const index = items.findIndex(p => String(p.id) === String(targetId));
      if (index === -1) return;

      const targetProduct = items[index];

      // Si el filtro actual ocultaría el producto, cambiar a 'todos'
      if (activeFilter !== 'todos') {
        const activeLabel = ALL_FILTERS.find(f => f.id === activeFilter)?.label;
        if (targetProduct.body_focus !== activeLabel) {
          setActiveFilter('todos');
        }
      }

      // Calcular la página correspondiente
      const targetPage = Math.floor(index / itemsPerPage) + 1;
      setCurrentPage(targetPage);

      // Desplazar y resaltar con animación suave
      setTimeout(() => {
        const el = document.getElementById(`product-${targetId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('product-highlight-glow');
          setTimeout(() => el.classList.remove('product-highlight-glow'), 2500);
        } else if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 180);
    };

    // 1. Detección por URL (?item=XYZ)
    const params = new URLSearchParams(location.search);
    const urlItemId = params.get('item');
    if (urlItemId) {
      handleTargetProduct(urlItemId);
    }

    // 2. Detección por evento personalizado 'focus-product-item'
    const onFocusEvent = (e) => {
      const { productId } = e.detail || {};
      if (productId) {
        handleTargetProduct(productId);
      }
    };

    window.addEventListener('focus-product-item', onFocusEvent);
    return () => window.removeEventListener('focus-product-item', onFocusEvent);
  }, [location.search, items, itemsPerPage, activeFilter]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      {/* ENCABEZADO Y FILTROS MUSCULARES */}
      <div className="selectorized-header">
        <div className="selectorized-title-box">
          <h3 className="selectorized-title">{subCategory}</h3>
          <span className="selectorized-count-badge">
            {filteredItems.length} {filteredItems.length === 1 ? 'equipo' : 'equipos'}
          </span>
        </div>

        {/* Pestañas de Enfoque Muscular (se muestran cuando hay variedad de zonas) */}
        {availableFilters.length > 2 && (
          <div className="selectorized-filter-pills" role="tablist" aria-label="Filtro por zona muscular">
            {availableFilters.map(filter => {
              const count = counts[filter.id] || 0;
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`selectorized-pill-btn ${isActive ? 'active' : ''}`}
                >
                  <span>{filter.label}</span>
                  <span className="pill-counter">({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* CUADRÍCULA DE PRODUCTOS */}
      <div className="selectorized-grid" ref={gridRef}>
        {paginatedItems.map((p) => {
          const encodedMsg = encodeURIComponent(
            `Hola, me interesa solicitar cotización e información sobre el equipo ${p.Titles} (${p.Brand}).`
          );

          return (
            <div key={p.id} id={`product-${p.id}`} className="selectorized-card">
              <div className="selectorized-img-box">
                <img 
                  src={p.img} 
                  alt={p.Titles} 
                  loading="lazy" 
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <span className="selectorized-brand-tag">{p.Brand}</span>
              </div>

              <div className="selectorized-info">
                <div className="selectorized-meta-row">
                  <span 
                    className="selectorized-focus-tag"
                    data-focus={slugify(p.body_focus || '')}
                  >
                    {p.body_focus || 'Fuerza'}
                  </span>
                </div>
                
                <h4 className="selectorized-name" title={p.Titles}>
                  {p.Titles}
                </h4>
                
                <p className="selectorized-desc" title={p.Desc}>
                  {p.Desc}
                </p>

                <div className="selectorized-actions">
                  <a
                    href={`https://wa.me/582129856316?text=${encodedMsg}`}
                    target="_blank"
                    rel="noreferrer"
                    className="selectorized-btn selectorized-btn-cotizar"
                  >
                    Cotizar
                  </a>

                  {p.Manual ? (
                    <a
                      href={p.Manual}
                      target="_blank"
                      rel="noreferrer"
                      className="selectorized-btn selectorized-btn-manual"
                    >
                      Manual / Ficha
                    </a>
                  ) : (
                    <a
                      href={`https://wa.me/582129856316?text=${encodedMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      className="selectorized-btn selectorized-btn-manual"
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

      {/* PAGINACIÓN INFERIOR */}
      {totalPages > 1 && (
        <div className="selectorized-pagination" aria-label="Navegación de páginas">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-nav-btn prev"
            aria-label="Página anterior"
          >
            &#10094; Anterior
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`pagination-number-btn ${currentPage === num ? 'active' : ''}`}
                aria-label={`Ir a página ${num}`}
                aria-current={currentPage === num ? 'page' : undefined}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-nav-btn next"
            aria-label="Página siguiente"
          >
            Siguiente &#10095;
          </button>
        </div>
      )}
    </div>
  );
}

export { SelectorizedGridCatalog as GridCatalog };
