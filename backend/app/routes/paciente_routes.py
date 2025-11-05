from fastapi import APIRouter, HTTPException
from controllers import paciente_controller as pac_control
from database.models import paciente as patient

router = APIRouter(prefix="/pacientes")
Paciente = patient.Paciente # Modelo
lista_pacientes = pac_control.get_patients()

@router.get("/")
async def get_pacientes():
    return pac_control.get_patients()

@router.get("/{id}")
async def get_paciente(id: int):
    return pac_control.search_patient(id)

@router.post("/", response_model=Paciente)
async def crear_paciente(patient: Paciente):
    paciente_duplicado = pac_control.search_patient(patient.id)
    if(type(paciente_duplicado) == Paciente):
        raise HTTPException(status_code=404, detail="El paciente ingresado ya existe.")
    
    pac_control.add_patient(patient)
    return patient

@router.put("/")
async def modificar_paciente(patient: Paciente):

    encontrado = pac_control.search_patient(patient.id)

    return encontrado

@router.delete("/{id}")
async def baja_paciente(id: int):
    
    encontrado = pac_control.search_patient(id)
    
    if not type(encontrado) == Paciente:
        return encontrado
    
    pac_control.delete_patient(encontrado)
    return {"message": f"Exito! Paciente con ID {encontrado.id} dado de baja."}
    
    

