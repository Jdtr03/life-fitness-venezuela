import React from 'react';

const Categories = () => {
  const cats = [
    {
      title: "EQUIPOS PARA HOGAR",
      desc: "Ingeniería de vanguardia y tecnología aplicada al entrenamiento cardiovascular de alto rendimiento.",
      img: "../../src/assets/GYM_HOGAR.JPEG",
      btn1: "Saber más de cardio",
      btn2: "Ver productos"
    },
    {
      title: "EQUIPOS PARA GIMNASIOS",
      desc: "Biomecánica avanzada y durabilidad extrema para un entrenamiento de fuerza efectivo y seguro.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      btn1: "Ver todos los equipos",
      btn2: "Ver productos"
    }
  ];

  return (
    <section className="categories container">
      <div className="cat-header">
        <h2 className="section-title">NUESTRAS <span>CATEGORÍAS</span></h2>
        <p className="text-muted">Equipamiento diseñado para superar los límites del rendimiento físico.</p>
      </div>
      <div className="cat-grid">
        {cats.map((cat, idx) => (
          <div key={idx} className="cat-card" style={{ backgroundImage: `url(${cat.img})` }}>
            <div className="cat-overlay"></div>
            <div className="cat-content">
              <h3 className="cat-title">{cat.title}</h3>
              <p className="cat-desc">{cat.desc}</p>
              <div className="cat-btns">
                <button className="btn btn-primary">{cat.btn1}</button>
                <button className="btn btn-outline-small">{cat.btn2}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
