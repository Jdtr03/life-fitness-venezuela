import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cardio from './pages/Cardio';
import Fuerza from './pages/Fuerza';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardio" element={<Cardio />} />
        <Route path="/fuerza" element={<Fuerza />} />
      </Routes>
    </>
  );
}

export default App;
