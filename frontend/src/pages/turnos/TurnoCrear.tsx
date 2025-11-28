import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MedicoFacade, PacienteFacade, TurnoFacade } from "../../api/api";

export default function TurnoCrear() {
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState<any[]>([]);
  const [medicos, setMedicos] = useState<any[]>([]);

  const [turno, setTurno] = useState({
    pacienteId: "",
    medicoId: "",
    fecha: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setPacientes(await PacienteFacade.getAll() as any[]);
        setMedicos(await MedicoFacade.getAll() as any[]);
      } catch {
        setApiError("Error cargando datos");
      }
    };
    cargar();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!turno.pacienteId) errs.pacienteId = "Seleccione un paciente";
    if (!turno.medicoId) errs.medicoId = "Seleccione un médico";
    if (!turno.fecha) errs.fecha = "La fecha es obligatoria";
    return errs;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setApiError(null);

    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    try {
      setLoading(true);
      await TurnoFacade.create(turno);
      navigate("/turnos");
    } catch {
      setApiError("Error creando turno");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Crear Turno</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={turno.pacienteId}
          onChange={(e) => setTurno({ ...turno, pacienteId: e.target.value })}
        >
          <option value="">Seleccione paciente</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>

        <select
          value={turno.medicoId}
          onChange={(e) => setTurno({ ...turno, medicoId: e.target.value })}
        >
          <option value="">Seleccione médico</option>
          {medicos.map((m) => (
            <option key={m.id} value={m.id}>{m.nombre}</option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={turno.fecha}
          onChange={(e) => setTurno({ ...turno, fecha: e.target.value })}
        />

        {apiError && <div style={{ color: "red" }}>{apiError}</div>}

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear"}
        </button>
      </form>
    </div>
  );
}
