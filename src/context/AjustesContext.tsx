// context/AjustesContext.tsx
import { createContext,  useState } from "react";
import type { ReactNode } from "react";

interface AjustesContextProps {
  duracionJuego: number;
  setDuracionJuego: (valor: number) => void;
  velocidadCuadro: number;
  setVelocidadCuadro: (valor: number) => void;
}

export const AjustesContext = createContext<AjustesContextProps | undefined>(undefined);


export const AjustesProvider = ({ children }: { children: ReactNode }) => {
  const [duracionJuego, setDuracionJuego] = useState(30);
  const [velocidadCuadro, setVelocidadCuadro] = useState(1000);

  return (
    <AjustesContext.Provider
      value={{ duracionJuego, setDuracionJuego, velocidadCuadro, setVelocidadCuadro }}
    >
      {children}
    </AjustesContext.Provider>
  );
};
