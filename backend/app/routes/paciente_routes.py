from fastapi import APIRouter
from controllers import paciente_controller as pac_control
from database.connection import db_client
from database.schemas.paciente_schema import PacienteSchema

router = APIRouter(prefix="/pacientes")


Paciente = PacienteSchema
# Instancia del modelo que provee métodos de BD
paciente_model = pac_control.get_paciente_model(db_client)


@router.get("/")
async def get_pacientes():
    return pac_control.obtener_todos_pacientes(paciente_model)

@router.get("/id/{id}")
async def get_paciente_id(id: str):
    return pac_control.obtener_paciente_por_id(id, paciente_model)

@router.get("/dni/{dni}")
async def get_paciente_dni(dni: int):
    return pac_control.obtener_paciente_por_dni(dni, paciente_model)

@router.post("/", response_model=Paciente)
async def crear_paciente(patient: Paciente):
     return pac_control.crear_paciente(patient.dict(), paciente_model)

@router.put("/{id}")
async def modificar_paciente(id: str, patient: Paciente):
    paciente_data = patient.dict()
    paciente_data["_id"] = id
    return pac_control.actualizar_paciente(id, paciente_data, paciente_model)

@router.delete("/{id}")
async def baja_paciente(id: str):
    return pac_control.eliminar_paciente(id, paciente_model)
    

