import React from 'react';

const DynamicCatalog = ({ products, title }) => {
  // Agrupar productos por SubCategory
  const groupedProducts = products.reduce((acc, product) => {
    const sub = product.SubCategory || 'General';
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(product);
    return acc;
  }, {});

  return (
    <div className="dynamic-catalog-v3">
      {Object.entries(groupedProducts).map(([subCategory, items]) => (
        <section key={subCategory} className="product-section-v3">
          <div className="container">
            <div className="cat-header-v3">
              <h2 className="section-title">{title} <span>{subCategory}</span></h2>
            </div>

            <div className="carousel-container-v3">
              <div className="product-carousel-v3">
                {items.map((p) => (
                  <div key={p.id} className="carousel-item-v3">
                    <div className="product-card-v3">
                      <div className="product-img-wrapper-v3">
                        <img src={p.img} alt={p.Titles} loading="lazy" />
                        <span className="product-brand-tag-v3">
                          {p.Brand}
                        </span>
                      </div>
                      <div className="product-info-v3">
                        <h3 className="product-name-v3">{p.Titles}</h3>
                        <p className="product-description-v3">{p.Desc}</p>
                        <div className="product-actions-v3">
                          <a
                            href={`https://wa.me/584120000000?text=Hola, me interesa el equipo ${p.Titles}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-v3 btn-cotizar-v3"
                          >
                            Cotizar
                          </a>
                          <a href={p.Manual} target="_blank" rel="noreferrer" className="btn-v3 btn-info-v3">
                            Info
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="carousel-legend-v3">
                Deslice para ver más {subCategory}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default DynamicCatalog;
