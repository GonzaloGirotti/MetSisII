import { TurnoFacade } from "./api";

export const getTurnos = TurnoFacade.getAll;
export const getTurno = TurnoFacade.getById;
export const crearTurno = TurnoFacade.create;
export const actualizarTurno = TurnoFacade.update;
export const eliminarTurno = TurnoFacade.remove;