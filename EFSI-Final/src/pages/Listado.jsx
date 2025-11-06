import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MovimientosContext } from "../context/MovimientosContext";

export default function Listado() {
  const { movimientos, eliminarMovimiento } = useContext(MovimientosContext);

  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
  const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
  const [minMonto, setMinMonto] = useState("");
  const [maxMonto, setMaxMonto] = useState("");

  // 🔎 Filtrado principal
  const movimientosFiltrados = movimientos.filter((mov) => {
    const coincideTexto = mov.descripcion
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideTipo =
      filtroTipo === "todos" ? true : mov.tipo === filtroTipo;

    const coincideCategoria =
      filtroCategoria === "todas" ? true : mov.categoria === filtroCategoria;

    const fechaValida =
      (!filtroFechaDesde || mov.fecha >= filtroFechaDesde) &&
      (!filtroFechaHasta || mov.fecha <= filtroFechaHasta);

    const montoValido =
      (!minMonto || mov.monto >= parseFloat(minMonto)) &&
      (!maxMonto || mov.monto <= parseFloat(maxMonto));

    return coincideTexto && coincideTipo && coincideCategoria && fechaValida && montoValido;
  });

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Listado de Movimientos</h1>

      {/* 🔍 Filtros */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <input
          type="text"
          placeholder="Buscar descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border rounded-xl px-3 py-2"
        />

        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          <option value="todos">Todos</option>
          <option value="ingreso">Ingresos</option>
          <option value="gasto">Gastos</option>
        </select>

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          <option value="todas">Todas las categorías</option>
          <option value="alimentación">Alimentación</option>
          <option value="transporte">Transporte</option>
          <option value="ocio">Ocio</option>
          <option value="vivienda">Vivienda</option>
          <option value="otros">Otros</option>
        </select>

        <input
          type="date"
          value={filtroFechaDesde}
          onChange={(e) => setFiltroFechaDesde(e.target.value)}
          className="border rounded-xl px-3 py-2"
        />

        <input
          type="date"
          value={filtroFechaHasta}
          onChange={(e) => setFiltroFechaHasta(e.target.value)}
          className="border rounded-xl px-3 py-2"
        />

        <Link
          to="/nuevo"
          className="bg-blue-600 hover:bg-blue-700 text-white text-center rounded-xl px-4 py-2"
        >
          + Nuevo
        </Link>
      </div>

      {/* 🧮 Filtros de monto */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="number"
          placeholder="Monto mínimo"
          value={minMonto}
          onChange={(e) => setMinMonto(e.target.value)}
          className="border rounded-xl px-3 py-2"
        />
        <input
          type="number"
          placeholder="Monto máximo"
          value={maxMonto}
          onChange={(e) => setMaxMonto(e.target.value)}
          className="border rounded-xl px-3 py-2"
        />
      </div>

      {/* 📋 Tabla de movimientos */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse bg-white dark:bg-gray-900 shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Monto</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movimientosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No hay movimientos que coincidan con la búsqueda o filtros.
                </td>
              </tr>
            ) : (
              movimientosFiltrados.map((mov) => (
                <tr
                  key={mov.id}
                  className="border-t hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2">{mov.descripcion}</td>
                  <td className="px-4 py-2 capitalize">{mov.categoria}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      mov.tipo === "ingreso" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {mov.tipo}
                  </td>
                  <td className="px-4 py-2">${mov.monto}</td>
                  <td className="px-4 py-2">{mov.fecha}</td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    <Link
                      to={`/editar/${mov.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => eliminarMovimiento(mov.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
