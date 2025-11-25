import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";

export default function PacientesList() {
  const [pacientes, setPacientes] = useState([]);

  const cargar = () => {
    api
      .get("/pacientes")
      .then((res) => setPacientes(res.data))
      .catch(() => alert("Error cargando pacientes"));
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = (id) => {
    if (!confirm("¿Eliminar paciente?")) return;
    api.delete(`/pacientes/${id}`).then(cargar);
  };

  return (
    <div className="card">
      <h2>Pacientes</h2>

      <Link to="/pacientes/crear" className="btn btn-primary">
        Crear Paciente
      </Link>

      {pacientes.length === 0 && <p>No hay pacientes cargados.</p>}

      {pacientes.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Obra Social</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pacientes.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.edad}</td>
                <td>{p.obraSocial}</td>

                <td>
                  <Link
                    to={`/pacientes/editar/${p.id}`}
                    className="btn btn-warning"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => eliminar(p.id)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
