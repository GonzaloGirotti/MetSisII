import type { Medico } from "../types/Medico";

// Función para validar el formulario de médico

export const medico_handler = (form: Medico) => {
    const errs: Record<string, string> = {};

    // AUSENCIA DE ALGUN CAMPO OBLIGATORIO
    if (!form.nombre.trim()) errs.nombre = "Nombre requerido";
    if (!form.matricula) errs.matricula = "Matrícula requerida";
    if (!form.especialidad.trim()) errs.especialidad = "Especialidad requerida";

    // VALIDACIONES ESPECIFICAS

    // La matrícula debe ser un número positivo.
    const matriculaNum = Number(form.matricula);
    if (isNaN(matriculaNum) || matriculaNum <= 0) {
        errs.matricula = "La matrícula debe ser un número positivo";
    }

    return errs;
};