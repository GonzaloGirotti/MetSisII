import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

/* 
Configuración de Axios
- baseURL: URL base de la API
- headers: encabezados comunes para todas las solicitudes
*/

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

/* ===========================
   MANEJO CENTRALIZADO DE ERRORES
=========================== */

/* 
  Función genérica para manejar solicitudes y errores,
  recibe un callback que realiza la solicitud y devuelve los datos o lanza un error.
*/
async function request<T>(callback: () => Promise<{ data: T }>): Promise<T> {
  try {
    const res = await callback();
    return res.data;
  } catch (error: any) {
    const msg =
      error?.response?.data?.detail ||
      error?.message ||
      "Error de comunicación con el servidor";
    throw new Error(msg);
  }
}

/* ===========================
             PACIENTES
=========================== */
export const PacienteFacade = {
  getAll: () => request(() => api.get("/pacientes/")),
  getById: (id: string) =>
    request(() => api.get(`/pacientes/id/${id}`)),
  getByDNI: (dni: string) =>
    request(() => api.get(`/pacientes/dni/${dni}`)),
  create: (data: any) =>
    request(() => api.post("/pacientes/", data)),
  update: (id: string, data: any) =>
    request(() => api.put(`/pacientes/${id}`, data)), // usa _id en body
  remove: (id: string) =>
    request(() => api.delete(`/pacientes/${id}`)),
};

/* ===========================
             MEDICOS
=========================== */
export const MedicoFacade = {
  getAll: () => request(() => api.get("/medicos/")),
  getById: (id: string) =>
    request(() => api.get(`/medicos/id/${id}`)),
  getByMatricula: (matricula: string) =>
    request(() => api.get(`/medicos/matricula/${matricula}`)),
  create: (data: any) =>
    request(() => api.post("/medicos/", data)),
  update: (id: string, data: any) =>
    request(() => api.put(`/medicos/${id}`, data)), // usa _id en body
  remove: (id: string) =>
    request(() => api.delete(`/medicos/${id}`)),
};

/* ===========================
             TURNOS
=========================== */
export const TurnoFacade = {
  getAll: () => request(() => api.get("/turnos/")),
  getById: (id: string) =>
    request(() => api.get(`/turnos/id/${id}`)),
  create: (data: any) =>
    request(() => api.post("/turnos/", data)),
  update: (id: string, data: any) =>
    request(() => api.put(`/turnos/${id}`, data)),
  remove: (id: string) =>
    request(() => api.delete(`/turnos/${id}`)),
};
