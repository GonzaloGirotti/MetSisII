import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

/* ===========================
   MANEJO CENTRALIZADO DE ERRORES
=========================== */
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
  create: (data: any) =>
    request(() => api.post("/medicos/", data)),
  update: (data: any) =>
    request(() => api.put("/medicos/", data)), // usa _id en body
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
  update: (data: any) =>
    request(() => api.put("/turnos/", data)),
  remove: (id: string) =>
    request(() => api.delete(`/turnos/${id}`)),
};
