import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand-logo" translate="no">
            Life<span>Fitness</span>
          </div>
          <p className="brand-desc">
            Líder mundial en la fabricación de equipos de fitness comerciales y para el hogar. Innovando para cada cuerpo en movimiento.
          </p>
        </div>

        <div className="footer-links">
          <h4>EQUIPOS</h4>
          <ul>
            <li><Link to="/equipos-gimnasio">Life Fitness</Link></li>
            <li><a href="#">Hammer Strength</a></li>
            <li><a href="#">Cardio</a></li>
            <li><Link to="/equipos-hogar">Equipamiento de Fuerza</Link></li>
            <li><Link to="/equipos-hogar">Accesorios</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>SOPORTE</h4>
          <ul>
            <li><a href="#">Servicio Técnico</a></li>
            <li><a href="#">Manuales</a></li>
            <li><a href="#">Garantía</a></li>
            <li><a href="#">Repuestos</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>VENEZUELA</h4>
          <ul>
            <li>Life Fitness Venezuela: Centro Comercial El Sol, Piso 2 Nivel galería. El Cafetal. </li>
            <li><a href='https://maps.app.goo.gl/Fo7BsFKsRvux9h3x9'>Ver ubicación en Google Maps</a></li>
            <li>+58 (212) 985-6316 o <a href="https://wa.me/584123361549" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>+58 (412)336-1549</a></li>
            <li>venta@lifefitness.com.ve </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 Life Fitness Venezuela. Todos los derechos reservados.</p>
        <div className="bottom-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#">Accesibilidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
