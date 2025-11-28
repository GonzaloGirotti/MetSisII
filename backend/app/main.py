from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import medico_routes, paciente_routes
from database.connection import db_client

app = FastAPI(title="API Médica")

async def startup_event():
    db_client()

@app.get("/")
async def root():
    return {"message": "BIENVENIDO A LA API DE MEDICOS!"}

app.include_router(medico_routes.router)
app.include_router(paciente_routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     # o ["http://localhost:5173", "https://tuweb.com"]
    allow_credentials=True,
    allow_methods=["*"],     # <--- necesario para OPTIONS
    allow_headers=["*"],     # <--- necesario para JSON
)

if __name__ == "__main__":
    startup_event()
    import uvicorn
    uvicorn.run(
        "main:app",       
        host="localhost",
        port=8000,        # puerto
        reload=True       # reinicia automáticamente al modificar código
    )
