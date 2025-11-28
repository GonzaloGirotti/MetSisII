import { PacienteFacade } from "./api";

export const getPacientes = PacienteFacade.getAll;
export const getPaciente = PacienteFacade.getById;
export const crearPaciente = PacienteFacade.create;
export const actualizarPaciente = PacienteFacade.update;
export const eliminarPaciente = PacienteFacade.remove;
