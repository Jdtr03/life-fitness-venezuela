import React from 'react';

const HogarSpecs = () => {
  return (
    <section className="specs-section-v3">
      <div className="container">
        <div className="specs-layout-v3">
          <div className="specs-info-v3">
            <h2 className="specs-title-v3">Calidad de <span>Gimnasio</span></h2>
            <p className="specs-desc-v3">
              No comprometemos el rendimiento por el espacio. Nuestros equipos para el hogar mantienen 
              los mismos estándares de calidad que encontrarías en los mejores clubes del mundo.
            </p>
            
            <div className="spec-grid-v3">
              <div className="spec-item-v3">
                <span className="value">Quiet</span>
                <span className="label">Motor Silencioso</span>
              </div>
              <div className="spec-item-v3">
                <span className="value">Space</span>
                <span className="label">Diseño Compacto</span>
              </div>
              <div className="spec-item-v3">
                <span className="value">Flex</span>
                <span className="label">Amortiguación</span>
              </div>
              <div className="spec-item-v3">
                <span className="value">Connect</span>
                <span className="label">Apps de Fitness</span>
              </div>
            </div>
          </div>
          
          <div className="specs-image-v3">
            <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop" alt="Home Fitness Specs" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HogarSpecs;
