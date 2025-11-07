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

  const categorias = [
    "Alimentación",
    "Transporte",
    "Ocio",
    "Trabajo",
    "Vivienda",
    "Otros"
  ];

  return (
    <div className="form-section">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Nuevo Movimiento</h2>
        </div>
        <div className="card-body">
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
              <Form className="form-grid">
                <div className="form-group">
                  <label className="form-label">Descripción</label>
                  <Field name="descripcion" className="form-control" placeholder="Ingrese la descripción" />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="form-error"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Categoría</label>
                  <Field as="select" name="categoria" className="form-control">
                    <option value="">Seleccionar...</option>
                    {categorias.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="categoria"
                    component="div"
                    className="form-error"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tipo</label>
                  <Field as="select" name="tipo" className="form-control">
                    <option value="">Seleccionar...</option>
                    <option value="ingreso">Ingreso</option>
                    <option value="gasto">Gasto</option>
                  </Field>
                  <ErrorMessage
                    name="tipo"
                    component="div"
                    className="form-error"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Monto (€)</label>
                  <Field type="number" name="monto" className="form-control" placeholder="0.00" />
                  <ErrorMessage
                    name="monto"
                    component="div"
                    className="form-error"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Fecha</label>
                  <Field type="date" name="fecha" className="form-control" />
                  <ErrorMessage
                    name="fecha"
                    component="div"
                    className="form-error"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Guardar Movimiento
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
