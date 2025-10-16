import { useLocalStorage } from "../hooks/useLocalStorage";

function Listado() {
  const [movimientos, setMovimientos] = useLocalStorage("movimientos", [
    {
      id: 1,
      descripcion: "Supermercado",
      categoria: "Alimentación",
      tipo: "gasto",
      monto: 5000,
      fecha: "2025-10-10",
    },
    {
      id: 2,
      descripcion: "Sueldo",
      categoria: "Trabajo",
      tipo: "ingreso",
      monto: 200000,
      fecha: "2025-10-01",
    },
  ]);

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Listado de Movimientos</h2>
      {movimientos.length === 0 ? (
        <p>No hay movimientos registrados.</p>
      ) : (
        <ul className="space-y-2">
          {movimientos.map((mov) => (
            <li
              key={mov.id}
              className="border p-2 rounded-md bg-white dark:bg-gray-600 flex justify-between"
            >
              <span>
                {mov.descripcion} — {mov.categoria} ({mov.tipo})
              </span>
              <span>{mov.monto} €</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Listado;
