// context/AjustesContext.tsx
import { createContext, useState } from "react";
import type { ReactNode } from "react";

type Nivel = "normal" | "avanzado" | "experto";

interface AjustesContextProps {
  nivel: Nivel;
  setNivel: (nivel: Nivel) => void;
  duracionJuego: number;
  tiempos: Record<Nivel, number>;
  setTiempos: (tiempos: Record<Nivel, number>) => void;
  setDuracionJuego: (valor: number) => void;
  velocidadCuadro: number;
  setVelocidadCuadro: (valor: number) => void;
}

export const AjustesContext = createContext<AjustesContextProps | undefined>(undefined);


export const AjustesProvider = ({ children }: { children: ReactNode }) => {
  const [nivel, setNivel] = useState<Nivel>("normal");
  const [tiempos, setTiempos] = useState<Record<Nivel, number>>({
    normal: 1000,
    avanzado: 800,
    experto: 500,
  });
  const [duracionJuego, setDuracionJuego] = useState(30);
  const [velocidadCuadro, setVelocidadCuadro] = useState(1000);

  const handleSetNivel = (nuevoNivel: Nivel) => {
    setNivel(nuevoNivel);
    setVelocidadCuadro(tiempos[nuevoNivel]);
  };

  return (
    <AjustesContext.Provider
      value={{ duracionJuego, nivel, setNivel: handleSetNivel,setTiempos, tiempos, setDuracionJuego, velocidadCuadro, setVelocidadCuadro }}
    >
      {children}
    </AjustesContext.Provider>
  );
};
