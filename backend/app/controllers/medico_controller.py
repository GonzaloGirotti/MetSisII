'''
Controlador:
- Sigue el patron de arquitectura MVC (modelo-vista-controlador).
- Intermediario entre el modelo y la vista, recibiendo datos del modelo y transformandolos para pasarlos a la vista.
'''


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