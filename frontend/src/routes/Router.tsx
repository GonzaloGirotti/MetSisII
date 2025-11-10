import { Routes, Route } from "react-router-dom";

import MedicosList from "../pages/medicos/MedicosList";
import CrearMedico from "../pages/medicos/CrearMedico";
import EditarMedico from "../pages/medicos/EditarMedico";

const Router = () => {
  return (
    <Routes>
      {/* Médicos */}
      <Route path="/" element={<MedicosList />} />
      <Route path="/medicos" element={<MedicosList />} />
      <Route path="/medicos/crear" element={<CrearMedico />} />
      <Route path="/medicos/editar/:id" element={<EditarMedico />} />

      {/* Pacientes (placeholder fase 2) */}
      <Route path="/pacientes" element={<h2>Pacientes (fase 2)</h2>} />
    </Routes>
  );
};

export default Router;
