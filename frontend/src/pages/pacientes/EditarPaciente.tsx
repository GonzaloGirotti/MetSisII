import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as PacienteAPI from "../../api/pacienteApi";

export default function EditarPaciente() {
  // Obtener el ID del paciente desde los parámetros de la URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del formulario y error de API
  const [form, setForm] = useState<any>({});
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await PacienteAPI.getPaciente(id!);
        setForm(data);
      } catch {
        setApiError("Error cargando paciente");
      }
    };
    cargar();
  }, [id]);

  // Envía el formulario para actualizar el paciente
  const enviar = async (e: any) => {
    e.preventDefault();
    try {
      const bodyActualizado = {
        nombre: form.nombre,
        edad: Number(form.edad),
        dni: Number(form.dni),
        obra_social: form.obra_social,
      }
      await PacienteAPI.actualizarPaciente(id!, bodyActualizado);
      navigate(`/pacientes/`);
    } catch {
      setApiError("Error actualizando paciente");
    }
  };

  return (
    <div className="card">
      <h2>Editar Paciente</h2>

      <form onSubmit={enviar}>
        <input
          value={form.nombre || ""}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          value={Number(form.edad) || ""}
          onChange={(e) => setForm({ ...form, edad: e.target.value })}
        />
        <input
          value={Number(form.dni) || ""}
          onChange={(e) => setForm({ ...form, dni: e.target.value })}
        />
        <input
          value={form.obra_social || ""}
          onChange={(e) => setForm({ ...form, obra_social: e.target.value })}
        />

        {apiError && <div style={{ color: "red" }}>{apiError}</div>}

        <button className="btn btn-primary">Guardar</button>

      </form>
    </div>
  );
}
