from fastapi import APIRouter, HTTPException
from controllers import medico_controller as med_control
from database.models import medico as medic_module
from database.connection import db_client
from database.schemas.medico_schema import MedicoSchema
from database.models.medico import MedicoModel

router = APIRouter(prefix="/medicos")

# Pydantic schema for request/response
Medico = MedicoSchema
# Instancia del modelo que provee métodos de BD
medico_model = med_control.get_medico_model(db_client)


@router.get("/")
async def get_medicos():
    return med_control.obtener_todos_medicos(medico_model)

@router.get("/id/{id}")
async def get_medico_id(id: str):
    return med_control.obtener_medico_por_id(id, medico_model)

@router.get("/matricula/{matricula}")
async def get_medico_matricula(matricula: int):
    return med_control.obtener_medico_por_matricula(matricula, medico_model)

@router.post("/", response_model=Medico)
async def crear_medico(medic: Medico):
     return med_control.crear_medico(medic.dict(), medico_model)

@router.put("/")
async def modificar_medico(medic: Medico):
    return med_control.actualizar_medico(medic.dict(), medico_model)

@router.delete("/{id}")
async def baja_medico(id: str):
    return med_control.eliminar_medico(id, medico_model)
    

