// Define la interfaz Medico para tipar objetos médicos
export interface Medico {
  id?: string | number;
  nombre: string;
  matricula: string | number;
  especialidad: string;
}