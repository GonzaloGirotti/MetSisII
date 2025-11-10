import { useEffect, useState } from "react";
import { getMedicos, eliminarMedico } from "../../api/medicoApi";
import { Link } from "react-router-dom";
import type { Medico } from "../../types/Medico";

const MedicosList = () => {
  const [data, setData] = useState<Medico[]>([]);

  useEffect(() => {
    getMedicos().then(setData);
  }, []);

  const borrar = async (id: number) => {
    await eliminarMedico(id);
    setData(data.filter(m => m.id !== id));
  };

  return (
    <div>
      <h2>Médicos</h2>
      <Link to="/medicos/crear">Crear Médico</Link>

      <ul>
        {data.map(m => (
          <li key={m.id}>
            {m.nombre} — {m.especialidad}
            <Link to={`/medicos/editar/${m.id}`} style={{ marginLeft: "10px" }}>
              Editar
            </Link>
            <button onClick={() => borrar(m.id!)} style={{ marginLeft: "10px" }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicosList;
