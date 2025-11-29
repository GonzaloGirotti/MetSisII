import unittest
from unittest.mock import MagicMock, patch
from bson import ObjectId
from bson.errors import InvalidId # Para manejar errores de formato de ID
from database.models.paciente import PacienteModel


# --- CLASE DE PRUEBAS ---

class TestPacienteModelActualizar(unittest.TestCase):
    
    VALID_ID = str(ObjectId())
    UPDATE_DATA = {"nombre": "Carlos Alberto", "telefono": "555-1234"}

    def setUp(self):
        # 1. Configurar un mock de la colección y la DB
        self.mock_collection = MagicMock()
        self.mock_db = MagicMock(pacientes=self.mock_collection)
        self.paciente_model = PacienteModel(self.mock_db)

    # ----------------------------------------------------
    #  ESCENARIO 1: Actualización Exitosa (Documento Modificado)
    # ----------------------------------------------------
    def test_actualizar_paciente_exitoso(self):
        # Simular que la operación modificó 1 documento
        mock_result = MagicMock(modified_count=1)
        self.mock_collection.update_one.return_value = mock_result

        resultado = self.paciente_model.actualizar_paciente(self.VALID_ID, self.UPDATE_DATA)
        
        # 1. Verificar que se llamó a update_one
        self.mock_collection.update_one.assert_called_once()
        
        # 2. Verificar que el resultado es True
        self.assertTrue(resultado)

    # ----------------------------------------------------
    #  ESCENARIO 2: Paciente No Encontrado (0 Documentos Modificados)
    # ----------------------------------------------------
    def test_actualizar_paciente_no_encontrado(self):
        # Simular que la operación modificó 0 documentos
        mock_result = MagicMock(modified_count=0)
        self.mock_collection.update_one.return_value = mock_result

        resultado = self.paciente_model.actualizar_paciente(self.VALID_ID, self.UPDATE_DATA)
        
        # 1. Verificar que se llamó a update_one
        self.mock_collection.update_one.assert_called_once()
        
        # 2. Verificar que el resultado es False
        self.assertFalse(resultado)

    # ----------------------------------------------------
    #  ESCENARIO 3: Fallo por Formato de ID Inválido
    # ----------------------------------------------------
    @patch('bson.ObjectId')
    def test_actualizar_paciente_id_invalido(self, MockObjectId):
        # Simular que ObjectId() lanza InvalidId al recibir la string
        MockObjectId.side_effect = InvalidId("ID string malformado")
        
        # Ejecutar la función con un ID inválido (como 'id-corto')
        resultado = self.paciente_model.actualizar_paciente("id-corto", self.UPDATE_DATA)

        # 1. Verificar que la función devolvió False (capturando la excepción)
        self.assertFalse(resultado)
        
        # 2. Verificar que update_one *nunca* fue llamado (falló antes)
        self.mock_collection.update_one.assert_not_called()


if __name__ == '__main__':
    unittest.main()