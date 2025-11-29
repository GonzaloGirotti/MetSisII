import unittest
from unittest.mock import MagicMock, patch
from bson import ObjectId
from bson.errors import InvalidId 
from database.models.medico import MedicoModel

# --- CLASE DE PRUEBAS ---

class TestMedicoModelEliminar(unittest.TestCase):
    
    VALID_ID = str(ObjectId())

    def setUp(self):
        # 1. Configurar un mock de la colección y la DB
        self.mock_collection = MagicMock()
        self.mock_db = MagicMock(medicos=self.mock_collection)
        self.medico_model = MedicoModel(self.mock_db)

    # ----------------------------------------------------
    #  ESCENARIO 1: Eliminación Exitosa (1 Documento Eliminado)
    # ----------------------------------------------------
    def test_eliminar_medico_exitoso(self):
        # Simular que la operación eliminó 1 documento
        mock_result = MagicMock(deleted_count=1)
        self.mock_collection.delete_one.return_value = mock_result

        resultado = self.medico_model.eliminar_medico(self.VALID_ID)
        
        # 1. Verificar que se llamó a delete_one
        self.mock_collection.delete_one.assert_called_once()
        
        # 2. Verificar que el resultado es True
        self.assertTrue(resultado)

    # ----------------------------------------------------
    #  ESCENARIO 2: Médico No Encontrado (0 Documentos Eliminados)
    # ----------------------------------------------------
    def test_eliminar_medico_no_encontrado(self):
        # Simular que la operación eliminó 0 documentos
        mock_result = MagicMock(deleted_count=0)
        self.mock_collection.delete_one.return_value = mock_result

        resultado = self.medico_model.eliminar_medico(self.VALID_ID)
        
        # 1. Verificar que se llamó a delete_one
        self.mock_collection.delete_one.assert_called_once()
        
        # 2. Verificar que el resultado es False
        self.assertFalse(resultado)

    # ----------------------------------------------------
    #  ESCENARIO 3: Fallo por Formato de ID Inválido
    # ----------------------------------------------------
    def test_eliminar_medico_id_invalido(self):
                
        # Simular que la conversión ObjectId('id-corto') lanza InvalidId
        with patch('bson.ObjectId', side_effect=InvalidId):
            resultado = self.medico_model.eliminar_medico("id-corto")

        # 1. Verificar que el resultado es False (el try/except de la función lo captura)
        self.assertFalse(resultado)
        
        # 2. Verificar que delete_one *nunca* fue llamado (falló antes de la DB)
        self.mock_collection.delete_one.assert_not_called()


if __name__ == '__main__':
    unittest.main()