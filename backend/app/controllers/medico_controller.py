medics_list = []

def get_medics():
    return medics_list

def search_medic(id: int):
    medics = filter(lambda medic: medic.id == id, medics_list)
    try:
        return list(medics)[0]
    except:
        return {"error": "No se encontró al médico."}
    
def add_medic(medico):
    medics_list.append(medico)
    
def delete_medic(medico):
    medics_list.remove(medico)