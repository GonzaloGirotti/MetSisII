from typing import Optional
from pymongo.errors import DuplicateKeyError
from bson import ObjectId
from bson.errors import InvalidId 


class PacienteModel:

    def __init__(self, db):
        self.collection = db.pacientes
        self.crear_indices_paciente(db)
    
    def crear_indices_paciente(self, db):
        """Asegura que el campo DNI sea único."""

        # db es la instancia de la base de datos MongoDB
        coleccion = db.pacientes

        # Índice Único para DNI (DNI se comporta como una PK)
        coleccion.create_index(
            [("dni", 1)], 
            unique=True,
            name="idx_dni_unique"
        )
        
    def crear_paciente(self, paciente_data: dict) -> dict:
        """Inserta un nuevo paciente en la colección."""        
        try:
            
            paciente_ingresado = self.collection.insert_one(paciente_data)
            
            # Devolvemos el ID generado para confirmación
            return str(paciente_ingresado.inserted_id)
        
        except DuplicateKeyError as e:
            if "dni" in e.details['errmsg']:
                raise ValueError("El DNI proporcionado ya está registrado.") from e
            
            raise e # Volver a lanzar si es otro tipo de error
    
    def obtener_todos(self) -> list:
        """Obtiene todos los pacientes de la colección."""
        try:
            pacientes = list(self.collection.find())
            for paciente in pacientes:
                paciente["_id"] = str(paciente["_id"])
            return pacientes
        except Exception as e:
            print(f"Error al obtener todos los pacientes: {e}")
            return []
        
    def buscar_paciente_por_id(self, paciente_id: str) -> Optional[dict]:
        """Busca un paciente por su ID."""
        try:
            paciente = self.collection.find_one({"_id": ObjectId(paciente_id)})
            if paciente and "_id" in paciente:
                paciente["_id"] = str(paciente["_id"]) 
                
            paciente = {"_id": paciente["_id"], **paciente}  # Asegura que se retorne una copia del diccionario
            return paciente
        except Exception as e:
            print(f"Error al buscar paciente por ID: {e}")
            return None
    
    def buscar_paciente_por_dni(self, dni: int) -> dict:
        """Busca un paciente por su dni."""
        try:
            paciente = self.collection.find_one({"dni": dni})
            if paciente and "_id" in paciente:
                paciente["_id"] = str(paciente["_id"])  
            return paciente
        except Exception as e:
            print(f"Error al buscar paciente por matrícula: {e}")
            return None
    
    def actualizar_paciente(self, paciente_id: str, update_data: dict) -> bool:
        """Actualiza los datos de un paciente existente."""
        try:
            resultado = self.collection.update_one(
                {"_id": ObjectId(paciente_id)},
                {"$set": update_data}
            )
            return resultado.modified_count > 0 # Devuelve True si se modificó algún documento
        
        except InvalidId as e:
            # Captura si el formato de la string no es un ObjectId válido
            print(f"Error al actualizar paciente: ID de formato inválido: {e}")
            return False
        
        except Exception as e:
            print(f"Error al actualizar paciente: {e}")
            return False

    def eliminar_paciente(self, paciente_id: str) -> bool:
        """Elimina un paciente por su ID."""
        try:
            resultado = self.collection.delete_one({"_id": ObjectId(paciente_id)})
            return resultado.deleted_count > 0 # Devuelve True si se eliminó algún documento
        except Exception as e:
            print(f"Error al eliminar paciente: {e}")
            return False