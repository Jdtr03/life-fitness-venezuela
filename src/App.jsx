import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

// Carga perezosa de páginas para optimizar el bundle inicial
const Home = lazy(() => import('./pages/Home'));
const EquiposHogar = lazy(() => import('./pages/Equipos_Hogar'));
const EquiposGimnasio = lazy(() => import('./pages/Equipos_Gimnasio'));

// Componente para forzar el scroll al inicio en cada cambio de ruta
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="main-content">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipos-hogar" element={<EquiposHogar />} />
            <Route path="/equipos-gimnasio" element={<EquiposGimnasio />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
