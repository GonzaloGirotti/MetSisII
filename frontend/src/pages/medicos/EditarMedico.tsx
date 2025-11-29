import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as MedicoAPI from "../../api/medicoApi";
import type { Medico } from "../../types/Medico";

export default function EditarMedico() {
  // Obtener el ID del médico desde los parámetros de la URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del formulario y error de API
  const [medico, setMedico] = useState<Medico>({
    nombre: "",
    matricula: "",
    especialidad: "",
  });

  // Estado de error de API
  const [apiError, setApiError] = useState<string | null>(null);

  // Cargar los datos del médico al montar el componente
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await MedicoAPI.getMedico(id!);
        setMedico(data as Medico);
      } catch {
        setApiError("Error cargando médico");
      }
    };
    cargar();
  }, [id]);

  // Envía el formulario para actualizar el médico
  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bodyActualizado = {
        nombre: medico.nombre,
        matricula: medico.matricula,
        especialidad: medico.especialidad,
      }
      await MedicoAPI.actualizarMedico(id!, bodyActualizado);
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
