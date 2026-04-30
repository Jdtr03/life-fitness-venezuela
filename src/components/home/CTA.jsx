import React from 'react';

const CTA = () => {
  // --- Estilos Actualizados para Replicar image_2.png ---

  // 1. Contenedor EXTERIOR de la sección (Fondo Blanco)
  const sectionWrapperStyle = {
    backgroundColor: '#ffffff', // Fondo blanco de la sección completa
    padding: '100px 20px', // Mucho padding arriba y abajo para crear espacio

    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // 2. Contenedor INTERIOR (La Caja Negra)
  const blackBoxStyle = {
    backgroundColor: '#111111', // Negro/Gris muy oscuro
    color: '#ffffff', // Todo el texto por defecto es blanco aquí
    width: '100%',
    maxWidth: '1200px', // Ancho máximo de la caja negra
    padding: '60px 80px', // Padding interno de la caja negra
    borderRadius: '12px', // Bordes redondeados sutiles (opcional, pero queda bien)
    display: 'flex',
    justifyContent: 'space-between', // Separa el texto a la izquierda y el botón a la derecha
    alignItems: 'center', // Centrado vertical de los elementos internos
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', // Sombra sutil opcional para dar profundidad
  };

  // 3. Contenedor de Texto (Título + Descripción)
  const textContentStyle = {
    maxWidth: '65%', // Limita el ancho del texto
  };

  // Estilo para el título (grande y en mayúsculas)
  const titleStyle = {
    fontFamily: "'Avenir Next', 'Helvetica Neue', sans-serif", // Una sans-serif geométrica moderna
    fontSize: '3rem', // Tamaño grande para el título
    fontWeight: '800', // Negrita extra
    lineHeight: '1.2', // Altura de línea ajustada
    marginBottom: '15px',
    textTransform: 'uppercase', // Convertir a mayúsculas
    letterSpacing: '-1px', // Espaciado entre letras más ajustado
  };

  // Estilo para la descripción (más pequeña y gris claro)
  const descStyle = {
    fontSize: '1.1rem',
    color: '#a0aec0', // Gris claro para contraste suave
    fontWeight: 'normal',
    lineHeight: '1.6',
  };

  // Estilo para el botón (Rojo)
  const btnStyle = {
    backgroundColor: '#e53e3e', // Rojo brillante
    color: '#ffffff', // Texto del botón en blanco
    padding: '18px 40px', // Padding grande
    fontSize: '1.1rem', // Tamaño de fuente
    fontWeight: 'bold', // Negrita
    border: 'none', // Sin borde
    borderRadius: '6px', // Bordes redondeados
    cursor: 'pointer', // Cursor de mano
    textTransform: 'uppercase', // Texto en mayúsculas
    letterSpacing: '1px', // Espaciado entre letras
    transition: 'background-color 0.3s ease',
    whiteSpace: 'nowrap', // Evita que el texto del botón se rompa en dos líneas
  };

  return (
    <section className="cta-wrapper" style={sectionWrapperStyle}>
      {/* Esta es la caja negra dentro de la sección blanca */}
      <div className="cta-container black-box" style={blackBoxStyle}>

        {/* Lado izquierdo: Texto */}
        <div className="cta-content" style={textContentStyle}>
          <h2 className="cta-title" style={titleStyle}>
            ¿Listo para elevar tu gimnasio?
          </h2>
          <p className="cta-desc" style={descStyle}>
            Nuestros consultores expertos están listos para diseñar una solución a medida para su centro deportivo o espacio personal.
          </p>
        </div>

        {/* Lado derecho: Botón */}
        <button
          className="btn cta-btn"
          style={btnStyle}
          // Efecto hover (cambiar color al pasar el mouse)
          onMouseOver={(e) => e.target.style.backgroundColor = '#c53030'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#e53e3e'}
        >
          Hablar con un Experto
        </button>
      </div>
    </section>
  );
};

export default CTA;