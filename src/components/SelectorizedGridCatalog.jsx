import React, { useState, useEffect, useMemo, useRef } from 'react';
import { slugify } from './DynamicCatalog';

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
  const gridRef = useRef(null);

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

  // Conteo por categoría muscular para mostrar badges informativos
  const counts = useMemo(() => {
    const summary = { todos: items.length, superior: 0, inferior: 0, abdomen: 0 };
    items.forEach(p => {
      if (p.body_focus === 'Tren Superior') summary.superior += 1;
      else if (p.body_focus === 'Tren Inferior') summary.inferior += 1;
      else if (p.body_focus === 'Abdominales') summary.abdomen += 1;
    });
    return summary;
  }, [items]);

  // Filtrado reactivo de productos
  const filteredItems = useMemo(() => {
    if (activeFilter === 'todos') return items;
    const targetLabel = MUSCLE_FILTERS.find(f => f.id === activeFilter)?.label;
    return items.filter(item => item.body_focus === targetLabel);
  }, [items, activeFilter]);

  // Paginación adaptativa: 3 filas completas según las columnas visibles
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

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

        {/* Pestañas de Enfoque Muscular */}
        <div className="selectorized-filter-pills" role="tablist" aria-label="Filtro por zona muscular">
          {MUSCLE_FILTERS.map(filter => {
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
      </div>

      {/* CUADRÍCULA DE PRODUCTOS */}
      <div className="selectorized-grid" ref={gridRef}>
        {paginatedItems.map((p) => {
          const encodedMsg = encodeURIComponent(
            `Hola, me interesa solicitar cotización e información sobre el equipo ${p.Titles} (${p.Brand}).`
          );

          return (
            <div key={p.id} className="selectorized-card">
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
                  <span className="selectorized-focus-tag">
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

