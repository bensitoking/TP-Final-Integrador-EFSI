import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Listado from "./pages/Listado";
import Nuevo from "./pages/Nuevo";
import Resumen from "./pages/Resumen";
import Ajustes from "./pages/Ajustes";
import { useTheme } from "./context/ThemeContext";
import Editar from "./pages/Editar";

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
        <Header />
        <NavBar />
        <main className="p-4">
          <Routes>
              <Route path="/" element={<Listado />} />
              <Route path="/nuevo" element={<Nuevo />} />
              <Route path="/editar/:id" element={<Editar />} />
              <Route path="/resumen" element={<Resumen />} />
              <Route path="/ajustes" element={<Ajustes />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
