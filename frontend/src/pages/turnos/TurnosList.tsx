import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TurnosList() {
  const [turnos, setTurnos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarTurnos = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await fetch("http://localhost:8000/turnos");
      if (!res.ok) throw new Error("Error HTTP");

      const data = await res.json();
      console.log("Datos recibidos:", data);

      if (!Array.isArray(data)) {
        throw new Error("Formato inválido");
      }

      setTurnos(data);
    } catch {
      setError("Error cargando turnos");
    } finally {
      setLoading(false);
    }
  };

  const eliminarTurno = async (id: string) => {
    try {
      await fetch(`http://localhost:8000/turnos/${id}`, { method: "DELETE" });
      cargarTurnos();
    } catch {
      alert("Error eliminando turno");
    }
  };

  useEffect(() => {
    cargarTurnos();
  }, []);

  return (
    <div className="page-container">
      <h1>Turnos</h1>

      <Link className="action-link" to="/turnos/crear">
        Nuevo Turno
      </Link>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {turnos.map((t: any) => (
              <tr key={t._id}>
                <td>{t.paciente_nombre}</td>
                <td>{t.medico_nombre}</td>
                <td>{t.fecha}</td>
                <td>
                  <Link
                    className="btn btn-warning"
                    to={`/turnos/editar/${t._id}`}
                  >
                    Editar
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarTurno(t._id)}
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
