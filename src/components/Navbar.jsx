import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const menuLinks = [
    { text: 'NOSOTROS', href: '#nosotros' },
    { text: 'PRODUCTOS', href: '#productos', hasSubmenu: true },
    { text: 'SERVICIO TÉCNICO', href: '#servicio-tecnico' },
    { text: 'CONTACTO', href: '#contacto' }
  ];

  const productData = [
    {
      mainTitle: "Equipamiento de Gimnasio",
      mainHref: "/equipos-gimnasio#hero",
      subCategories: [
        {
          title: "Equipos de Cardio",
          subHref: "/equipos-gimnasio#hero",
          items: ["Cintas de correr", "Elípticas", "Bicicletas", "Remos"]
        },
        {
          title: "Equipos de Fuerza",
          subHref: "/equipos-gimnasio#hero",
          items: ["Selectorizados", "Cargada con placas", "Bancos", "Racks"]
        }
      ]
    },
    {
      mainTitle: "Equipamiento de Hogar",
      mainHref: "/equipos-hogar#hero",
      subCategories: [
        {
          title: "Equipo de cardio",
          subHref: "/equipos-hogar#hero",
          items: ["Cintas residenciales", "Bicis estáticas"]
        },
        {
          title: "Equipo de Fuerza",
          subHref: "/equipos-hogar#hero",
          items: ["Mancuernas", "Barras", "Discos"]
        }
      ]
    }
  ];

  const linkStyle = {
    color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: '700',
    letterSpacing: '1.5px', position: 'relative', display: 'flex', alignItems: 'center',
    height: '100%', padding: '0 5px', transition: 'all 0.3s ease'
  };

  return (
    <>
      <nav className="navbar-new">
        {/* --- VERSIÓN MÓVIL (RESQUETANDO TU DISEÑO) --- */}
        <div className="mobile-nav-container">
          <div className="mobile-box-red">
            <Link to="/"><img src="/fotos/header-white-lf.svg" alt="Life Fitness" className="logo-mobile-lf" /></Link>
          </div>
          <div className="mobile-box-black">
            <div className="mobile-content-right">
              <Link to="/"><img src="/fotos/header-white-hammer.svg" alt="Hammer Strength" className="logo-mobile-hammer" /></Link>
              <button className="hamburger-btn-new" onClick={() => setIsMenuOpen(true)}>
                <span className="bar"></span><span className="bar"></span><span className="bar"></span>
              </button>
            </div>
          </div>
        </div>

        {/* --- VERSIÓN PC (ESTRUCTURA FIJA ORIGINAL SIN MODIFICAR) --- */}
        <div className="desktop-nav-container">
          <div className="nav-grid">
            {/* Polígono Rojo Izquierda */}
            <div className="brand-red-polygon">
              <Link to="/"><img src="/fotos/header-white-lf.svg" alt="Life Fitness" className="logo-lf" /></Link>
            </div>

            <div className="nav-logo-hammer-pc">
              <Link to="/"><img src="/fotos/header-white-hammer.svg" alt="Hammer Strength" className="logo-hammer" /></Link>
            </div>

            {/* Menú de Navegación */}
            <div className="nav-menu-wrapper">
              <ul className="nav-menu">
                {menuLinks.map((link) => (
                  <li
                    key={link.text}
                    className="nav-menu-item"
                    // --- NUEVA LÓGICA DE EVENTOS (SIN TOCAR EL DISEÑO) ---
                    onMouseEnter={() => link.hasSubmenu && setIsProductsOpen(true)}
                    onMouseLeave={() => link.hasSubmenu && setIsProductsOpen(false)}
                  >
                    <a href={link.href} style={linkStyle} className="nav-menu-link">
                      {link.text}
                      <span className="hover-line"></span>
                    </a>

                    {/* MEGA MENÚ EMERGENTE */}
                    {link.hasSubmenu && isProductsOpen && (
                      <div className="mega-menu-pc">
                        {/* 
                          SOLUCIÓN TÉCNICA:
                          He añadido este div 'mega-menu-safe-area' que es un pseudo-elemento invisible
                          que rellena el hueco entre la barra fija (80px) y el panel del menú.
                          Técnicamente, el mouse nunca sale del área activa al bajar en diagonal.
                        */}
                        <div className="mega-menu-safe-area"></div>

                        <div className="mega-menu-content">
                          {productData.map((section, idx) => (
                            <div key={section.mainTitle} className="main-section">
                              <Link to={section.mainHref} className="main-category-link" onClick={() => setIsProductsOpen(false)}>{section.mainTitle}</Link>
                              <div className="sub-grid">
                                {section.subCategories.map(sub => (
                                  <div key={sub.title} className="sub-column">
                                    <Link to={sub.subHref} className="sub-category-link" onClick={() => setIsProductsOpen(false)}>{sub.title}</Link>
                                    <ul>{sub.items.map(item => <li key={item}>{item}</li>)}</ul>
                                  </div>
                                ))}
                              </div>
                              {idx === 0 && <div className="red-divider-line"></div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Botón Cotizar Derecha */}
            <div className="nav-action">
              <a href="#contacto" className="btn-cotizar-pc">COTIZAR</a>
            </div>
          </div>
        </div>
      </nav>

      {/* --- SIDEBAR MÓVIL (RESQUETANDO TU DISEÑO) --- */}
      <div className={`mobile-sidebar-side ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>✕</button>
        </div>
        <ul className="sidebar-links">
          {menuLinks.map((link) => (
            <li key={link.text}>
              {link.hasSubmenu ? (
                <>
                  <div className="sidebar-link-item" onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}>
                    {link.text} <span>{isMobileProductsOpen ? '▲' : '▼'}</span>
                  </div>
                  <div className={`mobile-submenu-acc ${isMobileProductsOpen ? 'open' : ''}`}>
                    {productData.map(section => (
                      <div key={section.mainTitle} style={{ marginBottom: '20px' }}>
                        <Link to={section.mainHref} className="mobile-main-t-link" onClick={() => setIsMenuOpen(false)}>{section.mainTitle}</Link>
                        {section.subCategories.map(sub => (
                          <div key={sub.title} style={{ paddingLeft: '15px', marginTop: '10px' }}>
                            <Link to={sub.subHref} className="mobile-sub-t-link" onClick={() => setIsMenuOpen(false)}>{sub.title}</Link>
                            {sub.items.map(item => <p key={item} style={{ color: '#888', fontSize: '13px', margin: '5px 0' }}>{item}</p>)}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <a href={link.href} className="sidebar-link-item" onClick={() => setIsMenuOpen(false)}>{link.text}</a>
              )}
            </li>
          ))}
          <li style={{ marginTop: '30px' }}>
            <a href="#contacto" className="sidebar-btn-red" onClick={() => setIsMenuOpen(false)}>COTIZAR</a>
          </li>
        </ul>
      </div>
      {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>}

      <style>{`
        /* --- ESTILOS ORIGINALES DE TU BARRA FASE 1 (RESTAURADOS AL 100%) --- */
        html { scroll-behavior: smooth; }
        [id] { scroll-margin-top: 85px; }
        .navbar-new { position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; background: #000; }
        .desktop-nav-container { display: block; }
        .mobile-nav-container { display: none; }
        .nav-grid { display: grid; grid-template-columns: auto auto 1fr auto; height: 80px; align-items: center; padding-right: 40px; }
        
        .brand-red-polygon { 
          background: #cc0000; height: 100%; display: flex; align-items: center; 
          padding-left: 50px; padding-right: 60px; 
          clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); 
          margin-right: -25px; 
        }
        .logo-lf { height: 28px; width: auto; }
        .nav-logo-hammer-pc { padding-left: 50px; }
        .logo-hammer { height: 40px; width: auto; }
        
        .nav-menu-wrapper { height: 100%; display: flex; align-items: center; }
        .nav-menu { display: flex; list-style: none; gap: 30px; margin: 0; padding: 0; height: 100%; }
        .nav-menu-item { height: 100%; display: flex; align-items: center; position: relative; }
        .hover-line { position: absolute; bottom: 25px; left: 0; width: 0; height: 2px; background: #cc0000; transition: width 0.3s ease; }
        .nav-menu-link:hover .hover-line { width: 100%; }
        .btn-cotizar-pc { background: #cc0000; color: white; text-decoration: none; padding: 10px 20px; font-weight: 900; font-size: 13px; letter-spacing: 1px; }

        /* --- ESTILOS EXCLUSIVOS DEL MENÚ EMERGENTE Y LA MEJORA DIAGONAL --- */
        .mega-menu-pc { position: fixed; top: 80px; left: 0; width: 100vw; z-index: 999; }
        
        /* 
          ESTE ES EL PUENTE INVISIBLE (MEJORA DIAGONAL)
          Rellena el hueco de 80px para que el mouse no "salga" del menú al bajar en diagonal.
        */
        .mega-menu-safe-area {
          position: absolute;
          top: -30px; /* Cubre el espacio entre el texto y el panel */
          left: 0;
          width: 100%;
          height: 35px;
          background: transparent;
        }

        .mega-menu-content { 
          background: #f5f5f5; color: #000; padding: 40px 0; 
          box-shadow: 0 15px 30px rgba(0,0,0,0.15); display: flex; 
          max-width: 1200px; margin: 0 auto;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          
        }

        .main-section { flex: 1; padding: 0 40px; position: relative; }
        .main-category-link { display: block; font-size: 18px; font-weight: 800; text-align: center; margin-bottom: 30px; color: #000; text-decoration: none; transition: 0.2s; }
        .main-category-link:hover { color: #cc0000; }
        .sub-grid { display: flex; gap: 30px; }
        .sub-column { flex: 1; }
        .sub-category-link { display: block; font-size: 13px; font-weight: 900; border-bottom: 1px solid #ccc; padding-bottom: 8px; margin-bottom: 12px; text-transform: uppercase; color: #222; text-decoration: none; transition: 0.2s; }
        .sub-category-link:hover { color: #cc0000; border-color: #cc0000; }
        .sub-column ul { list-style: none; padding: 0; }
        .sub-column li { font-size: 13px; padding: 4px 0; color: #555; transition: 0.2s; cursor: pointer; }
        .sub-column li:hover { color: #cc0000; padding-left: 5px; }
        .red-divider-line { position: absolute; right: 0; top: 10%; height: 80%; width: 2px; background: #cc0000; }

        /* --- ESTILOS MÓVIL (ORIGINALES SIN MODIFICAR) --- */
        @media (max-width: 1100px) {
          .desktop-nav-container { display: none; }
          .mobile-nav-container { display: flex; height: 70px; background: #000; width: 100%; overflow: hidden; }
          .mobile-box-red { flex: 1; background: #cc0000; clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%); display: flex; justify-content: center; align-items: center; padding-right: 5%; }
          .mobile-box-black { flex: 1.5; background: #000; display: flex; align-items: center; clip-path: polygon(12% 0, 100% 0, 100% 100%, 0 100%); margin-left: -8%; }
          .mobile-content-right { display: flex; width: 100%; justify-content: space-between; align-items: center; padding: 0 20px 0 12%; }
          .logo-mobile-lf { height: 18px; }
          .logo-mobile-hammer { height: 22px; }
          .hamburger-btn-new { display: flex; flex-direction: column; justify-content: space-between; width: 24px; height: 16px; background: none; border: none; cursor: pointer; }
          .hamburger-btn-new .bar { width: 100%; height: 2px; background: white; transition: 0.3s; }
        }

        /* SIDEBAR MÓVIL (ORIGINAL) */
        .mobile-sidebar-side { position: fixed; top: 0; right: -100%; width: 280px; height: 100vh; background: #111; z-index: 2000; transition: 0.4s; padding: 40px; overflow-y: auto; }
        .mobile-sidebar-side.open { right: 0; }
        .sidebar-link-item { color: white; text-decoration: none; font-size: 18px; font-weight: 700; display: flex; justify-content: space-between; margin-bottom: 25px; cursor: pointer; }
        .mobile-main-t-link { display: block; color: #cc0000; font-weight: 900; border-left: 3px solid #cc0000; padding-left: 10px; margin-bottom: 10px; text-decoration: none; }
        .mobile-sub-t-link { display: block; color: #fff; font-size: 13px; text-transform: uppercase; font-weight: 700; text-decoration: none; margin-bottom: 5px; }
        .mobile-submenu-acc { max-height: 0; overflow: hidden; transition: 0.4s; }
        .mobile-submenu-acc.open { max-height: 1500px; }
        .sidebar-btn-red { display: block; background: #cc0000; color: white; text-align: center; padding: 15px; text-decoration: none; font-weight: 900; }
        .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1500; }
        .close-btn { background: none; border: none; color: white; font-size: 30px; cursor: pointer; }
      `}</style>
    </>
  );
};

export default Navbar;