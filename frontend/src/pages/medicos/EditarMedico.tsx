import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MedicoFacade } from "../../api/api";
import type { Medico } from "../../types/Medico";

export default function EditarMedico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medico, setMedico] = useState<Medico>({
    nombre: "",
    matricula: "",
    especialidad: "",
  });

  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await MedicoFacade.getById(id!);
        setMedico(data);
      } catch {
        setApiError("Error cargando médico");
      }
    };
    cargar();
  }, [id]);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await MedicoFacade.update({
        _id: id,                // ✅ CLAVE PARA TU BACKEND
        ...medico,
      });
      navigate("/medicos");
    } catch {
      setApiError("Error actualizando médico");
    }
  };

  return (
    <div className="card">
      <h2>Editar Médico</h2>

      <form onSubmit={enviar}>
        <input
          value={medico.nombre}
          onChange={(e) => setMedico({ ...medico, nombre: e.target.value })}
        />
        <input
          value={medico.matricula}
          onChange={(e) => setMedico({ ...medico, matricula: e.target.value })}
        />
        <input
          value={medico.especialidad}
          onChange={(e) => setMedico({ ...medico, especialidad: e.target.value })}
        />

        {apiError && <div style={{ color: "red" }}>{apiError}</div>}

        <button className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}
