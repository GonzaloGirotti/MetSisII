def patient_schema(patient) -> dict:
    return {
            "id": patient["id"],
            "nombre": patient["nombre"],
            "edad": patient["edad"],
            "obra_social": patient["obra_social"]
            }
    
def patients_schema(patients) -> list:
    return [patient_schema(patient) for patient in patients]