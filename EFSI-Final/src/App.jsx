import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Listado from "./pages/Listado";
import Nuevo from "./pages/Nuevo";
import Resumen from "./pages/Resumen";
import Ajustes from "./pages/Ajustes";
import { useTheme } from "./context/ThemeContext";
import './App.css';
import Editar from "./pages/Editar";

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="app-container">
        <Header />
        <NavBar />
        <main className="app-main">
          <div className="main-container">
            <Routes>
              <Route path="/" element={<Listado />} />
              <Route path="/nuevo" element={<Nuevo />} />
              <Route path="/editar/:id" element={<Editar />} />
              <Route path="/resumen" element={<Resumen />} />
              <Route path="/ajustes" element={<Ajustes />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;