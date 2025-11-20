import { useEffect, useState } from "react";
import { getPacientes, eliminarPaciente } from "../../api/pacienteApi";
import { Link } from "react-router-dom";
import type { Paciente } from "../../types/Paciente";

const PacientesList = () => {
  const [data, setData] = useState<Paciente[]>([]);

  useEffect(() => {
    getPacientes().then(setData);
  }, []);

  const borrar = async (id: number) => {
    await eliminarPaciente(id);
    setData(data.filter((p) => p.id !== id));
  };

  return (
    <div className="container">
      <h2>Pacientes</h2>
      <Link to="/pacientes/crear">
        <button>Crear Paciente</button>
      </Link>

      <ul>
        {data.map((p) => (
          <li key={p.id}>
            {p.nombre} — {p.edad} — {p.obra_social}
            <div>
              <Link to={`/pacientes/editar/${p.id}`}>
                <button>Editar</button>
              </Link>
              <button onClick={() => borrar(p.id!)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PacientesList;
