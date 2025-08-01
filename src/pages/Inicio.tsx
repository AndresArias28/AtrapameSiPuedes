import { useNavigate } from 'react-router-dom';
import { useAjustes } from '../context/useAjustes';

const Inicio = () => {
  const {nivel, setNivel} = useAjustes();
  const navegar = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Atrapame si puedes</h1>

      {/* línea divisora */}
      <div className="w-80 h-1 bg-blue-500 mb-6"></div>

      <p className="text-lg text-gray-700 mb-6">
        Prepárate para jugar y mejorar tus habilidades.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navegar('/juego')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
        >
          Comenzar Juego
        </button>

        <button
          onClick={() => navegar('/ajustes')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
        >
          Personalizar
        </button>
      </div>
      {/* seccion para escoger un nivel de dificultad */}
      <div className="mt-8 p-6 bg-blue-100 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Selecciona nivel</h2>
        <select value={nivel} onChange={(e) => setNivel(e.target.value as "normal" | "avanzado" | "experto")} 
          className="border border-gray-300 rounded-md p-2 mb-4 w-full">
          <option value="normal">Normal</option>
          <option value="avanzado">Avanzado</option>
          <option value="experto">Experto</option>
        </select>



      </div>

    </div>
  );
};

export default Inicio;

