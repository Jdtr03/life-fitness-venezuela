import React from 'react';

const HogarHero = () => {
  return (
    <section id="hero" className="catalog-hero">
      <img 
        src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" 
        alt="Home Gym Background" 
        className="catalog-hero-img"
      />
      <div className="catalog-hero-gradient"></div>
      <div className="container catalog-hero-content">
        <span className="catalog-badge">Lifestyle & Performance</span>
        <h1 className="catalog-title">Equipamiento para <span>Hogar</span></h1>
        <p className="catalog-subtitle">
          Diseñamos soluciones de fitness residenciales que combinan lujo, tecnología 
          y rendimiento. Tu espacio personal de entrenamiento, sin compromisos.
        </p>
        <div className="hero-btns">
          <a href="#productos" className="btn btn-primary">Ver Equipos Hogar</a>
        </div>
      </div>
    </section>
  );
};

export default HogarHero;
