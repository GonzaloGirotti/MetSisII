import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MedicoFacade } from "../../api/api";

export default function MedicosList() {
  const [medicos, setMedicos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setMedicos(await MedicoFacade.getAll());
    } catch {
      setError("Error cargando médicos");
    }
  };

  const eliminar = async (id: string) => {
    if (!confirm("¿Eliminar médico?")) return;
    await MedicoFacade.remove(id);
    cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="card">
      <h2>Médicos</h2>

      <Link to="/medicos/crear" className="btn btn-primary">Crear Médico</Link>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <table>
        <tbody>
          {medicos.map((m) => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.matricula}</td>
              <td>{m.especialidad}</td>
              <td>
                <Link to={`/medicos/editar/${m.id}`} className="btn btn-warning">Editar</Link>
                <button onClick={() => eliminar(m.id)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
