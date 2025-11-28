import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MedicoFacade, PacienteFacade, TurnoFacade } from "../../api/api";

export default function TurnoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState<any[]>([]);
  const [medicos, setMedicos] = useState<any[]>([]);

  const [turno, setTurno] = useState({
    pacienteId: "",
    medicoId: "",
    fecha: "",
  });

  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setTurno(await TurnoFacade.getById(id!));
        setPacientes(await PacienteFacade.getAll());
        setMedicos(await MedicoFacade.getAll());
      } catch {
        setApiError("Error cargando turno");
      }
    };
    cargar();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await TurnoFacade.update(id!, turno);
      navigate("/turnos");
    } catch {
      setApiError("Error editando turno");
    }
  };

  return (
    <div className="card">
      <h2>Editar Turno</h2>

      <form onSubmit={handleSubmit}>
        <select value={turno.pacienteId} onChange={(e) => setTurno({ ...turno, pacienteId: e.target.value })}>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>

        <select value={turno.medicoId} onChange={(e) => setTurno({ ...turno, medicoId: e.target.value })}>
          {medicos.map((m) => (
            <option key={m.id} value={m.id}>{m.nombre}</option>
          ))}
        </select>

        <input type="datetime-local" value={turno.fecha} onChange={(e) => setTurno({ ...turno, fecha: e.target.value })} />

        {apiError && <div style={{ color: "red" }}>{apiError}</div>}

        <button className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}
