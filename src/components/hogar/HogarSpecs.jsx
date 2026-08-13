import React from 'react';
import gymhOgar from '../../assets/img/ATMOS_2026_LifeFitness_Treadmill_Right45_Talent_3021_V4_med.webp';

const HogarSpecs = () => {
  // Reemplaza con tu número real (Código de país + número, sin el +)
  const whatsappNumber = "584123361549";
  const defaultMessage = encodeURIComponent("hola lifefitnes, estoy interesado en implementar un gimnasio en casa");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <section className="specs-section-v3">
      <div className="container">
        <div className="specs-layout-v3">
          <div className="specs-info-v3">

            {/* H2 ajustado a un tamaño más compacto */}
            <h2
              className="specs-title-v3"
              style={{
                fontSize: '2.2rem',
                lineHeight: '1.2',
                marginBottom: '1rem'
              }}
            >
              Gimnasio en casa <span>a tu Medida</span>
            </h2>

            <p className="specs-desc-v3">
              Celebridades, atletas de élite y ejecutivos recurren a Life Fitness para equipar sus gimnasios en casa.
            </p>

            {/* Subtítulo 1 */}
            <h3
              className="specs-subtitle-v3"
              style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#ffffff',
                marginTop: '1.8rem',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Creamos tu diseño personalizado
            </h3>
            <p className="specs-desc-v3">
              Nuestros expertos en diseño de gimnasios trabajan contigo para crear un diseño personalizado para tu gimnasio en casa, ayudándote a optimizar tanto tu presupuesto como tu espacio. Esto te ayudará a visualizar tu nuevo gimnasio.
            </p>

            {/* Subtítulo 2 */}
            <h3
              className="specs-subtitle-v3"
              style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#ffffff',
                marginTop: '1.8rem',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Entregamos e instalamos
            </h3>
            <p className="specs-desc-v3">
              Tu equipo será entregado e instalado por el equipo técnico local de Life Fitness. ¡Prepárate para años de entrenamiento y buena forma física!
            </p>

            {/* Botón Rojo para Contactar al Experto */}
            <div style={{ marginTop: '2rem' }}>
              <a
                href={whatsappUrl}
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
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                Contactar a experto
              </a>
            </div>

          </div>

          <div className="specs-image-v3">
            <img src={gymhOgar} alt="Life Fitness Treadmill Home Gym" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HogarSpecs;