import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToHash from './components/ScrollToHash';

// Carga perezosa de páginas para optimizar el bundle inicial
const Home = lazy(() => import('./pages/Home'));
const EquiposHogar = lazy(() => import('./pages/Equipos_Hogar'));
const EquiposGimnasio = lazy(() => import('./pages/Equipos_Gimnasio'));

function App() {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <div className="main-content">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipos-hogar" element={<EquiposHogar />} />
            <Route path="/hogar" element={<EquiposHogar />} />
            <Route path="/equipos-para-el-hogar" element={<EquiposHogar />} />
            <Route path="/equipos-gimnasio" element={<EquiposGimnasio />} />
            <Route path="/gimnasio" element={<EquiposGimnasio />} />
            <Route path="/planos" element={<EquiposGimnasio />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
