import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMovimientos } from "../context/MovimientosContext";
import { useNavigate } from "react-router-dom";

const esquema = Yup.object().shape({
  descripcion: Yup.string().min(3, "Mínimo 3 caracteres").required("Requerido"),
  categoria: Yup.string().required("Selecciona una categoría"),
  tipo: Yup.string().oneOf(["ingreso", "gasto"]).required("Selecciona un tipo"),
  monto: Yup.number().positive("Debe ser positivo").required("Requerido"),
  fecha: Yup.date()
    .max(new Date(), "No puede ser futura")
    .required("Fecha requerida"),
});

export default function Nuevo() {
  const { agregarMovimiento } = useMovimientos();
  const navigate = useNavigate();

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Nuevo Movimiento</h2>

      <Formik
        initialValues={{
          descripcion: "",
          categoria: "",
          tipo: "",
          monto: "",
          fecha: "",
        }}
        validationSchema={esquema}
        onSubmit={(values) => {
          agregarMovimiento(values);
          navigate("/");
        }}
      >
        {() => (
          <Form className="space-y-3 max-w-sm">
            <div>
              <label>Descripción</label>
              <Field name="descripcion" className="border p-1 w-full rounded" />
              <ErrorMessage
                name="descripcion"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label>Categoría</label>
              <Field as="select" name="categoria" className="border p-1 w-full rounded">
                <option value="">Seleccionar...</option>
                <option value="Alimentación">Alimentación</option>
                <option value="Transporte">Transporte</option>
                <option value="Ocio">Ocio</option>
                <option value="Trabajo">Trabajo</option>
              </Field>
              <ErrorMessage
                name="categoria"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label>Tipo</label>
              <Field as="select" name="tipo" className="border p-1 w-full rounded">
                <option value="">Seleccionar...</option>
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
              </Field>
              <ErrorMessage
                name="tipo"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label>Monto (€)</label>
              <Field type="number" name="monto" className="border p-1 w-full rounded" />
              <ErrorMessage
                name="monto"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label>Fecha</label>
              <Field type="date" name="fecha" className="border p-1 w-full rounded" />
              <ErrorMessage
                name="fecha"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}