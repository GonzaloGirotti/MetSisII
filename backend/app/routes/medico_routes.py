from fastapi import APIRouter, HTTPException
from controllers import medico_controller as control
from database.models import medico as medic

router = APIRouter(prefix="/medicos")
Medico = medic.Medico # Modelo
lista_medicos = control.get_medics()

@router.get("/")
async def get_medicos():
    return control.get_medics()

@router.get("/{id}")
async def get_medico(id: int):
    return control.search_medic(id)

@router.post("/", response_model=Medico)
async def crear_medico(medic: Medico):
    if(type(control.search_medic(medic.id)) == Medico):
        raise HTTPException(status_code=404, detail="El medico ya existe.")
    
    control.add_medic(medic)
    return medic

@router.put("/")
async def modificar_medico(medic: Medico):

    encontrado = False

    for index, medico_actual in enumerate(lista_medicos):
        if medico_actual.id == medic.id:
            lista_medicos[index] = medic
            encontrado = True

    if not encontrado:
        return {"error": "No se ha actualizado el medico"}

    return medic
    
    

