import { useNavigate } from 'react-router-dom';

const Inicio = () => {
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
          Ajustes
        </button>
      </div>
    </div>
  );
};

export default Inicio;

