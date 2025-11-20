import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPaciente, modificarPaciente } from "../../api/pacienteApi";
import type { Paciente } from "../../types/Paciente";

const EditarPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    if (id) getPaciente(Number(id)).then(setPaciente);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paciente) return;
    await modificarPaciente(paciente);
    navigate("/pacientes");
  };

  if (!paciente) return <div className="container">Cargando...</div>;

  return (
    <div className="container">
      <h2>Editar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={paciente.nombre}
          onChange={(e) =>
            setPaciente({ ...paciente, nombre: e.target.value })
          }
          required
        />
        <input
          type="number"
          value={paciente.edad}
          onChange={(e) =>
            setPaciente({ ...paciente, edad: Number(e.target.value) })
          }
          required
        />
        <input
          type="text"
          value={paciente.obra_social}
          onChange={(e) =>
            setPaciente({ ...paciente, obra_social: e.target.value })
          }
          required
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default EditarPaciente;
