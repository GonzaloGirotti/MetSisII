import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";

export default function EditarPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    obraSocial: "",
  });

  useEffect(() => {
    api
      .get(`/pacientes/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Error cargando paciente"));
  }, [id]);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();

    api
      .put(`/pacientes/${id}`, form)
      .then(() => navigate("/pacientes"))
      .catch(() => alert("Error guardando cambios"));
  };

  return (
    <div className="card">
      <h2>Editar Paciente</h2>

      <form onSubmit={enviar}>
        <input
          name="nombre"
          value={form.nombre}
          onChange={change}
          placeholder="Nombre"
          required
        />

        <input
          name="edad"
          value={form.edad}
          onChange={change}
          placeholder="Edad"
          type="number"
          required
        />

        <input
          name="obraSocial"
          value={form.obraSocial}
          onChange={change}
          placeholder="Obra Social"
          required
        />

        <button className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}
