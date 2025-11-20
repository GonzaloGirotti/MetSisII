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
    setData(data.filter((m) => m.id !== id));
  };

  return (
    <div className="container">
      <h2>Médicos</h2>
      <Link to="/medicos/crear">
        <button>Crear Médico</button>
      </Link>

      <ul>
        {data.map((m) => (
          <li key={m.id}>
            {m.nombre} — {m.especialidad}
            <div>
              <Link to={`/medicos/editar/${m.id}`}>
                <button>Editar</button>
              </Link>
              <button onClick={() => borrar(m.id!)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicosList;
