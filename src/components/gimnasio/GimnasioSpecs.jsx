import React from 'react';

const GimnasioSpecs = () => {
  return (
    <section className="specs-section-v3">
      <div className="container">
        <div className="specs-layout-v3">
          <div className="specs-info-v3">
            <h2 className="specs-title-v3">Excelencia en <span>Ingeniería</span></h2>
            <p className="specs-desc-v3">
              Cada equipo Hammer Strength y Life Fitness está diseñado para soportar el uso más intenso, 
              garantizando una biomecánica perfecta en cada repetición.
            </p>
            
            <div className="spec-grid-v3">
              <div className="spec-item-v3">
                <span className="value">11 GA</span>
                <span className="label">Acero Industrial</span>
              </div>
              <div className="spec-item-v3">
                <span className="value">+200</span>
                <span className="label">Pruebas de Impacto</span>
              </div>
              <div className="spec-item-v3">
                <span className="value">ISO</span>
                <span className="label">Certificación Global</span>
              </div>
              <div className="spec-item-v3">
                <span className="value">24/7</span>
                <span className="label">Uso Continuo</span>
              </div>
            </div>
          </div>
          
          <div className="specs-image-v3">
            <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" alt="Hammer Strength Engineering" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GimnasioSpecs;
