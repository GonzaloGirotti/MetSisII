import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export default function CrearPaciente() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    obraSocial: "",
  });

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();

    if (!form.nombre.trim()) return alert("El nombre es obligatorio");

    api
      .post("/pacientes", form)
      .then(() => navigate("/pacientes"))
      .catch(() => alert("Error creando paciente"));
  };

  return (
    <div className="card">
      <h2>Crear Paciente</h2>

      <form onSubmit={enviar}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={change}
          required
        />

        <input
          name="edad"
          placeholder="Edad"
          value={form.edad}
          onChange={change}
          type="number"
          required
        />

        <input
          name="obraSocial"
          placeholder="Obra Social"
          value={form.obraSocial}
          onChange={change}
          required
        />

        <button className="btn btn-primary">Crear</button>
      </form>
    </div>
  );
}
