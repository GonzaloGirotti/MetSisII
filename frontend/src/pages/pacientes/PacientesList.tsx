import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as PacienteAPI from "../../api/pacienteApi";

export default function PacientesList() {
  const [pacientes, setPacientes] = useState<any[]>([]);

  // Cargar la lista de pacientes desde la API
  const cargar = async () => {
    const data = await PacienteAPI.getPacientes() as any[];
    setPacientes(data);
  };

  // Eliminar un paciente por ID
  const eliminar = async (id: string) => {
    if (!confirm("¿Eliminar paciente?")) return;
    await PacienteAPI.eliminarPaciente(id);
    cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="card">
      <h2>Pacientes</h2>

      <Link to="/pacientes/crear" className="btn btn-primary">Crear Paciente</Link>
      <Link to="/pacientes/buscar" className="btn btn-secondary">Buscar Paciente por DNI</Link>

      <table>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p._id}>
              <td>{p.nombre}</td>
              <td>{p.edad}</td>
              <td>{p.dni}</td>
              <td>{p.obra_social}</td>
              <td>
                <Link to={`/pacientes/editar/${p._id}`} className="btn btn-warning">Editar</Link>
                <button className="btn btn-danger" onClick={() => eliminar(p._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
