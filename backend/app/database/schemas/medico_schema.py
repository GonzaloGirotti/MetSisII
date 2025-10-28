def medic_schema(medic) -> dict:
    return {
            "id": medic["id"],
            "nombre": medic["nombre"],
            "matricula": medic["matricula"],
            "especialidad": medic["especialidad"]
            }
    
def medics_schema(medics) -> list:
    return [medic_schema(medic) for medic in medics]