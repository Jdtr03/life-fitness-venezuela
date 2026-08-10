import React from 'react';
import gymhogar from '../../assets/img/HomGymParkVal.webp';
const HogarHero = () => {
  return (
    <section id="hero" className="catalog-hero-v3" style={{ backgroundImage: `url(${gymhogar})` }}>
      <div className="hero-overlay-v3"></div>
      <div className="container hero-container-v3">
        <div className="hero-content-v3">
          <span className="hero-badge-v3">Entrena en la comodidad de tu hogar</span>
          <h1 className="hero-title-v3">
            Equipos para el  <span>Hogar</span>
          </h1>
          <p className="hero-desc-v3">
            Equipos de alta gama diseñados para integrarse perfectamente en tu hogar. La misma calidad del gimnasio, ahora en tu espacio personal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HogarHero;
