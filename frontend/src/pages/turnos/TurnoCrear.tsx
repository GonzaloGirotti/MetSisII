import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function TurnoCrear() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    medicoId: "",
    pacienteId: "",
    fecha: "",
  });

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();

    if (!form.medicoId.trim()) return alert("Seleccione un médico");
    if (!form.pacienteId.trim()) return alert("Seleccione un paciente");

    api
      .post("/turnos", form)
      .then(() => navigate("/turnos"))
      .catch(() => alert("Backend no disponible aún"));
  };

  return (
    <div className="card">
      <h2>Crear Turno</h2>

      <form onSubmit={enviar}>
        <label>Médico</label>
        <input
          name="medicoId"
          value={form.medicoId}
          onChange={change}
          placeholder="ID del médico"
          required
        />

        <label>Paciente</label>
        <input
          name="pacienteId"
          value={form.pacienteId}
          onChange={change}
          placeholder="ID del paciente"
          required
        />

        <label>Fecha</label>
        <input
          type="datetime-local"
          name="fecha"
          value={form.fecha}
          onChange={change}
          required
        />

        <button className="btn btn-primary">Crear</button>
      </form>
    </div>
  );
}
