import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { slugify } from './DynamicCatalog';

const QUICK_SUGGESTIONS = [
  'Serie Selectorizada',
  'Bancos',
  'Trotadoras',
  'Elípticas',
  'Tren Superior',
  'Tren Inferior',
  'Abdominales',
  'Cuerpo Completo',
  'Hammer Strength',
  'Life Fitness'
];

export default function SearchModal({ isOpen, onClose, products = [] }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    setQuery('');
    onClose();
  }, [onClose]);

  // Enfocar input al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Normalizador de texto para búsquedas tolerantes
  const normalizeText = (text = '') => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  };

  // Filtrado reactivo en tiempo real
  const filteredProducts = useMemo(() => {
    const cleanQuery = normalizeText(query);
    if (!cleanQuery) return [];

    const terms = cleanQuery.split(/\s+/).filter(Boolean);

    return products.filter((p) => {
      const searchable = normalizeText(
        `${p.Titles || ''} ${p.Desc || ''} ${p.Brand || ''} ${p.SubCategory || ''} ${p.Category || ''} ${p.usage || ''} ${p.body_focus || ''}`
      );
      return terms.every((term) => searchable.includes(term));
    });
  }, [products, query]);

  if (!isOpen) return null;

  const handleNavigateToProduct = (product) => {
    handleClose();
    const isHogarOnly = product.usage === 'Hogar';
    const basePath = isHogarOnly ? '/hogar' : '/gimnasio';
    const hash = slugify(product.SubCategory || 'productos');
    navigate(`${basePath}#${hash}`);
  };

  return (
    <div className="search-modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* BARRA SUPERIOR DE ENTRADA */}
        <div className="search-modal-input-bar">
          <svg className="search-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por equipo, serie, músculo (ej. 'Axiom', 'Pectoral', 'Trotadora')..."
            className="search-modal-input"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="search-clear-btn"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}

          <button
            type="button"
            onClick={handleClose}
            className="search-close-btn"
            aria-label="Cerrar búsqueda"
          >
            ESC
          </button>
        </div>

        {/* CONTENIDO: SUGERENCIAS O RESULTADOS */}
        <div className="search-modal-body">
          {!query.trim() ? (
            <div className="search-suggestions-box">
              <span className="search-suggestions-title">Búsquedas sugeridas:</span>
              <div className="search-suggestions-chips">
                {QUICK_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setQuery(sug)}
                    className="search-chip-btn"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="search-results-section">
              <div className="search-results-header">
                <span className="search-results-count">
                  {filteredProducts.length}{' '}
                  {filteredProducts.length === 1 ? 'equipo encontrado' : 'equipos encontrados'}
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="search-empty-state">
                  <p className="search-empty-title">No encontramos equipos para "{query}"</p>
                  <p className="search-empty-subtitle">
                    Prueba buscando por marca (Life Fitness, Hammer Strength), por categoría (Fuerza, Cardio) o por zona muscular (Tren Superior, Tren Inferior).
                  </p>
                </div>
              ) : (
                <div className="search-results-list">
                  {filteredProducts.map((p) => {
                    const encodedMsg = encodeURIComponent(
                      `Hola, me interesa solicitar cotización e información sobre el equipo ${p.Titles} (${p.Brand}).`
                    );

                    return (
                      <div key={p.id} className="search-result-row">
                        <div className="search-result-thumb">
                          <img
                            src={p.img}
                            alt={p.Titles}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src =
                                'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop';
                            }}
                          />
                        </div>

                        <div className="search-result-info">
                          <div className="search-result-tags">
                            <span className="search-result-brand">{p.Brand}</span>
                            <span className="search-result-category">
                              {p.Category} • {p.SubCategory}
                            </span>
                            {p.body_focus && (
                              <span 
                                className="search-result-muscle"
                                data-focus={slugify(p.body_focus)}
                              >
                                {p.body_focus}
                              </span>
                            )}
                            <span className="search-result-usage">{p.usage}</span>
                          </div>

                          <h4 className="search-result-title">{p.Titles}</h4>
                          <p className="search-result-desc">{p.Desc}</p>
                        </div>

                        <div className="search-result-actions">
                          <a
                            href={`https://wa.me/582129856316?text=${encodedMsg}`}
                            target="_blank"
                            rel="noreferrer"
                            className="search-btn-cotizar"
                          >
                            Cotizar
                          </a>
                          <button
                            type="button"
                            onClick={() => handleNavigateToProduct(p)}
                            className="search-btn-ver"
                          >
                            Ver en Catálogo
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
