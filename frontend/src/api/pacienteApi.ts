import type { Paciente } from "../types/Paciente";

const API_URL = "http://localhost:3000/api/pacientes"; // Ajustar según tu backend

export const getPacientes = async (): Promise<Paciente[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getPaciente = async (id: number): Promise<Paciente> => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const crearPaciente = async (paciente: Paciente): Promise<Paciente> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paciente),
  });
  return res.json();
};

export const modificarPaciente = async (paciente: Paciente): Promise<Paciente> => {
  const res = await fetch(`${API_URL}/${paciente.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paciente),
  });
  return res.json();
};

export const eliminarPaciente = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
