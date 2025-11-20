import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearMedico } from "../../api/medicoApi";

const CrearMedico = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [matricula, setMatricula] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearMedico({ nombre, matricula: Number(matricula), especialidad });
    navigate("/medicos");
  };

  return (
    <div className="container">
      <h2>Crear Médico</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Especialidad"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          required
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CrearMedico;
