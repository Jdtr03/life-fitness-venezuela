import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuLinks = [
    { text: 'NOSOTROS', href: '#nosotros' },
    { text: 'PRODUCTOS', href: '#productos' },
    { text: 'SERVICIO TÉCNICO', href: '#servicio-tecnico' },
    { text: 'CONTACTO', href: '#contacto' }
  ];

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
    <>
      <nav className="navbar-new">
        {/* --- VERSIÓN MÓVIL (CORREGIDA) --- */}
        <div className="mobile-nav-container">
          <div className="mobile-box-red">
            <a href="#hero" className="mobile-logo-wrapper">
              <img src="/fotos/header-white-lf.svg" alt="Life Fitness" className="logo-mobile-lf" />
            </a>
          </div>
          <div className="mobile-box-black">
            <div className="mobile-content-right">
              <a href="#hero" className="mobile-logo-wrapper">
                <img src="/fotos/header-white-hammer.svg" alt="Hammer Strength" className="logo-mobile-hammer" />
              </a>
              {/* Botón Restaurado */}
              <button className="hamburger-btn-new" onClick={() => setIsMenuOpen(true)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </button>
            </div>
          </div>
        </div>

        {/* --- VERSIÓN PC (MANTIENE DIAGONAL) --- */}
        <div className="desktop-nav-container">
          <div className="nav-grid">
            <div className="brand-red-polygon">
              <a href="#hero" className="logo-lf-link">
                <img src="/fotos/header-white-lf.svg" alt="Life Fitness" className="logo-lf" />
              </a>
            </div>

            <div className="nav-logo-hammer-pc">
              <a href="#hero">
                <img src="/fotos/header-white-hammer.svg" alt="Hammer Strength" className="logo-hammer" />
              </a>
            </div>

            <div className="nav-menu-wrapper">
              <ul className="nav-menu">
                {menuLinks.map((link) => (
                  <li key={link.text} className="nav-menu-item">
                    <a href={link.href} style={linkStyle} className="nav-menu-link">
                      {link.text}
                      <span className="hover-line"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav-action">
              <a href="#contacto" className="btn-cotizar-pc">
                COTIZAR
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* --- SIDEBAR MÓVIL --- */}
      <div className={`mobile-sidebar-side ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>✕</button>
        </div>
        <ul className="sidebar-links">
          {menuLinks.map((link) => (
            <li key={link.text}>
              <a href={link.href} className="sidebar-link-item" onClick={() => setIsMenuOpen(false)}>
                {link.text}
                <span className="hover-line-mobile"></span>
              </a>
            </li>
          ))}
          <li style={{ marginTop: '30px' }}>
            <a href="#contacto" className="sidebar-btn-red" onClick={() => setIsMenuOpen(false)}>
              COTIZAR
            </a>
          </li>
        </ul>
      </div>
      {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>}

      <style>{`
        html { scroll-behavior: smooth; }
        [id] { scroll-margin-top: 85px; }

        .navbar-new {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: #000;
        }

        /* PC DESIGN */
        .desktop-nav-container { display: block; }
        .mobile-nav-container { display: none; }

        .nav-grid {
          display: grid;
          grid-template-columns: auto auto 1fr auto;
          height: 80px;
          align-items: center;
          padding-right: 40px;
        }

        .brand-red-polygon {
          background: #cc0000;
          height: 100%;
          display: flex;
          align-items: center;
          padding-left: 50px;
          padding-right: 60px;
          clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
          margin-right: -25px;
        }

        .logo-lf { height: 28px; width: auto; }
        .nav-logo-hammer-pc { padding-left: 50px; }
        .logo-hammer { height: 24px; width: auto; }

        .nav-menu { display: flex; list-style: none; gap: 30px; margin: 0; padding: 0; height: 100%; }
        .nav-menu-item { height: 100%; display: flex; align-items: center; }
        .nav-menu-link { height: 100%; position: relative; display: flex; align-items: center; }
        
        .hover-line {
          position: absolute;
          bottom: 25px; 
          left: 0;
          width: 0;
          height: 2px;
          background: #cc0000;
          transition: width 0.3s ease;
        }
        .nav-menu-link:hover .hover-line { width: 100%; }

        .btn-cotizar-pc {
          background: #cc0000;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          font-weight: 900;
          font-size: 13px;
          letter-spacing: 1px;
        }

        /* MOBILE DESIGN (CORRECCIÓN DE ICONO Y ALINEACIÓN) */
        @media (max-width: 1100px) {
          .desktop-nav-container { display: none; }
          .mobile-nav-container { 
            display: flex; 
            height: 70px; 
            background: #000; 
            overflow: hidden; 
            width: 100%;
          }

          .mobile-box-red {
            flex: 1;
            background: #cc0000;
            clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
            display: flex; 
            justify-content: center; 
            align-items: center;
            padding-right: 5%;
          }

          .mobile-box-black {
            flex: 1.5;
            margin-left: -8%;
            clip-path: polygon(12% 0, 100% 0, 100% 100%, 0% 100%);
            background: #000;
            display: flex; 
            align-items: center;
          }

          .mobile-content-right {
            display: flex; 
            width: 100%; 
            justify-content: space-between; 
            align-items: center; 
            padding: 0 20px 0 12%; /* Alinea logo Hammer y Botón */
          }

          .logo-mobile-lf { height: 18px; width: auto; }
          .logo-mobile-hammer { height: 22px; width: auto; }

          /* Icono de Hamburguesa Restaurado */
          .hamburger-btn-new {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 24px;
            height: 16px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
          }

          .hamburger-btn-new .bar {
            width: 100%;
            height: 2px;
            background-color: white;
            transition: 0.3s;
          }
        }

        /* SIDEBAR */
        .mobile-sidebar-side {
          position: fixed; top: 0; right: -100%; width: 280px; height: 100vh;
          background: #111; z-index: 2000; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); padding: 40px;
        }
        .mobile-sidebar-side.open { right: 0; }
        .sidebar-link-item {
          color: white; text-decoration: none; font-size: 18px; font-weight: 700;
          position: relative; padding-bottom: 5px; display: inline-block;
        }
        .hover-line-mobile {
          position: absolute; bottom: 0; left: 0; width: 0; height: 2px;
          background: #cc0000; transition: 0.3s;
        }
        .sidebar-link-item:hover .hover-line-mobile { width: 100%; }
        .sidebar-links { list-style: none; padding: 0; margin-top: 40px; }
        .sidebar-links li { margin-bottom: 30px; }
        .sidebar-btn-red {
          display: block; background: #cc0000; color: white; text-align: center;
          padding: 15px; text-decoration: none; font-weight: 900;
        }
        .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1500; }
        .close-btn { background: none; border: none; color: white; font-size: 30px; cursor: pointer; }
      `}</style>
    </>
  );
};

export default Navbar;