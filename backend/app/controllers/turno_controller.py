# turno_controller.py

from typing import List
from fastapi import HTTPException, status
from database.models.turno import TurnoModel
from bson import ObjectId
from pymongo.errors import DuplicateKeyError
import traceback



# Función auxiliar para inicializar el modelo
def get_turno_model(db_client) -> TurnoModel:
    return TurnoModel(db_client)

def crear_turno(turno_data: dict, model: TurnoModel):
    """
    Crea un nuevo turno llamando al modelo, maneja errores de negocio (409) 
    y devuelve el documento completo (con nombres).
    """
    try:
        
        # 1. Llama a la función del modelo (que ahora busca nombres y guarda)
        inserted_id = model.crear_turno(turno_data) 
        
        # 2. Recuperar el documento completo
        nuevo_turno_doc = model.buscar_turno_por_id(inserted_id)

        if not nuevo_turno_doc:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                                detail="Error al recuperar el turno después de la creación.")
        
        # 3. Devolver el documento completo
        return nuevo_turno_doc
    
    except ValueError as ve: 
        # 🟢 Manejo de errores de negocio (Paciente no encontrado, ID inválido, Turno duplicado)
        # 409 Conflict es apropiado para indicar un fallo de datos o de lógica de negocio.
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, 
                            detail=str(ve))
    
    except Exception as e:
        # ⚠️ Manejo de errores inesperados que no fueron ValueError (e.g., fallos de conexión a DB)
        # Loggear la traza completa antes de lanzar el 500 para el debugging
        traceback.print_exc()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                            detail=f"Error interno del servidor: {type(e).__name__}. Consulte los logs del servidor para más detalles.")


def obtener_todos_turnos(model: TurnoModel) -> List[dict]:
    """Obtiene todos los turnos"""
    try:
        turnos = model.obtener_todos()
        return turnos
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Error al obtener turnos: {str(e)}")


def obtener_turno_por_id(turno_id: str, model: TurnoModel) -> dict:
    """Busca un turno por su ID."""
    turno_doc = model.buscar_turno_por_id(turno_id)
    
    if not turno_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"turno con ID {turno_id} no encontrado.")

    return turno_doc

def obtener_turno_por_fechaHora(fecha: str, hora:str, model: TurnoModel) -> dict:
    """Busca un turno por su fecha y hora."""
    try:
        turno_doc = model.buscar_turno_por_fechaHora(fecha, hora)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Error al buscar turno por fecha y hora: {str(e)}")

    if not turno_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"turno con fecha {fecha} y hora {hora} no encontrado.")

    return turno_doc


def actualizar_turno(turno_id, update_data: dict, model: TurnoModel) -> dict:
    """Actualiza un turno y devuelve el documento actualizado"""

    if not turno_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Se requiere el campo 'id' para actualizar el turno.")

    update_data.pop("_id")

    # 1. Llamada al modelo
    if not model.actualizar_turno(turno_id, update_data):
        # Si el modelo devuelve False, significa que el ID no se encontró
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"turno con ID {turno_id} no encontrado.")

    # 2. Recuperar y devolver el documento actualizado
    return obtener_turno_por_id(turno_id, model)


def eliminar_turno(turno_id: str, model: TurnoModel) -> dict:
    """Elimina un turno por su ID."""
    if not model.eliminar_turno(turno_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"turno con ID {turno_id} no encontrado.")
    
    return {"message": f"turno con ID {turno_id} eliminado exitosamente."}