import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacienteFacade } from "../../api/api";

export default function PacientesList() {
  const [pacientes, setPacientes] = useState<any[]>([]);

  const cargar = async () => {
    setPacientes(await PacienteFacade.getAll());
  };

  const eliminar = async (id: string) => {
    if (!confirm("¿Eliminar paciente?")) return;
    await PacienteFacade.remove(id);
    cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="card">
      <h2>Pacientes</h2>

      <Link to="/pacientes/crear" className="btn btn-primary">Crear Paciente</Link>

      <table>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.edad}</td>
              <td>{p.obraSocial}</td>
              <td>
                <Link to={`/pacientes/editar/${p.id}`} className="btn btn-warning">Editar</Link>
                <button className="btn btn-danger" onClick={() => eliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
