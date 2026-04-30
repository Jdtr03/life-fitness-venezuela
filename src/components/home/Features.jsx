import React from 'react';

const Features = () => {
  const items = [
    {
      title: "Diseño de Instalaciones",
      desc: "Creamos espacios optimizados para el máximo rendimiento.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Soporte Especializado",
      desc: "Servicio técnico oficial y repuestos originales garantizados.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Tecnología Life",
      desc: "Equipos conectados con la última innovación en biometría.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="features bg-gray">
      <div className="container features-grid">
        {items.map((item, idx) => (
          <div key={idx} className="feature-item">
            <div className="feature-icon">{item.icon}</div>
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
