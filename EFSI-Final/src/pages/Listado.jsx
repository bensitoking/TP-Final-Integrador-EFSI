import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const MovimientosContext = createContext();

export const MovimientosProvider = ({ children }) => {
  const [movimientos, setMovimientos] = useLocalStorage("movimientos", []);

  const agregarMovimiento = (nuevo) => {
    setMovimientos([...movimientos, { ...nuevo, id: Date.now() }]);
  };

  const editarMovimiento = (id, actualizado) => {
    setMovimientos(
      movimientos.map((m) => (m.id === id ? { ...actualizado, id } : m))
    );
  };

  const eliminarMovimiento = (id) => {
    setMovimientos(movimientos.filter((m) => m.id !== id));
  };

  return (
    <MovimientosContext.Provider
      value={{ movimientos, agregarMovimiento, editarMovimiento, eliminarMovimiento }}
    >
      {children}
    </MovimientosContext.Provider>
  );
};

export const useMovimientos = () => useContext(MovimientosContext);
