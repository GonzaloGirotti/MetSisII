from fastapi import FastAPI
from routes import medico_routes
from database.connection import *

app = FastAPI(title="API Médica")

@app.get("/")
async def root():
    return {"message": "BIENVENIDO A LA API DE MEDICOS!"}

app.include_router(medico_routes.router)
# app.include_router(paciente_routes.router)
# app.include_router(turno_routes.router)
