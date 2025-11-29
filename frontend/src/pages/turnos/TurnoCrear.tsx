import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MedicoFacade, PacienteFacade, TurnoFacade } from "../../api/api";
import { turno_handler } from "../../error_handlers/turno_error_handler";

export default function TurnoCrear() {
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState<any[]>([]);
  const [medicos, setMedicos] = useState<any[]>([]);

  // Estado del formulario, errores, carga y error de API
  const [turno, setTurno] = useState({
    fecha: "",
    hora: "",
    medico_id: "",
    paciente_id: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Cargar la lista de pacientes y médicos desde la API
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

  // Valida el formulario usando el handler
  const validate = turno_handler;

  // Envía el formulario para crear un nuevo turno
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setApiError(null);

    const v = validate(turno);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    try {
      setLoading(true);
      await TurnoFacade.create({
        ...turno,
        fecha: turno.fecha,
        hora: turno.hora,
        medico_id: turno.medico_id,
        paciente_id: turno.paciente_id,
      });
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

        {errors.paciente_id && <div style={{ color: "red" }}>{errors.paciente_id}</div>}
        <select
          value={turno.paciente_id}
          onChange={(e) => setTurno({ ...turno, paciente_id: e.target.value })}
        >

          <option value="">Seleccione paciente</option>
          {pacientes.map((p) => (
            <option key={p._id} value={p._id}>{p.nombre}</option>
          ))}
        </select>

        {errors.medico_id && <div style={{ color: "red" }}>{errors.medico_id}</div>}
        <select
          value={turno.medico_id}
          onChange={(e) => setTurno({ ...turno, medico_id: e.target.value })}
        >
          <option value="">Seleccione médico</option>
          {medicos.map((m) => (
            <option key={m._id} value={m._id}>{m.nombre}</option>
          ))}
        </select>

        {errors.fecha && <div style={{ color: "red" }}>{errors.fecha}</div>}
        <input
          type="date"
          value={turno.fecha}
          onChange={(e) => setTurno({ ...turno, fecha: e.target.value })}
        />

        {errors.hora && <div style={{ color: "red" }}>{errors.hora}</div>}
        <input
          type="time"
          value={turno.hora}
          onChange={(e) => setTurno({ ...turno, hora: e.target.value })}
        />

        {apiError && <div style={{ color: "red" }}>{apiError}</div>}

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear"}
        </button>
      </form>
    </div>
  );
}
