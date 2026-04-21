import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="nav-section red-bg">
            <Link to="/" className="flex items-center">
                <img src="/fotos/header-white-lf.svg" alt="Life Fitness" className="logo" />
            </Link>
        </div>

        <div className="nav-section black-bg">
            <Link to="/" className="flex items-center">
                <img src="/fotos/header-white-hammer.svg" alt="Hammer Strength" className="logo" />
            </Link>
        </div>

        <div className="nav-links">
            <div className="nav-dropdown">
                <a className="nav-link" href="/#products">Productos</a>
                <div className="dropdown-content">
                    <Link to="/cardio" className="dropdown-item">Cardio</Link>
                    <Link to="/fuerza" className="dropdown-item">Fuerza</Link>
                </div>
            </div>
            <a className="nav-link" href="#">Servicios</a>
            <a className="nav-link" href="#">Digital</a>
        </div>

        <div className="nav-cta">
            <a className="btn btn-primary" href="/#contact">
                cotizar
            </a>
        </div>
    </nav>
  );
}
