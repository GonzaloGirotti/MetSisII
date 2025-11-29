// Define la interfaz Turno para tipar objetos de turnos
export interface Turno {
    id?: string | number;
    fecha: string;
    hora: string;
    medico_id: string | number;
    paciente_id: string | number;
}