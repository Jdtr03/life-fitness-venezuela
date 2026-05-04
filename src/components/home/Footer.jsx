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
            <li><Link to="/equipos-gimnasio">Hammer Strength</Link></li>
            <li><a href="#">Cybex</a></li>
            <li><a href="#">ICG</a></li>
            <li><Link to="/equipos-hogar">Equipamiento Cardio</Link></li>
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
            <li>Calle Orinoco, Las Mercedes. Caracas.</li>
            <li>+58 (212) 000-0000</li>
            <li>info@lifefitness.com.ve</li>
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
