# medico_controller.py

from typing import List
from fastapi import HTTPException, status
from database.models.medico import MedicoModel


# Función auxiliar para inicializar el modelo
def get_medico_model(db_client) -> MedicoModel:
    return MedicoModel(db_client)

def crear_medico(medico_data: dict, model: MedicoModel):
    """Crea un nuevo médico"""
    try:
        
        inserted_id = model.crear_medico(medico_data)  # ID del médico recién creado
        
        # Recuperar el documento completo
        nuevo_medico_doc = model.buscar_medico_por_id(inserted_id)

        if not nuevo_medico_doc:
            # Manejo de error si no se encuentra el médico recién creado
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                                detail="Error al recuperar el médico después de la creación.")
        
        return nuevo_medico_doc
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                            detail=f"Error al crear el médico: {str(e)}")


def obtener_todos_medicos(model: MedicoModel) -> List[dict]:
    """Obtiene todos los médicos"""
    try:
        medicos = model.obtener_todos()
        return medicos
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Error al obtener médicos: {str(e)}")


def obtener_medico_por_id(medico_id: str, model: MedicoModel) -> dict:
    """Busca un médico por su ID."""
    medico_doc = model.buscar_medico_por_id(medico_id)
    
    if not medico_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"Médico con ID {medico_id} no encontrado.")

    return medico_doc

def obtener_medico_por_matricula(matricula: int, model: MedicoModel) -> dict:
    """Busca un médico por su matrícula."""
    try:
        medico_doc = model.buscar_medico_por_matricula(matricula)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Error al buscar médico por matrícula: {str(e)}")

    if not medico_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Médico con matrícula {matricula} no encontrado.")

    return medico_doc


def actualizar_medico(medico_data: dict, model: MedicoModel) -> dict:
    """Actualiza un médico y devuelve el documento actualizado"""
    
    medico_id = medico_data.get("_id")
    update_data = dict(medico_data)
    update_data.pop("_id", None)

    if not medico_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Se requiere el campo 'id' para actualizar el médico.")

    # 1. Llamada al modelo
    if not model.actualizar_medico(medico_id, update_data):
        # Si el modelo devuelve False, significa que el ID no se encontró
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Médico con ID {medico_id} no encontrado.")

    # 2. Recuperar y devolver el documento actualizado
    return obtener_medico_por_id(medico_id, model)


def eliminar_medico(medico_id: str, model: MedicoModel) -> dict:
    """Elimina un médico por su ID."""
    if not model.eliminar_medico(medico_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"Médico con ID {medico_id} no encontrado.")
    
    return {"message": f"Médico con ID {medico_id} eliminado exitosamente."}