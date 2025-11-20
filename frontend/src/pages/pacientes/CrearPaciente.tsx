import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearPaciente } from "../../api/pacienteApi";

const CrearPaciente = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [obra_social, setObraSocial] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearPaciente({ nombre, edad: Number(edad), obra_social });
    navigate("/pacientes");
  };

  return (
    <div className="container">
      <h2>Crear Paciente</h2>
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
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Obra Social"
          value={obra_social}
          onChange={(e) => setObraSocial(e.target.value)}
          required
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CrearPaciente;
