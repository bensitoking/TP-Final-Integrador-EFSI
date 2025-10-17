import { useTheme } from "../context/ThemeContext";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Mi Presupuesto</h1>
      <button
        onClick={toggleTheme}
        className="bg-white text-blue-600 px-3 py-1 rounded-md"
      >
        {theme === "light" ? "Modo Oscuro" : "Modo Claro"}
      </button>
    </header>
  );
}

export default Header;
