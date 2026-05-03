import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EquiposHogar from './pages/Equipos_Hogar';
import EquiposGimnasio from './pages/Equipos_Gimnasio';

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
        element.scrollIntoView({ behavior: 'smooth' });
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipos-hogar" element={<EquiposHogar />} />
        <Route path="/equipos-gimnasio" element={<EquiposGimnasio />} />
      </Routes>
    </>
  );
}

export default App;
