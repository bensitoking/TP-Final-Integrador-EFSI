import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="app-nav">
      <div className="nav-content">
        <NavLink to="/" className="nav-link">
          Listado
        </NavLink>
        <NavLink to="/nuevo" className="nav-link">
          Nuevo
        </NavLink>
        <NavLink to="/resumen" className="nav-link">
          Resumen
        </NavLink>
        <NavLink to="/ajustes" className="nav-link">
          Ajustes
        </NavLink>
      </div>
    </nav>
  );
}