import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PacienteFacade } from "../../api/api";

export default function CrearPaciente() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    obraSocial: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!form.nombre.trim()) errs.nombre = "Nombre requerido";
    if (!form.edad.trim()) errs.edad = "Edad requerida";
    if (!form.obraSocial.trim()) errs.obraSocial = "Obra social requerida";

    return errs;
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    try {
      setLoading(true);
      await PacienteFacade.create(form);
      navigate("/pacientes");
    } catch {
      setApiError("Error creando paciente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Crear Paciente</h2>

      <form onSubmit={enviar}>
        <input
          name="nombre"
          placeholder="Nombre"
          onChange={change}
        />
        {errors.nombre && <div style={{ color: "red" }}>{errors.nombre}</div>}

        <input
          name="edad"
          placeholder="Edad"
          onChange={change}
        />
        {errors.edad && <div style={{ color: "red" }}>{errors.edad}</div>}

        <input
          name="obraSocial"
          placeholder="Obra Social"
          onChange={change}
        />
        {errors.obraSocial && <div style={{ color: "red" }}>{errors.obraSocial}</div>}

        {apiError && <div style={{ color: "red" }}>{apiError}</div>}

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear"}
        </button>
      </form>
    </div>
  );
}
