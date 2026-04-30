import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '0 5px',
    transition: 'all 0.3s ease'
  };

  return (
    <nav className="navbar-new">
      <div className="nav-grid">
        {/* COLUMNA 1: LOGOS */}
        <div className="nav-logos-wrapper">
          <Link to="/" className="brand-red-block">
            <img src="/fotos/header-white-lf.svg" alt="Life Fitness" className="logo-lf" />
          </Link>
          <Link to="/" className="logo-hammer-link">
            <img src="/fotos/header-white-hammer.svg" alt="Hammer Strength" className="logo-hammer" />
          </Link>
        </div>

        {/* COLUMNA 2: NAVEGACIÓN */}
        <div className="nav-menu-wrapper">
          <ul className="nav-menu">
            {['NOSOTROS', 'PRODUCTOS', 'SERVICIO TÉCNICO', 'CONTACTO'].map((text) => (
              <li key={text} className="nav-menu-item">
                <Link
                  to={text === 'NOSOTROS' ? '/' : `/${text.toLowerCase().replace(' ', '-')}`}
                  style={linkStyle}
                  className="nav-menu-link"
                >
                  {text}
                  <span className="hover-line"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMNA 3: BOTÓN DE ACCIÓN */}
        <div className="nav-action">
          <button className="btn btn-primary nav-btn-large">COTIZAR</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;