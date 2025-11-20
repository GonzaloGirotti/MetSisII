import { Routes, Route } from "react-router-dom";

// Médicos
import MedicosList from "../pages/medicos/MedicosList";
import CrearMedico from "../pages/medicos/CrearMedico";
import EditarMedico from "../pages/medicos/EditarMedico";

// Pacientes
import PacientesList from "../pages/pacientes/PacientesList";
import CrearPaciente from "../pages/pacientes/CrearPaciente";
import EditarPaciente from "../pages/pacientes/EditarPaciente";

const Router = () => {
  return (
    <Routes>
      {/* Médicos */}
      <Route path="/" element={<MedicosList />} />
      <Route path="/medicos" element={<MedicosList />} />
      <Route path="/medicos/crear" element={<CrearMedico />} />
      <Route path="/medicos/editar/:id" element={<EditarMedico />} />

      {/* Pacientes */}
      <Route path="/pacientes" element={<PacientesList />} />
      <Route path="/pacientes/crear" element={<CrearPaciente />} />
      <Route path="/pacientes/editar/:id" element={<EditarPaciente />} />
    </Routes>
  );
};

export default Router;
