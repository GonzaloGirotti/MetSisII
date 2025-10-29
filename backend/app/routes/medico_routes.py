from fastapi import APIRouter, HTTPException
from controllers import medico_controller as med_control
from database.models import medico as medic

router = APIRouter(prefix="/medicos")
Medico = medic.Medico # Modelo
lista_medicos = med_control.get_medics()

@router.get("/")
async def get_medicos():
    return med_control.get_medics()

@router.get("/{id}")
async def get_medico(id: int):
    return med_control.search_medic(id)

@router.post("/", response_model=Medico)
async def crear_medico(medic: Medico):
    if(type(med_control.search_medic(medic.id)) == Medico):
        raise HTTPException(status_code=404, detail="El medico ya existe.")
    
    med_control.add_medic(medic)
    return medic

@router.put("/")
async def modificar_medico(medic: Medico):

    encontrado = med_control.search_medic(medic.id)

    return encontrado

@router.delete("/{id}")
async def baja_medico(id: int):
    
    encontrado = med_control.search_medic(id)
    
    if not type(encontrado) == Medico:
        return encontrado
    
    med_control.delete_medic(encontrado)
    return {"message": f"Exito! Medico con ID {encontrado.id} dado de baja."}
    
    

