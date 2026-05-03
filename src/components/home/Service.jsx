import React from 'react';

const Service = () => {
  const points = [
    "Mantenimiento preventivo integral",
    "Repuestos originales importados",
    "Diagnóstico y soporte especializado",
    "Asesoría técnica en todos nuestros equipos"
  ];

  return (
    <section id="servicio-tecnico" className="service">
      <div className="container service-grid">
        <div className="service-content">
          <h2 className="section-title text-white">
            SERVICIO <span>TÉCNICO OFICIAL</span>
          </h2>
          <p className="service-desc text-white">
            Garantizamos la vida útil y el máximo rendimiento de sus equipos con nuestro servicio técnico certificado y personal especializado en Life Fitness.
          </p>
          <ul className="service-list">
            {points.map((point, idx) => (
              <li key={idx}>
                <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
          <button className="btn btn-primary">Agendar Servicio Técnico</button>
        </div>
        <div className="service-visual">
          <img src="../../src/assets/servicio_Tecnico.jpeg" alt="Technical Service" className="service-img" />

        </div>
      </div>
    </section>
  );
};

export default Service;
