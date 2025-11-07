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

  const categorias = [
    "Alimentación",
    "Transporte",
    "Ocio",
    "Trabajo",
    "Vivienda",
    "Otros"
  ];

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
    <div className="listado-container">
      <div className="page-header">
        <h1 className="page-title">Listado de Movimientos</h1>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Buscar</label>
          <input
            type="text"
            placeholder="Buscar descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="filter-group">
          <label>Tipo</label>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="form-control"
          >
            <option value="todos">Todos</option>
            <option value="ingreso">Ingresos</option>
            <option value="gasto">Gastos</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Categoría</label>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="form-control"
          >
            <option value="todas">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Fecha desde</label>
          <input
            type="date"
            value={filtroFechaDesde}
            onChange={(e) => setFiltroFechaDesde(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="filter-group">
          <label>Fecha hasta</label>
          <input
            type="date"
            value={filtroFechaHasta}
            onChange={(e) => setFiltroFechaHasta(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="filter-group" style={{ justifyContent: "flex-end" }}>
          <Link to="/nuevo" className="btn btn-primary">
            + Nuevo
          </Link>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Monto mínimo</label>
          <input
            type="number"
            placeholder="Monto mínimo"
            value={minMonto}
            onChange={(e) => setMinMonto(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="filter-group">
          <label>Monto máximo</label>
          <input
            type="number"
            placeholder="Monto máximo"
            value={maxMonto}
            onChange={(e) => setMaxMonto(e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Movimientos</h3>
        </div>
        <div className="card-body p-0">
          <table className="data-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movimientosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="empty-state">
                      <div className="empty-state-title">No se encontraron movimientos</div>
                      <div className="empty-state-description">
                        No hay movimientos que coincidan con la búsqueda o filtros.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                movimientosFiltrados.map((mov) => (
                  <tr key={mov.id}>
                    <td>{mov.descripcion}</td>
                    <td className="capitalize">{mov.categoria}</td>
                    <td>
                      <span
                        className={`badge ${mov.tipo === "ingreso" ? "badge-income" : "badge-expense"}`}
                      >
                        {mov.tipo}
                      </span>
                    </td>
                    <td>${mov.monto}</td>
                    <td>{mov.fecha}</td>
                    <td>
                      <div className="d-flex justify-center gap-2">
                        <Link to={`/editar/${mov.id}`} className="btn btn-outline btn-sm">
                          Editar
                        </Link>
                        <button
                          onClick={() => eliminarMovimiento(mov.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
