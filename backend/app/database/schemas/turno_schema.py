from pydantic import BaseModel
from typing import Optional, List

# --- ESQUEMAS ---

# Modelo para la CREACIÓN (POST) - Solo IDs
class TurnoSchema(BaseModel):
    _id: Optional[str] = None
    fecha: str
    hora: str
    medico_id: str
    paciente_id: str

# Modelo para la RESPUESTA/LISTADO (GET) - Incluye Nombres
class TurnoResponseSchema(TurnoSchema):
    medico_nombre: str
    paciente_nombre: str

# Modelo para la ACTUALIZACIÓN (PUT/PATCH)
"""
Permite que los campos sean opcionales al actualizar,
ya que el se puede querer actualizar solo algunos campos.
"""
class TurnoUpdateSchema(BaseModel):
    fecha: Optional[str] = None
    hora: Optional[str] = None
    medico_id: Optional[str] = None
    paciente_id: Optional[str] = None

def turn_schema(turn) -> dict:
    
    return {
        "_id": str(turn["_id"]),
        "fecha": turn.get("fecha"),
        "hora": turn.get("hora"),
        "medico_id": turn.get("medico_id"),
        "paciente_id": turn.get("paciente_id"),
        "paciente_nombre": turn.get("paciente_nombre", ""),
        "medico_nombre": turn.get("medico_nombre", ""),
    }


def turns_schema(turns: List[dict]) -> List[dict]:
    return [turn_schema(turn) for turn in turns]