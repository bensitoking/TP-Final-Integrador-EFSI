import { useMovimientos } from "../context/MovimientosContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Resumen() {
  const { movimientos } = useMovimientos();

  if (!movimientos.length)
    return <p className="text-gray-500">No hay movimientos registrados.</p>;

  const totalIngresos = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((acc, m) => acc + Number(m.monto), 0);
  const totalGastos = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((acc, m) => acc + Number(m.monto), 0);
  const balance = totalIngresos - totalGastos;

  const gastosPorCategoria = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((acc, mov) => {
      acc[mov.categoria] = (acc[mov.categoria] || 0) + Number(mov.monto);
      return acc;
    }, {});

  const dataPie = Object.entries(gastosPorCategoria).map(([cat, monto]) => ({
    name: cat,
    value: monto,
  }));

  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

  const dataPorMes = movimientos.reduce((acc, mov) => {
    const mes = new Date(mov.fecha).toLocaleString("es-ES", { month: "short" });
    const existente = acc.find((a) => a.mes === mes);
    if (existente) {
      if (mov.tipo === "ingreso")
        existente.ingresos += Number(mov.monto);
      else existente.gastos += Number(mov.monto);
    } else {
      acc.push({
        mes,
        ingresos: mov.tipo === "ingreso" ? Number(mov.monto) : 0,
        gastos: mov.tipo === "gasto" ? Number(mov.monto) : 0,
      });
    }
    return acc;
  }, []);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Resumen General</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <p className="font-bold text-green-700">Ingresos</p>
          <p>€{totalIngresos.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg text-center">
          <p className="font-bold text-red-700">Gastos</p>
          <p>€{totalGastos.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <p className="font-bold text-blue-700">Balance</p>
          <p>€{balance.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Distribución de gastos por categoría</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dataPie}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {dataPie.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Evolución mensual</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataPorMes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ingresos" fill="#82ca9d" />
            <Bar dataKey="gastos" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
