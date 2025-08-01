import { useContext } from "react";
import { AjustesContext } from "../context/AjustesContext";

export const useAjustes = () => {
  const context = useContext(AjustesContext);
  if (!context) {
    throw new Error("useAjustes debe usarse dentro de AjustesProvider");
  }
  return context;
};


