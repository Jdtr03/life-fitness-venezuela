import React from 'react';
import CTA from '../CTA.jsx'; // Asegúrate de que esta ruta sea la correcta hacia cta.JS

const SeccionContactoHome = () => {
  return (
    <div className="home-cta-container" style={{ width: '100%', overflow: 'hidden' }}>
      <CTA />
    </div>
  );
};

export default SeccionContactoHome;