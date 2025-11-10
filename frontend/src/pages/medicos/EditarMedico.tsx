import { useEffect, useState } from "react";
import { getMedico, editarMedico } from "../../api/medicoApi";
import { useNavigate, useParams } from "react-router-dom";

const EditarMedico = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [nombre, setNombre] = useState("");
  const [matricula, setMatricula] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  useEffect(() => {
    getMedico(Number(id)).then((m) => {
      setNombre(m.nombre);
      setMatricula(String(m.matricula));
      setEspecialidad(m.especialidad);
    });
  }, []);

  const submit = async () => {
    await editarMedico({
      id: Number(id),
      nombre,
      matricula: Number(matricula),
      especialidad,
    });
    nav("/medicos");
  };

  return (
    <div>
      <h2>Editar Médico</h2>

      <input value={nombre} onChange={e => setNombre(e.target.value)} />
      <input value={matricula} onChange={e => setMatricula(e.target.value)} />
      <input value={especialidad} onChange={e => setEspecialidad(e.target.value)} />

      <button onClick={submit}>Guardar</button>
    </div>
  );
};

export default EditarMedico;
