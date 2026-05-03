import React from 'react';

const GimnasioHero = () => {
  return (
    <section id="hero" className="catalog-hero">
      <img 
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
        alt="Gym Background" 
        className="catalog-hero-img"
      />
      <div className="catalog-hero-gradient"></div>
      <div className="container catalog-hero-content">
        <span className="catalog-badge">High Performance</span>
        <h1 className="catalog-title">Equipamiento de <span>Gimnasio</span></h1>
        <p className="catalog-subtitle">
          Ingeniería de clase mundial diseñada para soportar el uso comercial más intenso. 
          Potenciamos el rendimiento de los mejores centros deportivos de Venezuela.
        </p>
        <div className="hero-btns">
          <a href="#productos" className="btn btn-primary">Explorar Selección</a>
        </div>
      </div>
    </section>
  );
};

export default GimnasioHero;
