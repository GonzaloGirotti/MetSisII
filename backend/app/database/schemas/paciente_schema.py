from pydantic import BaseModel
from typing import Optional

# Modelo  para la creación (POST) y lectura (GET)
class PacienteSchema(BaseModel):
    _id: Optional[str] = None 
    nombre: str
    edad: int
    dni: int
    obra_social: str

# MODELO para recibir datos en PUT/PATCH
"""
Permite que los campos sean opcionales al actualizar,
ya que el se puede querer actualizar solo algunos campos.
"""
class PacienteUpdateSchema(BaseModel):
    nombre: Optional[str] = None
    edad: Optional[int] = None
    dni: Optional[int] = None
    obra_social: Optional[str] = None

def patient_schema(patient) -> dict:
    return {
        "_id": str(patient["_id"]),
        "nombre": patient.get("nombre"),
        "edad": patient.get("edad"),
        "dni": patient.get("dni"),
        "obra_social": patient.get("obra_social")
    }


def patients_schema(patients) -> list:
    return [patient_schema(patient) for patient in patients]