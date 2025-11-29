from typing import Optional
from pymongo.errors import DuplicateKeyError
from bson import ObjectId
from bson.errors import InvalidId


class TurnoModel:

    def __init__(self, db):
        self.db = db
        self.collection = db.turnos
        self.crear_indices_turno(db)
    
    def crear_indices_turno(self, db):
        """Asegura que la combinacion fecha - hora sea única."""

        # db es la instancia de la base de datos MongoDB
        coleccion = db.turnos

        # Índice Único para fecha - hora (esto se comporta como pk)
        coleccion.create_index(
            [("fecha", 1), ("hora", 1)], 
            unique=True,
            name="idx_fecha_hora_unique"
        )
        
    def crear_turno(self, turno_data: dict) -> str:
        """
        Inserta un nuevo turno, buscando y agregando los nombres de paciente y médico
        (Desnormalización) antes de guardar, y maneja errores de formato de ID.
        """        
        try:
            # 1. Intenta convertir IDs a ObjectId. Captura InvalidId si el formato es incorrecto.
            try:
                paciente_oid = ObjectId(turno_data["paciente_id"])
                medico_oid = ObjectId(turno_data["medico_id"])
            except (TypeError, InvalidId):
                # Lanza un ValueError si el formato del ID no es un ObjectId válido (24 caracteres hexadecimales)
                raise ValueError("El formato de ID de paciente o médico es inválido.")
            
            # 2. Buscar nombres en las colecciones (usando self.db)
            paciente_doc = self.db.pacientes.find_one({"_id": paciente_oid})
            if not paciente_doc:
                raise ValueError(f"Paciente con ID {turno_data['paciente_id']} no encontrado.")
            
            medico_doc = self.db.medicos.find_one({"_id": medico_oid})
            if not medico_doc:
                raise ValueError(f"Médico con ID {turno_data['medico_id']} no encontrado.")

            # 3. Añadir los campos de nombre al diccionario de inserción
            turno_data["paciente_nombre"] = paciente_doc.get("nombre", "Nombre no disponible")
            turno_data["medico_nombre"] = medico_doc.get("nombre", "Nombre no disponible")
            
            # 4. Insertar el documento desnormalizado
            turno_ingresado = self.collection.insert_one(turno_data) 
            
            return str(turno_ingresado.inserted_id)
        
        except DuplicateKeyError as e:
            # Captura la excepción de unicidad de MongoDB (fecha/hora)
            if "fecha_hora" in e.details['errmsg']:
                raise ValueError("El turno en la fecha y hora proporcionadas ya está registrado.") from e
            raise e
        except Exception as e:
            # Captura errores generales antes de que el controller lance 500
            raise e
    
    def obtener_todos(self) -> list:
            """Obtiene todos los turnos de la colección."""
            try:
                turnos = list(self.collection.find())
                for turno in turnos:
                    turno["_id"] = str(turno["_id"])
                return turnos
            except Exception as e:
                print(f"Error al obtener todos los turnos: {e}")
                return []
        
    def buscar_turno_por_id(self, turno_id: str) -> Optional[dict]:
        """Busca un turno por su ID."""
        try:
            turno = self.collection.find_one({"_id": ObjectId(turno_id)})
            if turno and "_id" in turno:
                turno["_id"] = str(turno["_id"])
                
            turno = {"_id": turno["_id"], **turno} 
            return turno
        except Exception as e:
            print(f"Error al buscar turno por ID: {e}")
            return None
    
    def buscar_turno_por_fechaHora(self, fecha: str, hora: str) -> dict:
        """Busca un turno por su fecha y hora."""
        
        try:
            turno = self.collection.find_one({"fecha": fecha, "hora": hora})
            if turno and "_id" in turno:
                turno["_id"] = str(turno["_id"])
                
            turno = {"_id": turno["_id"], **turno} 
            return turno
        except Exception as e:
            print(f"Error al buscar turno por fecha y hora: {e}")
            return None
    
    def actualizar_turno(self, turno_id: str, update_data: dict) -> bool:
        """Actualiza los datos de un turno existente."""
        try:
            resultado = self.collection.update_one(
                {"_id": ObjectId(turno_id)},
                {"$set": update_data}
            )
            return resultado.modified_count > 0 # Devuelve True si se modificó algún documento
        except Exception as e:
            print(f"Error al actualizar turno: {e}")
            return False

    def eliminar_turno(self, turno_id: str) -> bool:
        """Elimina un turno por su ID."""
        try:
            resultado = self.collection.delete_one({"_id": ObjectId(turno_id)})
            return resultado.deleted_count > 0 # Devuelve True si se eliminó algún documento
        except Exception as e:
            print(f"Error al eliminar turno: {e}")
            return False