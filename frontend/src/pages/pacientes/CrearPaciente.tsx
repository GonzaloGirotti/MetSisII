import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as PacienteAPI from "../../api/pacienteApi";
import { paciente_handler } from "../../error_handlers/paciente_error_handler";

export default function CrearPaciente() {
  const navigate = useNavigate();

  // Estado del formulario, errores, carga y error de API
  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    dni: "",
    obra_social: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Valida el formulario usando el handler 
  const validate = paciente_handler;

  // Envía el formulario para crear un nuevo paciente
  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const v = validate(form);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    try {
      setLoading(true);
      // Convertir edad y dni a números antes de enviar
      await PacienteAPI.crearPaciente({
        ...form,
        edad: Number(form.edad),
        dni: Number(form.dni),
      });
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

      {errors.nombre && <div style={{ color: "red" }}>{errors.nombre}</div>}
      <form onSubmit={enviar}>
        <input
          name="nombre"
          placeholder="Nombre"
          onChange={change}
        />

        {errors.edad && <div style={{ color: "red" }}>{errors.edad}</div>}
        <input
          name="edad"
          placeholder="Edad"
          onChange={change}
        />

        {errors.dni && <div style={{ color: "red" }}>{errors.dni}</div>}
        <input
          name="dni"
          placeholder="DNI"
          onChange={change}
        />

        {errors.obra_social && <div style={{ color: "red" }}>{errors.obra_social}</div>}
        <input
          name="obra_social"
          placeholder="Obra Social"
          onChange={change}
        />

        {apiError && <div style={{ color: "red" }}>{apiError}</div>}

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear"}
        </button>
      </form>
    </div>
  );
}
