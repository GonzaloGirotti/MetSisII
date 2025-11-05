patients_list = []

def get_patients():
    return patients_list

def search_patient(id: int):
    patients = filter(lambda patient: patient.id == id, patients_list)
    try:
        return list(patients)[0]
    except:
        return {"error": "No se encontró al paciente."}
    
def add_patient(paciente):
    patients_list.append(paciente)
    
def delete_patient(paciente):
    patients_list.remove(paciente)