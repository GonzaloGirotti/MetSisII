import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PacienteFacade } from "../../api/api";

export default function EditarPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({});
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await PacienteFacade.getById(id!);
        setForm(data);
      } catch {
        setApiError("Error cargando paciente");
      }
    };
    cargar();
  }, [id]);

  const enviar = async (e: any) => {
    e.preventDefault();
    try {
      await PacienteFacade.update({
        _id: id,               // ✅ CLAVE PARA TU BACKEND
        ...form,
      });
      navigate("/pacientes");
    } catch {
      setApiError("Error actualizando paciente");
    }
  };

  return (
    <div className="card">
      <h2>Editar Paciente</h2>

      {apiError && <div style={{ color: "red" }}>{apiError}</div>}

      <form onSubmit={enviar}>
        <input
          value={form.nombre || ""}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          value={form.edad || ""}
          onChange={(e) => setForm({ ...form, edad: e.target.value })}
        />
        <input
          value={form.obraSocial || ""}
          onChange={(e) => setForm({ ...form, obraSocial: e.target.value })}
        />

        <button className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}
