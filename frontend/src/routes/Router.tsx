import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";

import MedicosList from "../pages/medicos/MedicosList";
import CrearMedico from "../pages/medicos/CrearMedico";
import EditarMedico from "../pages/medicos/EditarMedico";

import PacientesList from "../pages/pacientes/PacientesList";
import CrearPaciente from "../pages/pacientes/CrearPaciente";
import EditarPaciente from "../pages/pacientes/EditarPaciente";

import TurnosList from "../pages/turnos/TurnosList";
import TurnoCrear from "../pages/turnos/TurnoCrear";
import TurnoEditar from "../pages/turnos/TurnoEditar";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        {/* MÉDICOS */}
        <Route
          path="/medicos"
          element={
            <PrivateRoute>
              <MedicosList />
            </PrivateRoute>
          }
        />
        <Route
          path="/medicos/crear"
          element={
            <PrivateRoute>
              <CrearMedico />
            </PrivateRoute>
          }
        />
        <Route
          path="/medicos/editar/:id"
          element={
            <PrivateRoute>
              <EditarMedico />
            </PrivateRoute>
          }
        />

        {/* PACIENTES */}
        <Route
          path="/pacientes"
          element={
            <PrivateRoute>
              <PacientesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/pacientes/crear"
          element={
            <PrivateRoute>
              <CrearPaciente />
            </PrivateRoute>
          }
        />
        <Route
          path="/pacientes/editar/:id"
          element={
            <PrivateRoute>
              <EditarPaciente />
            </PrivateRoute>
          }
        />

        {/* TURNOS */}
        <Route
          path="/turnos"
          element={
            <PrivateRoute>
              <TurnosList />
            </PrivateRoute>
          }
        />
        <Route
          path="/turnos/crear"
          element={
            <PrivateRoute>
              <TurnoCrear />
            </PrivateRoute>
          }
        />
        <Route
          path="/turnos/editar/:id"
          element={
            <PrivateRoute>
              <TurnoEditar />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
