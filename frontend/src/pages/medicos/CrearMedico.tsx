import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MedicoFacade } from "../../api/api";
import type { Medico } from "../../types/Medico";
import { medico_handler } from "../../error_handlers/medico_error_handler";

export default function CrearMedico() {
  const navigate = useNavigate();

  const [form, setForm] = useState<Medico>({
    nombre: "",
    matricula: "",
    especialidad: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = medico_handler(form)

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const v = validate;
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    try {
      setLoading(true);
      await MedicoFacade.create(form);
      navigate("/medicos");
    } catch {
      setApiError("Error creando médico");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Crear Médico</h2>

      <form onSubmit={enviar}>
        {errors.nombre && <div style={{ color: "red" }}>{errors.nombre}</div>}
        <input name="nombre" placeholder="Nombre" onChange={change} />

        {errors.matricula && <div style={{ color: "red" }}>{errors.matricula}</div>}
        <input name="matricula" placeholder="Matrícula" onChange={change} />

        {errors.especialidad && <div style={{ color: "red" }}>{errors.especialidad}</div>}
        <input name="especialidad" placeholder="Especialidad" onChange={change} />

        {apiError && <div style={{ color: "red" }}>{apiError}</div>}

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear"}
        </button>
      </form>
    </div>
  );
}
