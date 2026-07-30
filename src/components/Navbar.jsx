import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useProducts } from '../hooks/useProducts';
import { slugify } from './DynamicCatalog';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const { products } = useProducts();

  // Funciones de precarga para mejorar la respuesta al clic
  const prefetchGimnasio = () => import('../pages/Equipos_Gimnasio');
  const prefetchHogar = () => import('../pages/Equipos_Hogar');

  // Se agregaron rutas absolutas (con /#) para que funcionen desde cualquier subpágina
  const menuLinks = [
    { text: 'NOSOTROS', href: '/#nosotros' },
    { text: 'PRODUCTOS', href: '#', hasSubmenu: true },
    { text: 'SERVICIO TÉCNICO', href: '/#servicio-tecnico' },
    { text: 'CONTACTO', href: '/#contacto' }
  ];

  const getSubcategories = (usageType, categoryName, fallback) => {
    if (!products || products.length === 0) return fallback;
    const filtered = products.filter(
      p => (p.usage === usageType || p.usage === 'Ambos') && p.Category === categoryName
    );
    if (filtered.length === 0) return fallback;

    const grouped = filtered.reduce((acc, p) => {
      const sub = p.SubCategory || 'General';
      if (!acc[sub]) acc[sub] = 0;
      acc[sub] += 1;
      return acc;
    }, {});

    return Object.keys(grouped).sort((a, b) => grouped[b] - grouped[a]);
  };

  const gimnasioFuerzaSubs = getSubcategories('Gimnasio', 'Fuerza', ['Serie Selectorizada', 'Placas', 'Bancos y Racks', 'Multigimnasios']);
  const gimnasioCardioSubs = getSubcategories('Gimnasio', 'Cardio', ['Trotadoras', 'Elípticas', 'Bicicletas Verticales', 'Bicicletas Reclinadas', 'Air Bikes', 'Ciclismo Indoor', 'Remos']);

  const hogarFuerzaSubs = getSubcategories('Hogar', 'Fuerza', ['Multigimnasios']);
  const hogarCardioSubs = getSubcategories('Hogar', 'Cardio', ['Trotadoras', 'Elípticas', 'Bicicletas Verticales', 'Bicicletas Reclinadas', 'Remos']);

  const productData = [
    {
      mainTitle: "Equipamiento de Gimnasio",
      mainHref: "/equipos-gimnasio#hero",
      subCategories: [
        {
          title: "Equipos de Fuerza",
          subHref: "/equipos-gimnasio#fuerza",
          items: gimnasioFuerzaSubs.map(sub => ({
            name: sub,
            href: `/equipos-gimnasio#${slugify(sub)}`
          }))
        },
        {
          title: "Equipos de Cardio",
          subHref: "/equipos-gimnasio#cardio",
          items: gimnasioCardioSubs.map(sub => ({
            name: sub,
            href: `/equipos-gimnasio#${slugify(sub)}`
          }))
        }
      ]
    },
    {
      mainTitle: "Equipamiento de Hogar",
      mainHref: "/equipos-hogar#hero",
      subCategories: [
        {
          title: "Equipos de Fuerza",
          subHref: "/equipos-hogar#fuerza",
          items: hogarFuerzaSubs.map(sub => ({
            name: sub,
            href: `/equipos-hogar#${slugify(sub)}`
          }))
        },
        {
          title: "Equipos de Cardio",
          subHref: "/equipos-hogar#cardio",
          items: hogarCardioSubs.map(sub => ({
            name: sub,
            href: `/equipos-hogar#${slugify(sub)}`
          }))
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
        {/* --- VERSIÓN MÓVIL --- */}
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

        {/* --- VERSIÓN PC --- */}
        <div className="desktop-nav-container">
          <div className="nav-grid">
            <div className="brand-red-polygon">
              <Link to="/"><img src="/fotos/header-white-lf.svg" alt="Life Fitness" className="logo-lf" /></Link>
            </div>

            <div className="nav-logo-hammer-pc">
              <Link to="/"><img src="/fotos/header-white-hammer.svg" alt="Hammer Strength" className="logo-hammer" /></Link>
            </div>

            <div className="nav-menu-wrapper">
              <ul className="nav-menu">
                {menuLinks.map((link) => (
                  <li
                    key={link.text}
                    className="nav-menu-item"
                    onMouseEnter={() => link.hasSubmenu && setIsProductsOpen(true)}
                    onMouseLeave={() => link.hasSubmenu && setIsProductsOpen(false)}
                  >
                    <HashLink to={link.href} style={linkStyle} className="nav-menu-link">
                      {link.text}
                      <span className="hover-line"></span>
                    </HashLink>

                    {link.hasSubmenu && isProductsOpen && (
                      <div className="mega-menu-pc">
                        <div className="mega-menu-safe-area"></div>
                        <div className="mega-menu-content">
                          {productData.map((section, idx) => (
                            <div key={section.mainTitle} className="main-section">
                              <HashLink 
                                to={section.mainHref} 
                                className="main-category-link" 
                                onClick={() => setIsProductsOpen(false)}
                                onMouseEnter={section.mainHref.includes('gimnasio') ? prefetchGimnasio : prefetchHogar}
                              >
                                {section.mainTitle}
                              </HashLink>
                              <div className="sub-grid">
                                {section.subCategories.map(sub => (
                                  <div key={sub.title} className="sub-column">
                                    <HashLink 
                                      to={sub.subHref} 
                                      className="sub-category-link" 
                                      onClick={() => setIsProductsOpen(false)}
                                      onMouseEnter={sub.subHref.includes('gimnasio') ? prefetchGimnasio : prefetchHogar}
                                    >
                                      {sub.title}
                                    </HashLink>
                                    <ul className="sub-item-list">
                                      {sub.items.map(item => (
                                        <li key={item.name}>
                                          <HashLink
                                            to={item.href}
                                            className="mega-subitem-link"
                                            onClick={() => setIsProductsOpen(false)}
                                            onMouseEnter={item.href.includes('gimnasio') ? prefetchGimnasio : prefetchHogar}
                                          >
                                            {item.name}
                                          </HashLink>
                                        </li>
                                      ))}
                                    </ul>
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

            <div className="nav-action">
              <HashLink to="/#contacto" className="btn-cotizar-pc">COTIZAR</HashLink>
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
              {link.hasSubmenu ? (
                <>
                  <div className="sidebar-link-item" onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}>
                    {link.text} <span>{isMobileProductsOpen ? '▲' : '▼'}</span>
                  </div>
                  <div className={`mobile-submenu-acc ${isMobileProductsOpen ? 'open' : ''}`}>
                    {productData.map(section => (
                      <div key={section.mainTitle} style={{ marginBottom: '20px' }}>
                        <HashLink to={section.mainHref} className="mobile-main-t-link" onClick={() => setIsMenuOpen(false)}>
                          {section.mainTitle}
                        </HashLink>
                        {section.subCategories.map(sub => (
                          <div key={sub.title} style={{ paddingLeft: '15px', marginTop: '10px' }}>
                            <HashLink 
                              to={sub.subHref} 
                              className="mobile-sub-t-link" 
                              onClick={() => {
                                setIsProductsOpen(false);
                                setIsMenuOpen(false);
                              }}
                            >
                              {sub.title}
                            </HashLink>
                            {sub.items.map(item => (
                              <HashLink
                                key={item.name}
                                to={item.href}
                                className="mobile-subitem-link"
                                onClick={() => {
                                  setIsProductsOpen(false);
                                  setIsMenuOpen(false);
                                }}
                              >
                                {item.name}
                              </HashLink>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <HashLink to={link.href} className="sidebar-link-item" onClick={() => setIsMenuOpen(false)}>
                  {link.text}
                </HashLink>
              )}
            </li>
          ))}
          <li style={{ marginTop: '30px' }}>
            <HashLink to="/#contacto" className="sidebar-btn-red" onClick={() => setIsMenuOpen(false)}>COTIZAR</HashLink>
          </li>
        </ul>
      </div>
      {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>}

      <style>{`
        [id] { scroll-margin-top: 85px; }
        .navbar-new { position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; background: #000; }
        .desktop-nav-container { display: block; }
        .mobile-nav-container { display: none; }
        .nav-grid { display: grid; grid-template-columns: auto auto 1fr auto; height: 80px; align-items: center; padding-right: 40px; }
        .brand-red-polygon { background: #a6192e; height: 100%; display: flex; align-items: center; padding-left: 50px; padding-right: 60px; clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); margin-right: -25px; }
        .logo-lf { height: 28px; width: auto; }
        .nav-logo-hammer-pc { padding-left: 50px; }
        .logo-hammer { height: 40px; width: auto; }
        .nav-menu-wrapper { height: 100%; display: flex; align-items: center; }
        .nav-menu { display: flex; list-style: none; gap: 30px; margin: 0; padding: 0; height: 100%; }
        .nav-menu-item { height: 100%; display: flex; align-items: center; position: relative; }
        .hover-line { position: absolute; bottom: 25px; left: 0; width: 0; height: 2px; background: #a6192e; transition: width 0.3s ease; }
        .nav-menu-link:hover .hover-line { width: 100%; }
        .btn-cotizar-pc { background: #a6192e; color: white; text-decoration: none; padding: 10px 20px; font-weight: 900; font-size: 13px; letter-spacing: 1px; }
        .mega-menu-pc { position: fixed; top: 80px; left: 0; width: 100vw; z-index: 999; }
        .mega-menu-safe-area { position: absolute; top: -30px; left: 0; width: 100%; height: 35px; background: transparent; }
        .mega-menu-content { background: #f5f5f5; color: #000; padding: 40px 0; box-shadow: 0 15px 30px rgba(0,0,0,0.15); display: flex; max-width: 1200px; margin: 0 auto; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; }
        .main-section { flex: 1; padding: 0 40px; position: relative; }
        .main-category-link { display: block; font-size: 18px; font-weight: 800; text-align: center; margin-bottom: 30px; color: #000; text-decoration: none; transition: 0.2s; }
        .main-category-link:hover { color: #a6192e; }
        .sub-grid { display: flex; gap: 30px; }
        .sub-column { flex: 1; }
        .sub-category-link { display: block; font-size: 13px; font-weight: 900; border-bottom: 1px solid #ccc; padding-bottom: 8px; margin-bottom: 12px; text-transform: uppercase; color: #222; text-decoration: none; transition: 0.2s; }
        .sub-category-link:hover { color: #a6192e; border-color: #a6192e; }
        .sub-item-list { list-style: none; padding: 0; margin: 0; }
        .sub-item-list li { margin: 4px 0; }
        .mega-subitem-link { font-size: 13px; color: #555; text-decoration: none; transition: all 0.2s ease; display: inline-block; }
        .mega-subitem-link:hover { color: #a6192e; transform: translateX(3px); font-weight: 600; }
        .red-divider-line { position: absolute; right: 0; top: 10%; height: 80%; width: 2px; background: #a6192e; }
        @media (max-width: 1100px) {
          .desktop-nav-container { display: none; }
          .mobile-nav-container { display: flex; height: 70px; background: #000; width: 100%; overflow: hidden; }
          .mobile-box-red { flex: 1; background: #a6192e; clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%); display: flex; justify-content: center; align-items: center; padding-right: 5%; }
          .mobile-box-black { flex: 1.5; background: #000; display: flex; align-items: center; clip-path: polygon(12% 0, 100% 0, 100% 100%, 0 100%); margin-left: -8%; }
          .mobile-content-right { display: flex; width: 100%; justify-content: space-between; align-items: center; padding: 0 20px 0 12%; }
          .logo-mobile-lf { height: 18px; }
          .logo-mobile-hammer { height: 22px; }
          .hamburger-btn-new { display: flex; flex-direction: column; justify-content: space-between; width: 24px; height: 16px; background: none; border: none; cursor: pointer; }
          .hamburger-btn-new .bar { width: 100%; height: 2px; background: white; transition: 0.3s; }
        }
        .mobile-sidebar-side { position: fixed; top: 0; right: -100%; width: 280px; height: 100vh; background: #111; z-index: 2000; transition: 0.4s; padding: 40px; overflow-y: auto; }
        .mobile-sidebar-side.open { right: 0; }
        .sidebar-link-item { color: white; text-decoration: none; font-size: 18px; font-weight: 700; display: flex; justify-content: space-between; margin-bottom: 25px; cursor: pointer; }
        .mobile-main-t-link { display: block; color: #a6192e; font-weight: 900; border-left: 3px solid #a6192e; padding-left: 10px; margin-bottom: 10px; text-decoration: none; }
        .mobile-sub-t-link { display: block; color: #fff; font-size: 13px; text-transform: uppercase; font-weight: 700; text-decoration: none; margin-bottom: 5px; }
        .mobile-subitem-link { display: block; color: #aaa; font-size: 13px; margin: 6px 0; text-decoration: none; transition: color 0.2s ease; }
        .mobile-subitem-link:hover { color: #a6192e; }
        .mobile-submenu-acc { max-height: 0; overflow: hidden; transition: 0.4s; }
        .mobile-submenu-acc.open { max-height: 1500px; }
        .sidebar-btn-red { display: block; background: #a6192e; color: white; text-align: center; padding: 15px; text-decoration: none; font-weight: 900; }
        .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1500; }
        .close-btn { background: none; border: none; color: white; font-size: 30px; cursor: pointer; }
      `}</style>
    </>
  );
};

export default Navbar;