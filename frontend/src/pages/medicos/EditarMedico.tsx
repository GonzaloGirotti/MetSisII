import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export default function EditarMedico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medico, setMedico] = useState({
    nombre: "",
    matricula: "",
    especialidad: "",
  });

  useEffect(() => {
    api
      .get(`/medicos/${id}`)
      .then((res) => setMedico(res.data))
      .catch(() => alert("Error cargando médico"));
  }, [id]);

  const change = (e) => {
    setMedico({ ...medico, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();

    api
      .put(`/medicos/${id}`, medico)
      .then(() => navigate("/medicos"))
      .catch(() => alert("Error al editar médico"));
  };

  return (
    <div className="card">
      <h2>Editar Médico</h2>

      <form onSubmit={enviar}>
        <input
          name="nombre"
          value={medico.nombre}
          onChange={change}
          placeholder="Nombre"
        />

        <input
          name="matricula"
          value={medico.matricula}
          onChange={change}
          placeholder="Matrícula"
        />

        <input
          name="especialidad"
          value={medico.especialidad}
          onChange={change}
          placeholder="Especialidad"
        />

        <button className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}
