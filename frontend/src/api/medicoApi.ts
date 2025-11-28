import { MedicoFacade } from "./api";

export const getMedicos = MedicoFacade.getAll;
export const getMedico = MedicoFacade.getById;
export const crearMedico = MedicoFacade.create;
export const actualizarMedico = MedicoFacade.update;
export const eliminarMedico = MedicoFacade.remove;
