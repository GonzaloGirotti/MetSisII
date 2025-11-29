import { MedicoFacade } from "./api";

// Reexportar las funciones del facade para usarlas en otros módulos

export const getMedicos = MedicoFacade.getAll;
export const getMedico = MedicoFacade.getById;
export const crearMedico = MedicoFacade.create;
export const actualizarMedico = MedicoFacade.update;
export const eliminarMedico = MedicoFacade.remove;
