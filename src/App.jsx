import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

            {/* Rutas de Hogar */}
            <Route path="/equipos-hogar" element={<EquiposHogar />} />
            <Route path="/hogar" element={<EquiposHogar />} />
            <Route path="/equiposdomesticos" element={<Navigate to="/hogar" replace />} />
            <Route path="/equipos-domesticos" element={<Navigate to="/hogar" replace />} />
            <Route path="/equipos-para-el-hogar" element={<Navigate to="/hogar" replace />} />

            {/* Rutas de Gimnasio */}
            <Route path="/equipos-gimnasio" element={<EquiposGimnasio />} />
            <Route path="/gimnasio" element={<EquiposGimnasio />} />
            <Route path="/planos" element={<Navigate to="/gimnasio#serie-selectorizada" replace />} />
            <Route path="/planner-desing" element={<Navigate to="/gimnasio#serie-selectorizada" replace />} />
            <Route path="/planner-design" element={<Navigate to="/gimnasio#serie-selectorizada" replace />} />
            <Route path="/bicicletas" element={<Navigate to="/gimnasio#bicicletas-verticales" replace />} />
            <Route path="/bicicletas-de-ejercicio-lifecycle" element={<Navigate to="/gimnasio#bicicletas-verticales" replace />} />
            <Route path="/caminadoras" element={<Navigate to="/gimnasio#trotadoras" replace />} />
            <Route path="/elipticas" element={<Navigate to="/gimnasio#elipticas" replace />} />
            <Route path="/ciclismo-estacionario" element={<Navigate to="/gimnasio#ciclismo-indoor" replace />} />
            <Route path="/ciclismo" element={<Navigate to="/gimnasio#ciclismo-indoor" replace />} />
            <Route path="/multifuerzas" element={<Navigate to="/gimnasio#multigimnasios" replace />} />

            {/* Redirecciones de Home / Contacto */}
            <Route path="/contactanos" element={<Navigate to="/#contacto" replace />} />
            <Route path="/contacto" element={<Navigate to="/#contacto" replace />} />
            <Route path="/nosotros" element={<Navigate to="/#nosotros" replace />} />
            <Route path="/servicio-tecnico" element={<Navigate to="/#servicio-tecnico" replace />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/pagina-home" element={<Navigate to="/" replace />} />

            {/* Ruta comodín: Cualquier ruta no reconocida redirige al Inicio y NO queda en blanco */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
