from fastapi import FastAPI
from routes import medico_routes
from database.connection import db_client

app = FastAPI(title="API Médica")

async def startup_event():
    db_client()

@app.get("/")
async def root():
    return {"message": "BIENVENIDO A LA API DE MEDICOS!"}

app.include_router(medico_routes.router)
# app.include_router(paciente_routes.router)
# app.include_router(turno_routes.router)

if __name__ == "__main__":
    startup_event()
    import uvicorn
    uvicorn.run(
        "main:app",       
        host="localhost",
        port=8000,        # puerto
        reload=True       # reinicia automáticamente al modificar código
    )
