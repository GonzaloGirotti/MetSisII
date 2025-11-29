import unittest
from unittest.mock import MagicMock, patch
from bson import ObjectId
from bson.errors import InvalidId
from pymongo.errors import DuplicateKeyError
from database.models.turno import TurnoModel



class TestTurnoModelSimple(unittest.TestCase):
    
    VALID_OID = str(ObjectId())
    NUEVO_ID = str(ObjectId())
    BASE_DATA = {
        "fecha": "2025-12-25",
        "hora": "10:00",
        "medico_id": VALID_OID,
        "paciente_id": VALID_OID,
    }
    
    def setUp(self):
        # Configuración básica de mocks
        self.mock_db = MagicMock()
        self.turno_model = TurnoModel(self.mock_db)

    # ----------------------------------------------------
    # ESCENARIO 1: Creación Exitosa
    # ----------------------------------------------------
    def test_crear_turno_exitoso(self):
        # 1. Configurar Mocks de Éxito
        self.mock_db.pacientes.find_one.return_value = {"_id": ObjectId(self.VALID_OID), "nombre": "Laura"}
        self.mock_db.medicos.find_one.return_value = {"_id": ObjectId(self.VALID_OID), "nombre": "Dr. Juan"}
        self.mock_db.turnos.insert_one.return_value = MagicMock(inserted_id=ObjectId(self.NUEVO_ID))

        # 2. Ejecutar
        result_id = self.turno_model.crear_turno(self.BASE_DATA.copy())
        
        # 3. Afirmar (Assert)
        self.assertEqual(result_id, self.NUEVO_ID)
        
        # Opcional: Verificar que los nombres se incluyeron en la inserción
        inserted_doc = self.mock_db.turnos.insert_one.call_args[0][0]
        self.assertIn("paciente_nombre", inserted_doc)
        self.assertEqual(inserted_doc["medico_nombre"], "Dr. Juan")

    # ----------------------------------------------------
    # ESCENARIO 2: Formato de ID Inválido
    # ----------------------------------------------------
    def test_crear_turno_id_invalido(self):
        data = self.BASE_DATA.copy()
        data["paciente_id"] = "id-corto" # ID no válido
        
        # No necesitamos configurar find_one/insert_one porque fallará en la conversión
        
        with self.assertRaisesRegex(ValueError, "El formato de ID de paciente o médico es inválido."):
            self.turno_model.crear_turno(data)

    # ----------------------------------------------------
    # ESCENARIO 3: Recurso No Encontrado (Médico)
    # ----------------------------------------------------
    def test_crear_turno_medico_no_encontrado(self):
        # 1. Configurar Mocks: Paciente OK, Médico NONE
        self.mock_db.pacientes.find_one.return_value = {"_id": ObjectId(self.VALID_OID), "nombre": "Laura"}
        self.mock_db.medicos.find_one.return_value = None # Médico no existe

        # 2. Ejecutar y Afirmar
        with self.assertRaisesRegex(ValueError, "Médico con ID .* no encontrado."):
            self.turno_model.crear_turno(self.BASE_DATA.copy())
            
    # ----------------------------------------------------
    # ESCENARIO 4: Duplicidad de Turno
    # ----------------------------------------------------
    def test_crear_turno_duplicado(self):
        # 1. Configurar Mocks: Todo OK para la búsqueda, pero Falla en la inserción
        self.mock_db.pacientes.find_one.return_value = {"_id": ObjectId(self.VALID_OID), "nombre": "Laura"}
        self.mock_db.medicos.find_one.return_value = {"_id": ObjectId(self.VALID_OID), "nombre": "Dr. Juan"}

        # 2. Simular el error de MongoDB
        mock_error = DuplicateKeyError("Duplicidad de llave", details={'errmsg': 'idx_fecha_hora_unique'})
        self.mock_db.turnos.insert_one.side_effect = mock_error

        # 3. Ejecutar y Afirmar
        with self.assertRaisesRegex(ValueError, "El turno en la fecha y hora proporcionadas ya está registrado."):
            self.turno_model.crear_turno(self.BASE_DATA.copy())

if __name__ == '__main__':
    unittest.main()