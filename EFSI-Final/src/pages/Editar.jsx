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

  if (!movimiento) return (
    <div className="form-section">
      <div className="card">
        <div className="card-body text-center">
          <h3 className="card-title">Movimiento no encontrado</h3>
          <p className="form-error">El movimiento que intentas editar no existe.</p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Volver al listado
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="form-section">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Editar Movimiento</h2>
        </div>
        <div className="card-body">
          <Formik
            initialValues={movimiento}
            validationSchema={esquema}
            onSubmit={(values) => {
              editarMovimiento(Number(id), values);
              navigate("/");
            }}
          >
            {() => (
              <Form className="form-grid">
                <div className="form-group">
                  <label className="form-label">Descripción</label>
                  <Field name="descripcion" className="form-control" placeholder="Ingrese la descripción" />
                  <ErrorMessage name="descripcion" component="div" className="form-error" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Categoría</label>
                  <Field as="select" name="categoria" className="form-control">
                    <option value="Alimentación">Alimentación</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Trabajo">Trabajo</option>
                  </Field>
                  <ErrorMessage name="categoria" component="div" className="form-error" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Tipo</label>
                  <Field as="select" name="tipo" className="form-control">
                    <option value="ingreso">Ingreso</option>
                    <option value="gasto">Gasto</option>
                  </Field>
                  <ErrorMessage name="tipo" component="div" className="form-error" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Monto (€)</label>
                  <Field type="number" name="monto" className="form-control" placeholder="0.00" />
                  <ErrorMessage name="monto" component="div" className="form-error" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Fecha</label>
                  <Field type="date" name="fecha" className="form-control" />
                  <ErrorMessage name="fecha" component="div" className="form-error" />
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Actualizar Movimiento
                  </button>
                  <button type="button" onClick={() => navigate("/")} className="btn btn-secondary">
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