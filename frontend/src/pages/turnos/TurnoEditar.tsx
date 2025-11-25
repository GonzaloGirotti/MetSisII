import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function TurnoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    medicoId: "",
    pacienteId: "",
    fecha: "",
  });

  useEffect(() => {
    api
      .get(`/turnos/${id}`)
      .then((res) => {
        const turno = res.data;

        setForm({
          medicoId: turno.medicoId,
          pacienteId: turno.pacienteId,
          fecha: turno.fecha,
        });
      })
      .catch(() => alert("Backend no disponible aún"));
  }, [id]);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();

    api
      .put(`/turnos/${id}`, form)
      .then(() => navigate("/turnos"))
      .catch(() => alert("Backend no disponible aún"));
  };

  return (
    <div className="card">
      <h2>Editar Turno</h2>

      <form onSubmit={enviar}>
        <label>Médico</label>
        <input
          name="medicoId"
          value={form.medicoId}
          onChange={change}
          required
        />

        <label>Paciente</label>
        <input
          name="pacienteId"
          value={form.pacienteId}
          onChange={change}
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

        <button className="btn btn-primary">Guardar cambios</button>
      </form>
    </div>
  );
}
