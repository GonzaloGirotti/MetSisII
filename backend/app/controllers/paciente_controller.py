# paciente_controller.py

from typing import List
from fastapi import HTTPException, status
from database.models.paciente import PacienteModel


# Función auxiliar para inicializar el modelo
def get_paciente_model(db_client) -> PacienteModel:
    return PacienteModel(db_client)

def crear_paciente(paciente_data: dict, model: PacienteModel):
    """Crea un nuevo paciente"""
    try:
        
        inserted_id = model.crear_paciente(paciente_data)  # ID del paciente recién creado
        
        # Recuperar el documento completo
        nuevo_paciente_doc = model.buscar_paciente_por_id(inserted_id)

        if not nuevo_paciente_doc:
            # Manejo de error si no se encuentra el paciente recién creado
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                                detail="Error al recuperar el paciente después de la creación.")
        
        return nuevo_paciente_doc
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                            detail=f"Error al crear el paciente: {str(e)}")


def obtener_todos_pacientes(model: PacienteModel) -> List[dict]:
    """Obtiene todos los pacientes"""
    try:
        pacientes = model.obtener_todos()
        return pacientes
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Error al obtener pacientes: {str(e)}")


def obtener_paciente_por_id(paciente_id: str, model: PacienteModel) -> dict:
    """Busca un paciente por su ID."""
    paciente_doc = model.buscar_paciente_por_id(paciente_id)
    
    if not paciente_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"paciente con ID {paciente_id} no encontrado.")

    return paciente_doc

def obtener_paciente_por_dni(dni: int, model: PacienteModel) -> dict:
    """Busca un paciente por su dni."""
    try:
        paciente_doc = model.buscar_paciente_por_dni(dni)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Error al buscar paciente por dni: {str(e)}")

    if not paciente_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"paciente con dni {dni} no encontrado.")

    return paciente_doc


def actualizar_paciente(paciente_id: str, update_data: dict, model: PacienteModel) -> dict:
    """Actualiza un paciente y devuelve el documento actualizado"""
    print("Datos: ", update_data)

    if not paciente_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Se requiere el campo 'id' para actualizar el paciente.")

    update_data.pop("_id")

    # 1. Llamada al modelo
    if not model.actualizar_paciente(paciente_id, update_data):
        # Si el modelo devuelve False, significa que el ID no se encontró
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"paciente con ID {paciente_id} no encontrado.")


    

    # 2. Recuperar y devolver el documento actualizado
    return obtener_paciente_por_id(paciente_id, model)


def eliminar_paciente(paciente_id: str, model: PacienteModel) -> dict:
    """Elimina un paciente por su ID."""
    if not model.eliminar_paciente(paciente_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"paciente con ID {paciente_id} no encontrado.")
    
    return {"message": f"paciente con ID {paciente_id} eliminado exitosamente."}