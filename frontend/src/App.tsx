import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";

import MedicosList from "./pages/medicos/MedicosList";
import CrearMedico from "./pages/medicos/CrearMedico";
import EditarMedico from "./pages/medicos/EditarMedico";
import BuscarMedicoMatricula from "./pages/medicos/BuscarMedicoMatricula";

import PacientesList from "./pages/pacientes/PacientesList";
import CrearPaciente from "./pages/pacientes/CrearPaciente";
import EditarPaciente from "./pages/pacientes/EditarPaciente";
import BuscarPacienteDNI from "./pages/pacientes/BuscarPacienteDNI";

import TurnosList from "./pages/turnos/TurnosList";
import TurnoCrear from "./pages/turnos/TurnoCrear";
import TurnoEditar from "./pages/turnos/TurnoEditar";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

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

        <Route
          path="/medicos/buscar"
          element={
            <PrivateRoute>
              <BuscarMedicoMatricula />
            </PrivateRoute>
          }
        />

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

        <Route
          path="/pacientes/buscar"
          element={
            <PrivateRoute>
              <BuscarPacienteDNI />
            </PrivateRoute>
          }
        />

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
    </Layout>
  );
}
