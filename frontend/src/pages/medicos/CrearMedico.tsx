import { useState } from "react";
import { crearMedico } from "../../api/medicoApi";
import { useNavigate } from "react-router-dom";

const CrearMedico = () => {
  const nav = useNavigate();

  const [nombre, setNombre] = useState("");
  const [matricula, setMatricula] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  const submit = async () => {
    await crearMedico({
      nombre,
      matricula: Number(matricula),
      especialidad,
    });
    nav("/medicos");
  };

  return (
    <div>
      <h2>Crear Médico</h2>

      <input placeholder="nombre" onChange={e => setNombre(e.target.value)} />
      <input placeholder="matricula" onChange={e => setMatricula(e.target.value)} />
      <input placeholder="especialidad" onChange={e => setEspecialidad(e.target.value)} />

      <button onClick={submit}>Guardar</button>
    </div>
  );
};

export default CrearMedico;
