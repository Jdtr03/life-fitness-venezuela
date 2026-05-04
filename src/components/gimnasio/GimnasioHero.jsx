import React from 'react';

const GimnasioHero = () => {
  return (
    <section className="catalog-hero-v3" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" }}>
      <div className="hero-overlay-v3"></div>
      <div className="container hero-container-v3">
        <div className="hero-content-v3">
          <span className="hero-badge-v3">Life Fitness & Hammer Strength</span>
          <h1 className="hero-title-v3">
            Equipamiento para <span>Gimnasios</span>
          </h1>
          <p className="hero-desc-v3">
            Lleva tu centro de entrenamiento al siguiente nivel con la tecnología líder en la industria del fitness. Rendimiento, durabilidad y diseño biomecánico.
          </p>
          <div className="hero-actions-v2">
             {/* Espacio para botones si se requieren en el futuro */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GimnasioHero;
