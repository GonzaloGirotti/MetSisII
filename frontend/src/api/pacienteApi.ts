import { PacienteFacade } from "./api";

// Reexportar las funciones del facade para usarlas en otros módulos

export const getPacientes = PacienteFacade.getAll;
export const getPaciente = PacienteFacade.getById;
export const crearPaciente = PacienteFacade.create;
export const actualizarPaciente = PacienteFacade.update;
export const eliminarPaciente = PacienteFacade.remove;
