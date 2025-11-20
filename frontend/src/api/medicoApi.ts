import type { Medico } from "../types/Medico";

const API_URL = "http://localhost:3000/api/medicos"; // Ajustar si tu backend corre en otro puerto

export const getMedicos = async (): Promise<Medico[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getMedico = async (id: number): Promise<Medico> => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const crearMedico = async (medico: Medico): Promise<Medico> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medico),
  });
  return res.json();
};

export const modificarMedico = async (medico: Medico): Promise<Medico> => {
  const res = await fetch(`${API_URL}/${medico.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medico),
  });
  return res.json();
};

export const eliminarMedico = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
