import React from 'react';

const GimnasioSpecs = () => {
  return (
    <section className="specs-section">
      <div className="container">
        <div className="specs-bento">
          <div className="glass-card">
            <h2 className="section-title">Especificaciones <span>Industriales</span></h2>
            <p className="text-muted" style={{marginTop: '1rem'}}>
              Nuestros equipos no solo se ven premium, están construidos para durar décadas 
              con el mínimo mantenimiento bajo condiciones extremas.
            </p>
            <div className="spec-grid">
              <div className="spec-item">
                <span className="value">11 GA</span>
                <span className="label">Acero Estructural</span>
              </div>
              <div className="spec-item">
                <span className="value">Urethane</span>
                <span className="label">Recubrimiento Élite</span>
              </div>
              <div className="spec-item">
                <span className="value">LifeConn</span>
                <span className="label">Ecosistema Digital</span>
              </div>
              <div className="spec-item">
                <span className="value">ISO-9001</span>
                <span className="label">Calidad Certificada</span>
              </div>
            </div>
          </div>
          <div style={{position: 'relative', overflow: 'hidden', borderRadius: '4px'}}>
            <img 
              src="https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=1974&auto=format&fit=crop" 
              alt="Technical Detail" 
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GimnasioSpecs;
