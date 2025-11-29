from pydantic import BaseModel
from typing import Optional

# Modelo  para la creación (POST) y lectura (GET)
class MedicoSchema(BaseModel): 
    _id: Optional[str] = None 
    nombre: str
    matricula: int
    especialidad: str

# MODELO para recibir datos en PUT/PATCH
"""
Permite que los campos sean opcionales al actualizar,
ya que el se puede querer actualizar solo algunos campos.
"""
 
class MedicoUpdateSchema(BaseModel):
    nombre: Optional[str] = None
    matricula: Optional[int] = None
    especialidad: Optional[str] = None

def medic_schema(medic) -> dict:
    return {
        "_id": str(medic["_id"]),
        "nombre": medic.get("nombre"),
        "matricula": medic.get("matricula"),
        "especialidad": medic.get("especialidad")
    }


def medics_schema(medics) -> list:
    return [medic_schema(medic) for medic in medics]