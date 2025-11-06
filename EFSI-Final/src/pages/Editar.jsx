import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMovimientos } from "../context/MovimientosContext";

const esquema = Yup.object().shape({
  descripcion: Yup.string().min(3).required("Requerido"),
  categoria: Yup.string().required(),
  tipo: Yup.string().required(),
  monto: Yup.number().positive().required(),
  fecha: Yup.date().max(new Date()).required(),
});

export default function Editar() {
  const { id } = useParams();
  const { movimientos, editarMovimiento } = useMovimientos();
  const navigate = useNavigate();

  const movimiento = movimientos.find((m) => m.id === Number(id));

  if (!movimiento) return <p>Movimiento no encontrado</p>;

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Editar Movimiento</h2>

      <Formik
        initialValues={movimiento}
        validationSchema={esquema}
        onSubmit={(values) => {
          editarMovimiento(Number(id), values);
          navigate("/");
        }}
      >
        {() => (
          <Form className="space-y-3 max-w-sm">
            <div>
              <label>Descripción</label>
              <Field name="descripcion" className="border p-1 w-full rounded" />
              <ErrorMessage name="descripcion" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label>Categoría</label>
              <Field as="select" name="categoria" className="border p-1 w-full rounded">
                <option value="Alimentación">Alimentación</option>
                <option value="Transporte">Transporte</option>
                <option value="Ocio">Ocio</option>
                <option value="Trabajo">Trabajo</option>
              </Field>
            </div>
            <div>
              <label>Tipo</label>
              <Field as="select" name="tipo" className="border p-1 w-full rounded">
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
              </Field>
            </div>
            <div>
              <label>Monto (€)</label>
              <Field type="number" name="monto" className="border p-1 w-full rounded" />
            </div>
            <div>
              <label>Fecha</label>
              <Field type="date" name="fecha" className="border p-1 w-full rounded" />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Actualizar
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}