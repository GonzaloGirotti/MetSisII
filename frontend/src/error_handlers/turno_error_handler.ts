import type { Turno } from "../types/Turno";

// Función para validar el formulario de Turno

export const turno_handler = (form: Turno) => {
    const errs: Record<string, string> = {};


    // AUSENCIA DE ALGUN CAMPO OBLIGATORIO
    if (!form.medico_id) errs.medico_id = "Médico requerido";
    if (!form.paciente_id) errs.paciente_id = "Paciente requerido";
    if (!form.fecha.trim()) errs.fecha = "Fecha requerida";
    if (!form.hora.trim()) errs.hora = "Hora requerida";

    // VALIDACIONES ESPECIFICAS

    // Fecha  debe ser correcta (posterior a hoy)
    const hoy = new Date();
    const fechaTurno = new Date(form.fecha + "T" + form.hora);
    if (fechaTurno < hoy) errs.fecha = "La fecha y hora del turno deben ser posteriores a la fecha actual";

    return errs;
};