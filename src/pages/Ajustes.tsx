import { useState } from "react";
import { useAjustes } from "../context/useAjustes";
import { useNavigate } from 'react-router-dom';


const Ajustes: React.FC = () => {
  const {
    duracionJuego,
    setDuracionJuego,
    velocidadCuadro,
    setVelocidadCuadro,
  } = useAjustes();

  // Estado local temporal
  const [duracionInput, setDuracionInput] = useState(duracionJuego.toString());
  const [velocidadInput, setVelocidadInput] = useState(velocidadCuadro.toString());
const navigate = useNavigate();

  // Cambiar duración del juego (segundos)
  const handleCambiarDuracion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDuracionInput(value);

    const parsed = parseInt(value);
    if (!isNaN(parsed)) {
      setDuracionJuego(parsed);
    }
  };

  // Cambiar velocidad del cuadro (milisegundos)
  const handleCambiarVelocidad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVelocidadInput(value);

    const parsed = parseInt(value);
    if (!isNaN(parsed)) {
      setVelocidadCuadro(parsed);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">🎮 Ajustes del Juego</h1>

      <div className="mb-4">
        <label className="block text-lg mb-2">Duración del Juego (segundos):</label>
        <input
          type="number"
          value={duracionInput}
          onChange={handleCambiarDuracion}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-2">Velocidad del Cuadro (milisegundos):</label>
        <input
          type="number"
          value={velocidadInput}
          onChange={handleCambiarVelocidad}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      <button
        onClick={() => navigate('/juego')}
        className="mt-4 w-full bg-green-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-green-800 transition"
      >
        🚀 Jugar
      </button>
    </div>
  );
};

export default Ajustes;


