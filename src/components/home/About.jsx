import React from 'react';
import aboutImg from '../../assets/img/Sin_titulo.webp';

const About = () => {
  return (
    <section id="nosotros" className="about container">
      <div className="about-grid">
        <div className="about-content">
          <h2 className="section-title">
            LIFE FITNESS <br />
            <span>VENEZUELA</span>
          </h2>
          <p className="text-muted">
            Somos el distribuidor oficial de Life Fitness y Hammer Strength en Venezuela, liderando el mercado con equipos de fitness con tecnología de vanguardia.
          </p>
          <p className="text-muted" style={{ marginTop: '1.5rem' }}>
            Nuestra misión es transformar cada espacio a través de equipos diseñados para la excelencia, el alto rendimiento y la mejor experiencia de usuario en cada movimiento.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImg} alt="Life Fitness Equipment" loading="lazy" />
          <div className="image-shadow"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
