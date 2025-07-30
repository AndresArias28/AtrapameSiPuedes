import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from './pages/Inicio'
import Juego from './pages/Juego'
import './App.css'
import Ajustes from "./pages/Ajustes";


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/juego" element={<Juego />} />
      <Route path="/ajustes" element={<Ajustes />} />
    </Routes>
  </Router>
);

export default App