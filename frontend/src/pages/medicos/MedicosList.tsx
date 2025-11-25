import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";

export default function MedicosList() {
  const [medicos, setMedicos] = useState([]);

  const cargar = () => {
    api.get("/medicos").then((res) => setMedicos(res.data));
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = (id) => {
    if (!confirm("¿Eliminar médico?")) return;

    api.delete(`/medicos/${id}`).then(cargar);
  };

  return (
    <div className="card">
      <h2>Médicos</h2>

      <Link to="/medicos/crear" className="btn btn-primary">
        Crear Médico
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Matrícula</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {medicos.map((m) => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.matricula}</td>
              <td>{m.especialidad}</td>

              <td>
                <Link
                  to={`/medicos/editar/${m.id}`}
                  className="btn btn-warning"
                >
                  Editar
                </Link>

                <button
                  onClick={() => eliminar(m.id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
