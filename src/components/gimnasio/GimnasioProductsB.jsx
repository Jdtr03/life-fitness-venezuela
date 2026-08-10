import React from 'react';

const GimnasioProductsB = () => {
  const extraProducts = [
    {
      name: "Cybex Bravo Advanced",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      desc: "Entrenamiento funcional que combina fuerza y estabilidad en un diseño compacto."
    },
    {
      name: "ICG IC8 Indoor Power Trainer",
      img: "https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=2070&auto=format&fit=crop",
      desc: "Inspirada en el ciclismo de alto rendimiento. Máxima precisión en cada pedalada."
    },
    {
      name: "Hammer Strength HD Athletic",
      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
      desc: "Soportes y racks diseñados para el entrenamiento de atletas de alto rendimiento."
    },
    {
      name: "Life Fitness Axiom Series",
      img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
      desc: "Simplicidad y versatilidad. Movimientos suaves en una línea de fuerza refinada."
    }
  ];

  return (
    <section className="product-section" style={{ paddingTop: '5rem' }}>
      <div className="container">
        <h2 className="section-title">Equipamiento <span>Complementario</span></h2>
        
        <div className="carousel-container">
          <div className="product-carousel">
            {extraProducts.map((p, i) => (
              <div key={i} className="carousel-item">
                <div className="product-card">
                  <div className="product-img-wrapper">
                    <img src={p.img} alt={p.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name" style={{ fontSize: '1.2rem' }}>{p.name}</h3>
                    <p className="product-description" style={{ fontSize: '0.85rem' }}>{p.desc}</p>
                    <div className="product-actions">
                      <a href="https://wa.me/584123361549" target="_blank" rel="noreferrer" className="btn-cotizar">Cotizar</a>
                      <button className="btn-info">Info</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-legend">
            Deslice para más
          </div>
        </div>
      </div>
    </section>
  );
};

export default GimnasioProductsB;
