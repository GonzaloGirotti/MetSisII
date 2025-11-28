import type { Paciente } from "../types/Paciente";

export const paciente_handler = (form: Paciente) => {
    const errs: Record<string, string> = {};


    // AUSENCIA DE ALGUN CAMPO OBLIGATORIO
    if (!form.nombre.trim()) errs.nombre = "Nombre requerido";
    if (!form.edad) errs.edad = "Edad requerida";
    if (!form.dni) errs.dni = "DNI requerido";
    if (!form.obra_social.trim()) errs.obra_social = "Obra social requerida";

    // VALIDACIONES ESPECIFICAS

    // Edad y DNI deben ser números positivos.
    const edadNum = Number(form.edad);
    if (isNaN(edadNum) || edadNum <= 0) {
        errs.edad = "La edad debe ser un número positivo";
    }

    const dniNum = Number(form.dni);
    if (isNaN(dniNum) || dniNum <= 0) {
        errs.dni = "El DNI debe ser un número positivo";
    }

    return errs;
};