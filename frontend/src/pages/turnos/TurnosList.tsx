import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Link } from "react-router-dom";

export default function TurnosList() {
  const [turnos, setTurnos] = useState([]);

  const cargar = () => {
    api
      .get("/turnos")
      .then((res) => setTurnos(res.data))
      .catch(() => console.log("Backend no disponible aún"));
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="card">
      <h2>Turnos</h2>

      <Link to="/turnos/crear" className="btn btn-primary">
        Crear Turno
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Médico</th>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {turnos.length === 0 ? (
            <tr>
              <td colSpan={5}>Sin datos o backend no disponible</td>
            </tr>
          ) : (
            turnos.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.medico}</td>
                <td>{t.paciente}</td>
                <td>{t.fecha}</td>
                <td>
                  <Link
                    to={`/turnos/editar/${t.id}`}
                    className="btn btn-warning"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
