import { useEffect, useRef, useState } from "react";
import { useAjustes } from "../context/useAjustes";


const Juego: React.FC = () => {
    const { duracionJuego, velocidadCuadro } = useAjustes();
    const colores = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500"];
    const tamaños = ["w-12 h-12", "w-16 h-16", "w-20 h-20", "w-24 h-24"];
    const [visible, setVisible] = useState(true);
    const [colorCuadro, setColorCuadro] = useState("bg-red-500");
    const [tamañoCuadro, setTamañoCuadro] = useState("w-16 h-16");
    type Particula = {
        id: number;
        top: number;
        left: number;
        dx: number;
        dy: number;
    };
    const sonidoExplosion = useRef<HTMLAudioElement | null>(null);

    const [particulas, setParticulas] = useState<Particula[]>([]);
    const [jugando, setJugando] = useState(false);
    const [tiempo, setTiempo] = useState(0);
    const [puntaje, setPuntaje] = useState(0);
    const [posicion, setPosicion] = useState({ top: 0, left: 0 });
    const cuadroRef = useRef<HTMLDivElement>(null);
    const intervaloTiempo = useRef<NodeJS.Timeout | null>(null);
    const intervaloMovimiento = useRef<NodeJS.Timeout | null>(null);
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [mejorPuntaje, setMejorPuntaje] = useState(() => {
        const guardado = localStorage.getItem("mejorPuntaje");
        return guardado ? parseInt(guardado) : 0;
    });

    useEffect(() => {
        if (!jugando) return;
        sonidoExplosion.current = new Audio("/sound/explosion.mp3");
        sonidoExplosion.current.volume = 0.5;

        const intervalo = setInterval(() => {
            const ancho = window.innerWidth - 100;
            const alto = window.innerHeight - 50;

            const nuevaPosicion = {
                top: Math.floor(Math.random() * alto),
                left: Math.floor(Math.random() * ancho)
            };

            setPosicion(nuevaPosicion);
            cambiarEstiloCuadro();
        }, velocidadCuadro);

        return () => clearInterval(intervalo);
    }, [jugando, velocidadCuadro]);

    function cambiarEstiloCuadro() {
        const colorRandom = colores[Math.floor(Math.random() * colores.length)];
        const tamañoRandom = tamaños[Math.floor(Math.random() * tamaños.length)];
        setColorCuadro(colorRandom);
        setTamañoCuadro(tamañoRandom);
    }


    const iniciarJuego = () => {
        setTiempo(duracionJuego);
        setJugando(true);
        setJuegoTerminado(false);
        setPuntaje(0);
        // Iniciar temporizador
        intervaloTiempo.current = setInterval(() => {
            setTiempo((prev) => {
                if (prev <= 1) {
                    finalizarJuego();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const finalizarJuego = () => {
        setJuegoTerminado(true);
        setJugando(false);
        if (puntaje >= 30) {
            setMensaje("¡Excelente! ¡Eres un campeón!");
        } else if (puntaje >= 20) {
            setMensaje("¡Buen trabajo! ¡Sigue practicando!");
        } else {
            setMensaje("¡No te rindas! ¡Puedes mejorar!");
        }
        if (intervaloTiempo.current) clearInterval(intervaloTiempo.current);
        if (intervaloMovimiento.current) clearInterval(intervaloMovimiento.current);

        if (puntaje > mejorPuntaje) {
            setMejorPuntaje(puntaje);
            localStorage.setItem("mejorPuntaje", puntaje.toString());
        }
    };

    const sumarPunto = () => {
        if (jugando) setPuntaje((prev) => prev + 1);

        if (sonidoExplosion.current) {
            sonidoExplosion.current.currentTime = 0; // reinicia el sonido si se repite rápido
            sonidoExplosion.current.play();
        }

        const nuevas = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            top: posicion.top,
            left: posicion.left,
            dx: Math.random() * 100 - 50,  // desplazamiento x aleatorio
            dy: Math.random() * 100 - 50,  // desplazamiento y aleatorio
        }));

        setParticulas((prev) => [...prev, ...nuevas]);
        setVisible(false);
        setTimeout(() => setVisible(true), 300);
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
            {/* Estado: Antes de jugar */}
            {!jugando && !juegoTerminado && (

                <div>
                    <button
                        onClick={iniciarJuego}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-800 transition"
                    >
                        Iniciar Juego
                    </button>

                </div>

            )}

            {/* Estado: Durante el juego */}
            {jugando && !juegoTerminado && (
                <div className="relative h-full w-full">
                    {/* Mejor Puntaje centrado arriba */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 transform bg-white px-4 py-2 rounded shadow-md text-base md:text-lg lg:text-xl font-bold text-purple-700">
                        🥇 Mejor Puntaje: {mejorPuntaje}
                    </div>

                    {/* Temporizador a la izquierda (adaptativo) */}
                    <div className="absolute top-[15vh] left-[5vw] text-sm md:text-base lg:text-lg font-semibold bg-white px-3 py-1 rounded shadow-md">
                        ⏱️ Tiempo: <span className="text-blue-600">{tiempo}</span>s
                    </div>

                    {/* efecto de explosion temporal */}
                    {particulas.map((p) => (
                        <div
                            key={p.id}
                            className="absolute w-3 h-3 rounded-sm shadow-md  animate-disparar"
                            style={{
                                top: p.top,
                                left: p.left,
                                backgroundColor: ['#facc15', '#f87171', '#60a5fa', '#34d399'][p.id % 4],
                                border: '1px solid white',
                                // animacion con variables css
                                '--dx': `${p.dx}px`,
                                '--dy': `${p.dy}px`,
                            } as React.CSSProperties}
                        ></div>
                    ))}

                    {/* Puntaje actual a la derecha (adaptativo) */}
                    <div className="absolute top-[15vh] right-[5vw] text-sm md:text-base lg:text-lg font-semibold bg-white px-3 py-1 rounded shadow-md">
                        🏆 Puntaje: <span className="text-green-600">{puntaje}</span>
                    </div>

                    {/* Cuadro escurridizo */}
                    {visible && (

                        <div
                            ref={cuadroRef}
                            onClick={sumarPunto}
                            className={`absolute ${colorCuadro} ${tamañoCuadro} rounded-md cursor-pointer transition-all duration-200`}
                            style={{ top: posicion.top, left: posicion.left }}
                        ></div>
                    )}
                </div>

            )}

            {/* Estado: Juego terminado */}
            {juegoTerminado && (
                <div className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-blue-700 mb-3">🎯 Juego Terminado</h1>
                    <p className="text-xl text-gray-800 mb-2">Puntaje total: <span className="font-bold">{puntaje}</span></p>
                    <p className="text-green-600 font-semibold mb-6">{mensaje}</p>

                    {/* Volver a jugar */}
                    <button
                        onClick={iniciarJuego}
                        className="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition mb-4"
                    >
                        Volver a jugar
                    </button>

                    {/* Botón de inicio */}
                    <a
                        href="/"
                        className="w-full block bg-red-600 hover:bg-red-800 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition"
                    >
                        Inicio
                    </a>
                </div>
            )}
        </div>
    );

}

export default Juego;