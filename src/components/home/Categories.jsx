import React from 'react';

const Categories = () => {
  const cats = [
    {
      title: "EQUIPOS PARA HOGAR",
      desc: "Ingeniería de vanguardia y tecnología aplicada al entrenamiento cardiovascular de alto rendimiento.",
      img: "../../src/assets/GYM_HOGAR.JPEG",
      btn1: "Equipos de Fuerza",
      btn2: "Equipo de Cardio "
    },
    {
      title: "EQUIPOS PARA GIMNASIOS",
      desc: "Biomecánica avanzada y durabilidad extrema para un entrenamiento de fuerza efectivo y seguro.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      btn1: "Equipos de Fuerza ",
      btn2: "Equipos de CArdio "
    }
  ];

  return (
    <section id="productos" className="categories container" style={{
      maxWidth: '1150px',
      margin: '0 auto',
      padding: '30px 20px'
    }}>

      <div className="cat-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 className="section-title">NUESTRAS <span>CATEGORÍAS</span></h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>Equipamiento diseñado para superar los límites del rendimiento físico.</p>
      </div>

      <div className="cat-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px'
      }}>

        {cats.map((cat, idx) => (
          <div
            key={idx}
            className="cat-card"
            style={{
              backgroundImage: `url(${cat.img})`,
              height: '380px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              padding: '20px', // Reducido para que el texto baje más
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            {/* OVERLAY: Ahora es mucho más oscuro en la base para que el texto resalte */}
            <div className="cat-overlay" style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 55%, transparent 60%)',
              zIndex: 1
            }}></div>

            <div className="cat-content" style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'left',
              width: '100%',
              paddingLeft: '10px', // Ajuste fino a la izquierda
              paddingBottom: '10px' // Ajuste fino al fondo
            }}>
              <h3 className="cat-title" style={{
                fontSize: '1.4rem',
                fontWeight: '800',
                marginBottom: '5px',
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)' // Sombra para resaltar
              }}>
                {cat.title}
              </h3>

              <p className="cat-desc" style={{
                fontSize: '0.85rem',
                marginBottom: '15px',
                maxWidth: '85%',
                lineHeight: '1.3',
                color: '#f0f0f0',
                textShadow: '1px 1px 3px rgba(0,0,0,0.8)' // Sombra para legibilidad total
              }}>
                {cat.desc}
              </p>

              <div className="cat-btns" style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-primary" style={{
                  padding: '10px 20px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  border: 'none'
                }}>
                  {cat.btn1}
                </button>
                <button className="btn btn-outline-small" style={{
                  padding: '10px 20px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  border: '1px solid white',
                  background: 'rgba(255,255,255,0.1)', // Un poco de fondo para notar el botón
                  color: 'white'
                }}>
                  {cat.btn2}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;