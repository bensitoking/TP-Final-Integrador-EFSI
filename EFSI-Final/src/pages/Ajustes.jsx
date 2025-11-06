import { useState } from "react";
import { useMovimientos } from "../context/MovimientosContext";

export default function Ajustes() {
  const { limpiarDatos } = useMovimientos();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTema = () => {
    const nuevo = !darkMode;
    setDarkMode(nuevo);
    document.documentElement.classList.toggle("dark", nuevo);
    localStorage.setItem("theme", nuevo ? "dark" : "light");
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold mb-3">Ajustes</h2>

      <div className="flex items-center gap-3">
        <label className="font-semibold">Tema oscuro:</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleTema}
          className="w-4 h-4"
        />
      </div>

      <button
        onClick={() => {
          if (confirm("¿Seguro que quieres borrar todos los datos?")) {
            limpiarDatos();
          }
        }}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Limpiar datos (reset)
      </button>
    </section>
  );
}
