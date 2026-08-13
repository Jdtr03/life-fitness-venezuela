import React from 'react';
import imgGymStrength from '../../assets/img/LifeFitnessNuffield_SYNRGY-15.webp';

const GimnasioSpecs = () => {
  return (
    <section className="specs-section-v3">
      <div className="container">
        <div className="specs-layout-v3">
          <div className="specs-info-v3">
            <h2 className="specs-title-v3">Excelencia en <span>Ingeniería</span></h2>
            <p className="specs-desc-v3">
              Cada equipo LifeFitness y Hammer Strength está diseñado para soportar el uso más intenso, garantizando una biomecánica perfecta en cada repetición.
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

            {/* Botón Rojo para Ver Catálogo */}
            <div style={{ marginTop: '2rem' }}>
              <a
                href="/ES-LA_DUB_SD_CommercialCatalog_2026_low-res.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red-catalog"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#a6192e', // Rojo
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                Ver catálogo de producto
              </a>
            </div>
          </div>

          <div className="specs-image-v3">
            <img src={imgGymStrength} alt="Hammer Strength Engineering" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GimnasioSpecs;