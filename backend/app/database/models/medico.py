from typing import Optional
from pymongo.errors import DuplicateKeyError
from bson import ObjectId


class MedicoModel:

    def __init__(self, db):
        self.collection = db.medicos
        self.crear_indices_medico(db)
    
    def crear_indices_medico(self, db):
        """Asegura que el campo matricula sea único."""

        # db es la instancia de la base de datos MongoDB
        coleccion = db.medicos

        # Índice Único para matrícula (matrícula se comporta como una PK)
        coleccion.create_index(
            [("matricula", 1)], 
            unique=True,
            name="idx_matricula_unique"
        )
        
    def crear_medico(self, medico_data: dict) -> dict:
        """Inserta un nuevo medico en la colección."""        
        try:
            
            medico_ingresado = self.collection.insert_one(medico_data)
            
            # Devolvemos el ID generado para confirmación
            return str(medico_ingresado.inserted_id)
        
        except DuplicateKeyError as e:
            if "matricula" in e.details['errmsg']:
                raise ValueError("La matrícula proporcionada ya está registrada.") from e
            
            raise e # Volver a lanzar si es otro tipo de error
    
    def obtener_todos(self) -> list:
        """Obtiene todos los médicos de la colección."""
        try:
            medicos = list(self.collection.find())
            for medico in medicos:
                medico["_id"] = str(medico["_id"])
            return medicos
        except Exception as e:
            print(f"Error al obtener todos los médicos: {e}")
            return []
        
    def buscar_medico_por_id(self, medico_id: str) -> Optional[dict]:
        """Busca un médico por su ID."""
        try:
            medico = self.collection.find_one({"_id": ObjectId(medico_id)})
            if medico and "_id" in medico:
                medico["_id"] = str(medico["_id"]) 
            return medico
        except Exception as e:
            print(f"Error al buscar médico por ID: {e}")
            return None
    
    def buscar_medico_por_matricula(self, matricula: int) -> dict:
        """Busca un médico por su matrícula."""
        try:
            medico = self.collection.find_one({"matricula": matricula})
            if medico and "_id" in medico:
                medico["_id"] = str(medico["_id"])  
            return medico
        except Exception as e:
            print(f"Error al buscar médico por matrícula: {e}")
            return None
    
    def actualizar_medico(self, medico_id: str, update_data: dict) -> bool:
        """Actualiza los datos de un médico existente."""
        try:
            resultado = self.collection.update_one(
                {"_id": ObjectId(medico_id)},
                {"$set": update_data}
            )
            return resultado.modified_count > 0 # Devuelve True si se modificó algún documento
        except Exception as e:
            print(f"Error al actualizar médico: {e}")
            return False

    def eliminar_medico(self, medico_id: str) -> bool:
        """Elimina un médico por su ID."""
        try:
            resultado = self.collection.delete_one({"_id": ObjectId(medico_id)})
            return resultado.deleted_count > 0 # Devuelve True si se eliminó algún documento
        except Exception as e:
            print(f"Error al eliminar médico: {e}")
            return False