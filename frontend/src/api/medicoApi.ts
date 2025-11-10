import type { Medico } from "../types/Medico";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export const getMedicos = () => apiGet("/medicos/");
export const getMedico = (id: number) => apiGet(`/medicos/${id}`);
export const crearMedico = (m: Medico) => apiPost("/medicos/", m);
export const editarMedico = (m: Medico) => apiPut("/medicos/", m);
export const eliminarMedico = (id: number) => apiDelete(`/medicos/${id}`);
