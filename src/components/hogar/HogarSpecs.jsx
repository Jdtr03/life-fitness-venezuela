import React from 'react';

const HogarSpecs = () => {
  return (
    <section className="specs-section">
      <div className="container">
        <div className="specs-bento">
          <div className="glass-card">
            <h2 className="section-title">Tecnología <span>Residencial</span></h2>
            <p className="text-muted" style={{marginTop: '1rem'}}>
              La misma ingeniería que encuentras en los gimnasios de clase mundial, 
              optimizada para la comodidad y estética de tu hogar.
            </p>
            <div className="spec-grid">
              <div className="spec-item">
                <span className="value">Whisper</span>
                <span className="label">Motor Ultra Silencioso</span>
              </div>
              <div className="spec-item">
                <span className="value">Compact</span>
                <span className="label">Ahorro de Espacio</span>
              </div>
              <div className="spec-item">
                <span className="value">HD Cons</span>
                <span className="label">Streaming & Apps</span>
              </div>
              <div className="spec-item">
                <span className="value">Warranty</span>
                <span className="label">Soporte Premium</span>
              </div>
            </div>
          </div>
          <div style={{position: 'relative', overflow: 'hidden', borderRadius: '4px'}}>
            <img 
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" 
              alt="Home Technical Detail" 
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HogarSpecs;
