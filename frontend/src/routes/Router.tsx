import { Routes, Route } from "react-router-dom";

import MedicosList from "../pages/medicos/MedicosList";
import CrearMedico from "../pages/medicos/CrearMedico";
import EditarMedico from "../pages/medicos/EditarMedico";

import PacientesList from "../pages/pacientes/PacientesList";
import CrearPaciente from "../pages/pacientes/CrearPaciente";
import EditarPaciente from "../pages/pacientes/EditarPaciente";

import TurnosList from "../pages/turnos/TurnosList";
import TurnoCrear from "../pages/turnos/TurnoCrear";
import TurnoEditar from "../pages/turnos/TurnoEditar";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MedicosList />} />

      {/* Médicos */}
      <Route path="/medicos" element={<MedicosList />} />
      <Route path="/medicos/crear" element={<CrearMedico />} />
      <Route path="/medicos/editar/:id" element={<EditarMedico />} />

      {/* Pacientes */}
      <Route path="/pacientes" element={<PacientesList />} />
      <Route path="/pacientes/crear" element={<CrearPaciente />} />
      <Route path="/pacientes/editar/:id" element={<EditarPaciente />} />

      {/* Turnos */}
      <Route path="/turnos" element={<TurnosList />} />
      <Route path="/turnos/crear" element={<TurnoCrear />} />
      <Route path="/turnos/editar/:id" element={<TurnoEditar />} />
    </Routes>
  );
}
