import React, { useState, useMemo, useRef } from 'react';
import { slugify } from './DynamicCatalog';

const ITEMS_PER_PAGE = 10;

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

  // Paginación (10 productos = 2 filas x 5 columnas)
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

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

      {/* CUADRÍCULA DE 5 COLUMNAS */}
      <div className="selectorized-grid">
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
