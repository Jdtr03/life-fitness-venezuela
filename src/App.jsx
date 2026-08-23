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

            {/* Rutas de Hogar (Renderizado directo e instantáneo) */}
            <Route path="/equipos-hogar" element={<EquiposHogar />} />
            <Route path="/hogar" element={<EquiposHogar />} />
            <Route path="/equiposdomesticos" element={<EquiposHogar />} />
            <Route path="/equipos-domesticos" element={<EquiposHogar />} />
            <Route path="/equipos-para-el-hogar" element={<EquiposHogar />} />

            {/* Rutas de Gimnasio / Secciones de Productos (Renderizado directo e instantáneo) */}
            <Route path="/equipos-gimnasio" element={<EquiposGimnasio />} />
            <Route path="/gimnasio" element={<EquiposGimnasio />} />
            <Route path="/planos" element={<EquiposGimnasio />} />
            <Route path="/planner-desing" element={<EquiposGimnasio />} />
            <Route path="/planner-design" element={<EquiposGimnasio />} />
            <Route path="/bicicletas" element={<EquiposGimnasio />} />
            <Route path="/bicicletas-de-ejercicio-lifecycle" element={<EquiposGimnasio />} />
            <Route path="/caminadoras" element={<EquiposGimnasio />} />
            <Route path="/trotadoras" element={<EquiposGimnasio />} />
            <Route path="/elipticas" element={<EquiposGimnasio />} />
            <Route path="/ciclismo-estacionario" element={<EquiposGimnasio />} />
            <Route path="/ciclismo" element={<EquiposGimnasio />} />
            <Route path="/multifuerzas" element={<EquiposGimnasio />} />
            <Route path="/multigimnasios" element={<EquiposGimnasio />} />

            {/* Redirecciones de Home / Contacto */}
            <Route path="/contactanos" element={<Home />} />
            <Route path="/contacto" element={<Home />} />
            <Route path="/nosotros" element={<Home />} />
            <Route path="/servicio-tecnico" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pagina-home" element={<Home />} />

            {/* Ruta comodín: Cualquier URL desconocida renderiza Home directamente sin quedar en blanco */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
