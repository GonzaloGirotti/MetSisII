import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export default function CrearMedico() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    matricula: "",
    especialidad: "",
  });

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();

    if (!form.nombre.trim()) return alert("Nombre requerido");

    api
      .post("/medicos", form)
      .then(() => navigate("/medicos"))
      .catch(() => alert("Error creando médico"));
  };

  return (
    <div className="card">
      <h2>Crear Médico</h2>

      <form onSubmit={enviar}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={change}
        />

        <input
          name="matricula"
          placeholder="Matrícula"
          value={form.matricula}
          onChange={change}
        />

        <input
          name="especialidad"
          placeholder="Especialidad"
          value={form.especialidad}
          onChange={change}
        />

        <button className="btn btn-primary">Crear</button>
      </form>
    </div>
  );
}
