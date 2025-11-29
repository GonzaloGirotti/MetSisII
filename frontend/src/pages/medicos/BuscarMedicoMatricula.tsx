// Pagina para buscar medicos por MATRICULA
import React from 'react';
import * as MedicoAPI from "../../api/medicoApi";

export default function BuscarMedicoMatricula() {

    const [matricula, setMatricula] = React.useState("");
    const [medico, setMedico] = React.useState<any | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resultado = await MedicoAPI.getMedicoByMatricula(matricula);
            setMedico(resultado);
        } catch {
            setMedico(null);
        }
    };

    return (
        <div>
            <h2>Buscar Medico por Matricula</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Ingrese Matricula" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
                <button type="submit">Buscar</button>
            </form>
            {medico && (
                <div>
                    <h3>Datos del medico</h3>
                    <p>Nombre: {medico.nombre}</p>
                    <p>Matricula: {medico.matricula}</p>
                    <p>Especialidad: {medico.especialidad}</p>

                </div>
            )}
        </div>
    );
}