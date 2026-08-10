import React, { memo, useRef } from 'react';

// Orden preferido de subcategorías
const PREFERRED_ORDER = [
  'Multigimnasios',
  'Serie Selectorizada',
  'Selectorizado',
  'Placas',
  'Bancos y Racks',
  'Trotadoras',
  'Elípticas',
  'Bicicletas Verticales',
  'Bicicletas Reclinadas',
  'Air Bikes',
  'Ciclismo Indoor',
  'Remos'
];

export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const SubCategoryRow = ({ subCategory, items }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div id={slugify(subCategory)} className="subcategory-row-block">
      <div className="subcat-header-v3">
        <div className="subcat-title-wrapper">
          <h3 className="subcat-title">{subCategory}</h3>
          <span className="subcat-count-badge">{items.length} {items.length === 1 ? 'equipo' : 'equipos'}</span>
        </div>

        {items.length > 3 && (
          <div className="carousel-nav-btns">
            <button 
              onClick={scrollLeft} 
              aria-label={`Anterior en ${subCategory}`} 
              className="carousel-btn prev-btn"
            >
              &#10094;
            </button>
            <button 
              onClick={scrollRight} 
              aria-label={`Siguiente en ${subCategory}`} 
              className="carousel-btn next-btn"
            >
              &#10095;
            </button>
          </div>
        )}
      </div>

      <div className="carousel-container-v3">
        <div ref={carouselRef} className="product-carousel-v3">
          {items.map((p) => {
            const encodedMsg = encodeURIComponent(`Hola, me interesa solicitar cotización e información sobre el equipo ${p.Titles} (${p.Brand}).`);
            return (
              <div key={p.id} className="carousel-item-v3">
                <div className="product-card-v3">
                  <div className="product-img-wrapper-v3">
                    <img src={p.img} alt={p.Titles} loading="lazy" />
                    <span className="product-brand-tag-v3">
                      {p.Brand}
                    </span>
                  </div>
                  <div className="product-info-v3">
                    <h4 className="product-name-v3">{p.Titles}</h4>
                    <p className="product-description-v3">{p.Desc}</p>
                    <div className="product-actions-v3">
                      <a
                        href={`https://wa.me/584123361549?text=${encodedMsg}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-v3 btn-cotizar-v3"
                      >
                        Cotizar
                      </a>
                      {p.Manual ? (
                        <a 
                          href={p.Manual} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn-v3 btn-info-v3"
                        >
                          Manual / Ficha
                        </a>
                      ) : (
                        <a
                          href={`https://wa.me/584123361549?text=${encodedMsg}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-v3 btn-info-v3"
                        >
                          Info
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="carousel-legend-v3">
          Desliza horizontalmente para ver más {subCategory.toLowerCase()}
        </div>
      </div>
    </div>
  );
};

const DynamicCatalog = ({ products = [], title = '' }) => {
  if (!products || products.length === 0) {
    return null;
  }

  // Agrupar productos por SubCategory
  const groupedProducts = products.reduce((acc, product) => {
    const sub = product.SubCategory || 'General';
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(product);
    return acc;
  }, {});

  // Ordenar subcategorías de manera descendente según la cantidad de productos (las filas con más productos primero)
  const sortedSubcategories = Object.keys(groupedProducts).sort((a, b) => {
    const countA = groupedProducts[a].length;
    const countB = groupedProducts[b].length;

    // Primero de mayor a menor según cantidad de productos
    if (countB !== countA) {
      return countB - countA;
    }

    // Desempate respetando PREFERRED_ORDER primero o alfabético
    const idxA = PREFERRED_ORDER.indexOf(a);
    const idxB = PREFERRED_ORDER.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  const sectionId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <section id={sectionId} className="product-section-v3">
      <div className="container">
        {/* Banner de Categoría Principal (Fuerza / Cardio) */}
        <div className="main-cat-banner">
          <div className="main-cat-badge">CATEGORÍA</div>
          <h2 className="main-cat-title">
            LÍNEA DE <span className="highlight-text">{title.toUpperCase()}</span>
          </h2>
          <p className="main-cat-desc">
            {title.toLowerCase() === 'fuerza' 
              ? 'Equipamiento diseñado con biomecánica de vanguardia y resistencia superior.' 
              : 'Tecnología cardiovascular de alto rendimiento con consolas interactivas.'}
          </p>
        </div>

        {/* Filas por Subcategoría */}
        <div className="subcategories-container">
          {sortedSubcategories.map((subCategory) => (
            <SubCategoryRow
              key={subCategory}
              subCategory={subCategory}
              items={groupedProducts[subCategory]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(DynamicCatalog);
