import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex justify-center gap-4 bg-blue-100 dark:bg-gray-700 py-2">
      <Link to="/">Listado</Link>
      <Link to="/nuevo">Nuevo</Link>
      <Link to="/resumen">Resumen</Link>
      <Link to="/ajustes">Ajustes</Link>
    </nav>
  );
}

export default NavBar;
