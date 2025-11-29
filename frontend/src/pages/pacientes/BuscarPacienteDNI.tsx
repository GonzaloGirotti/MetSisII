// Pagina para buscar pacientes por DNI
import React from 'react';
import * as PacienteAPI from "../../api/pacienteApi";

export default function BuscarPacienteDNI() {

    const [dni, setDni] = React.useState("");
    const [paciente, setPaciente] = React.useState<any | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resultado = await PacienteAPI.getPacientePorDNI(dni);
            setPaciente(resultado);
        } catch {
            setPaciente(null);
        }
    };

    return (
        <div>
            <h2>Buscar Paciente por DNI</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Ingrese DNI" value={dni} onChange={(e) => setDni(e.target.value)} />
                <button type="submit">Buscar</button>
            </form>
            {paciente && (
                <div>
                    <h3>Datos del Paciente</h3>
                    <p>Nombre: {paciente.nombre}</p>
                    <p>DNI: {paciente.dni}</p>
                    <p>Edad: {paciente.edad}</p>
                    <p>Obra Social: {paciente.obra_social}</p>

                </div>
            )}
        </div>
    );
}