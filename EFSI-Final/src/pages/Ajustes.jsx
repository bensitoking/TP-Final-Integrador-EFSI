import { useState } from "react";
import { useMovimientos } from "../context/MovimientosContext";

export default function Ajustes() {
  const { limpiarMovimientos } = useMovimientos();
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
    <div className="form-section">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Ajustes</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label className="form-label">Apariencia</label>
            <div className="d-flex align-center" style={{gap: 'var(--spacing-md)'}}>
              <span>Tema claro</span>
              <div 
                onClick={toggleTema}
                style={{
                  width: '50px',
                  height: '26px',
                  backgroundColor: darkMode ? 'var(--color-primary-600)' : 'var(--color-neutral-300)',
                  borderRadius: '25px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div 
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '3px',
                    left: darkMode ? '27px' : '3px',
                    transition: 'left 0.3s ease'
                  }}
                />
              </div>
              <span>Tema oscuro</span>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Limpiar LocalStorage</label>
            <button
              onClick={() => {
                if (confirm("¿Seguro que quieres borrar todos los datos?")) {
                  limpiarMovimientos();
                }
              }}
              className="btn btn-danger"
            >
              Limpiar todos los datos
            </button>
            <p style={{
              marginTop: 'var(--spacing-sm)', 
              fontSize: '0.875rem', 
              color: 'var(--text-tertiary)'
            }}>
              Esta acción eliminará todos tus movimientos y no se puede deshacer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}