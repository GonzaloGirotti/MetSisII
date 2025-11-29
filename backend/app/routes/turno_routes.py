from fastapi import APIRouter
from controllers import turno_controller as turn_control
from database.connection import db_client
from database.schemas.turno_schema import TurnoSchema

router = APIRouter(prefix="/turnos")


Turno = TurnoSchema
# Instancia del modelo que provee métodos de BD
turno_model = turn_control.get_turno_model(db_client)


@router.get("/")
async def get_turnos():
    return turn_control.obtener_todos_turnos(turno_model)

@router.get("/id/{id}")
async def get_turno_id(id: str):
    return turn_control.obtener_turno_por_id(id, turno_model)

@router.get("/dni/{dni}")
async def get_turno_dni(dni: int):
    return turn_control.obtener_turno_por_dni(dni, turno_model)

@router.post("/", response_model=Turno)
async def crear_turno(turn: Turno):
     return turn_control.crear_turno(turn.dict(), turno_model)

@router.put("/{id}")
async def modificar_turno(id: str, turn: Turno):
    turno_data = turn.dict()
    turno_data["_id"] = id
    return turn_control.actualizar_turno(id, turno_data, turno_model)

@router.delete("/{id}")
async def baja_turno(id: str):
    return turn_control.eliminar_turno(id, turno_model)
    

