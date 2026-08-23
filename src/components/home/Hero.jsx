import React from 'react';
import heroHome from '../../assets/img/LFX_Hammer-Strength-HD-Athletic_07.webp';

const Hero = () => {
  const imagenFondo = heroHome;

  return (
    <header id="hero" className="hero" style={{
      position: 'relative',
      width: '100%',
      height: '110vh',
      backgroundColor: '#1a1a1a', // Fondo oscuro de respaldo
      backgroundImage: `url(${imagenFondo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'grid',
      gridTemplateColumns: '40% 60%',
      overflow: 'hidden'
    }}>
      {/* Capa de oscuridad para que el texto sea legible */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1
      }}></div>

      {/* Contenido Izquierdo */}
      <div style={{
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: '20%',
        textAlign: 'left'
      }}>
        <div className="animate-fade">
          <h1 style={{

            color: 'white',
            fontSize: '3.5rem',
            lineHeight: '1.1',
            fontWeight: '900',
            textTransform: 'uppercase',
            margin: '0 0 20px 0'
          }}>
            EL ESTÁNDAR <br />
            GLOBAL EN <br />
            <span style={{ color: '#a6192e', fontStyle: 'italic' }}>FITNESS</span>
          </h1>
          <p style={{
            color: '#ccc',
            fontSize: '1.1rem',
            maxWidth: '450px',
            marginBottom: '35px'
          }}>
            Transformamos espacios deportivos en Venezuela con tecnología de vanguardia y diseño ergonómico superior.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="/#productos" className="btn-primary" style={{
              backgroundColor: '#a6192e',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block'
            }}>Explorar Productos</a>
            <a href="/#nosotros" className="btn-outline" style={{
              backgroundColor: 'transparent',
              color: 'white',
              padding: '15px 30px',
              border: '1px solid white',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block'
            }}>Nuestra Historia</a>
          </div>
        </div>
      </div>

      {/* Columna Derecha (Vacía para lucir la imagen) */}
      <div style={{ zIndex: 2 }}></div>
    </header >
  );
};

export default Hero;