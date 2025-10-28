from pydantic import BaseModel
from typing import Optional

class Medico(BaseModel):
    id: Optional[int] = None
    nombre: str
    matricula: int
    especialidad: str
    
