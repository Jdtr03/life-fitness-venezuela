import React from 'react';

const CTA = () => {
  // Estilos en línea para asegurar el cambio de fondo y colores
  const sectionStyle = {
    backgroundColor: '#ffffff', // Fondo blanco
    padding: '80px 20px',
    textAlign: 'center',
    borderTop: '1px solid #f0f0f0'
  };

  const titleStyle = {
    color: '#1a1a1a', // Gris casi negro
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '20px',
    textTransform: 'uppercase'
  };

  const descStyle = {
    color: '#4a4a4a', // Gris suave
    fontSize: '1.1rem',
    maxWidth: '600px',
    margin: '0 auto 30px auto',
    lineHeight: '1.6'
  };

  const btnStyle = {
    backgroundColor: '#000000', // Botón negro sólido
    color: '#ffffff',
    padding: '15px 40px',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s'
  };

  return (
    <section className="cta" style={sectionStyle}>
      <div className="container cta-container">
        <div className="cta-content">
          <h2 className="cta-title" style={titleStyle}>
            ¿LISTO PARA ELEVAR TU GIMNASIO?
          </h2>
          <p className="cta-desc" style={descStyle}>
            Nuestros expertos están listos para asesorarte en el diseño y equipamiento de tu centro fitness.
          </p>
        </div>
        <button
          className="btn btn-primary cta-btn"
          style={btnStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#000'}
        >
          Hablar con un Experto
        </button>
      </div>
    </section>
  );
};

export default CTA;