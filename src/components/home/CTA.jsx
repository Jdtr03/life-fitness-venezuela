import React from 'react';

const CTA = () => {
  return (
    <section className="cta-wrapper">
      <div className="cta-box">
        <div className="cta-content">
          <h2 className="cta-title">
            ¿Listo para elevar tu gimnasio?
          </h2>
          <p className="cta-desc">
            Nuestros consultores expertos están listos para diseñar una solución a medida para su centro deportivo o espacio personal.
          </p>
        </div>
        <button className="btn cta-btn">
          Hablar con un Experto
        </button>
      </div>
    </section>
  );
};

export default CTA;