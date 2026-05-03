import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Equipos_Hogar';
import Cardio from './pages/Cardio';
import EquiposGimnasio from './pages/Equipos_Gimnasio';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardio" element={<Cardio />} />
        <Route path="/equipos-gimnasio" element={<EquiposGimnasio />} />
      </Routes>
    </>
  );
}

export default App;
