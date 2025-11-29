// Define la interfaz Paciente para tipar objetos de pacientes
export interface Paciente {
  id?: string | number;
  nombre: string;
  edad: number | string;
  dni: string | number;
  obra_social: string;
}