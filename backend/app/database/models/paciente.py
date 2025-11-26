from pydantic import BaseModel
from typing import Optional

class Paciente(BaseModel):
    id: Optional[int] = None
    nombre: str
    edad: int
    dni: int
    obra_social: str
    
