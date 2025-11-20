import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMedico, modificarMedico } from "../../api/medicoApi";
import type { Medico } from "../../types/Medico";

const EditarMedico = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medico, setMedico] = useState<Medico | null>(null);

  useEffect(() => {
    if (id) getMedico(Number(id)).then(setMedico);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medico) return;
    await modificarMedico(medico);
    navigate("/medicos");
  };

  if (!medico) return <div className="container">Cargando...</div>;

  return (
    <div className="container">
      <h2>Editar Médico</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={medico.nombre}
          onChange={(e) => setMedico({ ...medico, nombre: e.target.value })}
          required
        />
        <input
          type="number"
          value={medico.matricula}
          onChange={(e) =>
            setMedico({ ...medico, matricula: Number(e.target.value) })
          }
          required
        />
        <input
          type="text"
          value={medico.especialidad}
          onChange={(e) =>
            setMedico({ ...medico, especialidad: e.target.value })
          }
          required
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default EditarMedico;
