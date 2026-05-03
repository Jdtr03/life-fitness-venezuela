import React from 'react';

const HogarProductsB = () => {
  const extraProducts = [
    {
      name: "Life Fitness RS3 Recumbent",
      img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
      desc: "Confort superior y diseño abierto para un acceso fácil. Ideal para todas las edades."
    },
    {
      name: "Row HX Trainer",
      img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop",
      desc: "Remo de agua con diseño de madera elegante. Entrenamiento de cuerpo completo silencioso."
    },
    {
      name: "G7 Dual Adjustable Pulley",
      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
      desc: "La estación de fuerza funcional definitiva para el hogar. Infinitas posibilidades."
    },
    {
      name: "IC5 Indoor Cycle",
      img: "https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=2070&auto=format&fit=crop",
      desc: "Tecnología Coach By Color® para optimizar tu esfuerzo en cada sesión."
    }
  ];

  return (
    <section className="product-section" style={{ paddingTop: '5rem' }}>
      <div className="container">
        <h2 className="section-title">Equipamiento <span>Premium Casa</span></h2>
        
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
                      <a href="https://wa.me/584120000000" target="_blank" rel="noreferrer" className="btn-cotizar">Cotizar</a>
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

export default HogarProductsB;
