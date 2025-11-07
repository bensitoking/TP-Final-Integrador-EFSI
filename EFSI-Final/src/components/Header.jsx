import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">Mí Presupuesto</h1>
      </div>
    </header>
  );
}