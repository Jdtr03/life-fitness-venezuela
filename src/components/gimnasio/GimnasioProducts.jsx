import React from 'react';

const GimnasioProducts = () => {
  const products = [
    {
      name: "Hammer Strength MTS",
      tag: "Premium",
      isPremium: true,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyFWCojLpZU5sMrajRy__X4AirT5abm6cLs0rMjjKvvqIa21AErFPPdu6kEsM67XEnfDMQQd0d8THD8rIIP8GEN_2ME3bV3ATN79yIgLsoKeuVGJw0egCvN8elWmDF00clsBkE_x7SEaWuSgFoi1V8eTzJEswq1F8y8h6sMNaNhWepQnuvaJJAX68inFOuoVyiizFX6dqsTRraQPxZdJxtBshd9XHIuv79NWkvbZnhwfLEikjxJ4ujK91J3BmDynHbmrq_6DeS9gY",
      desc: "Tecnología Motion Technology Selectors (MTS) que permite movimientos independientes de cada brazo para una biomecánica perfecta."
    },
    {
      name: "Life Fitness Signature Series",
      tag: "Élite",
      isPremium: false,
      img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
      desc: "La culminación de años de investigación biomecánica. Equipos diseñados para integrarse en cualquier entorno fitness con elegancia y potencia."
    },
    {
      name: "Insígnia Series",
      tag: "Versatilidad",
      isPremium: false,
      img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop",
      desc: "Diseño moderno y ajustes intuitivos. La serie Insignia ofrece una experiencia de entrenamiento de fuerza conectada y fluida."
    },
    {
      name: "Hammer Strength Plate-Loaded",
      tag: "Hardcore",
      isPremium: true,
      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
      desc: "El estándar de oro para el entrenamiento de fuerza real. Durabilidad indestructible para los gimnasios más exigentes del mundo."
    }
  ];

  return (
    <section id="productos" className="product-section light">
      <div className="container">
        <div className="cat-header" style={{textAlign: 'left', marginBottom: '2rem'}}>
          <h2 className="section-title">Selección <span>Profesional</span></h2>
          <div style={{height: '4px', width: '60px', backgroundColor: 'var(--primary)', marginTop: '1rem'}}></div>
        </div>

        <div className="carousel-container">
          <div className="product-carousel">
            {products.map((p, i) => (
              <div key={i} className="carousel-item">
                <div className="product-card">
                  <div className="product-img-wrapper">
                    <img src={p.img} alt={p.name} />
                    <span className={`product-tag ${p.isPremium ? 'premium' : ''}`}>{p.tag}</span>
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

export default GimnasioProducts;
