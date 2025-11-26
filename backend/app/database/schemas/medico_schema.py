from pydantic import BaseModel
from typing import Optional


class MedicoSchema(BaseModel):
    nombre: str
    matricula: int
    especialidad: str


def medic_schema(medic) -> dict:
    return {
        "nombre": medic.get("nombre"),
        "matricula": medic.get("matricula"),
        "especialidad": medic.get("especialidad"),
    }


def medics_schema(medics) -> list:
    return [medic_schema(medic) for medic in medics]