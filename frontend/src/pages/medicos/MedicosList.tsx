import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as MedicoAPI from "../../api/medicoApi";

export default function MedicosList() {
  const [medicos, setMedicos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Cargar la lista de médicos desde la API
  const cargar = async () => {
    try {
      setMedicos(await MedicoAPI.getMedicos() as any[]);
    } catch {
      setError("Error cargando médicos");
    }
  };

  // Eliminar un médico por ID
  const eliminar = async (id: string) => {
    if (!confirm("¿Eliminar médico?")) return;
    await MedicoAPI.eliminarMedico(id);
    cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="card">
      <h2>Médicos</h2>

      <Link to="/medicos/crear" className="btn btn-primary">Crear Médico</Link>
      <Link to="/medicos/buscar" className="btn btn-secondary">Buscar Médico por Matrícula</Link>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <table>
        <tbody>
          {medicos.map((m) => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.matricula}</td>
              <td>{m.especialidad}</td>
              <td>
                <Link to={`/medicos/editar/${m._id}`} className="btn btn-warning">Editar</Link>
                <button onClick={() => eliminar(m._id)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
