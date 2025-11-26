from pydantic import BaseModel
from typing import Optional

class PacienteSchema(BaseModel):
    nombre: str
    edad: int
    dni: int
    obra_social: str


def patient_schema(patient) -> dict:
    return {
        "nombre": patient.get("nombre"),
        "edad": patient.get("edad"),
        "dni": patient.get("dni"),
        "obra_social": patient.get("obra_social")
    }


def patients_schema(patients) -> list:
    return [patient_schema(patient) for patient in patients]