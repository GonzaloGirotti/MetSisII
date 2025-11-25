import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/medicos">Médicos</Link>
      <Link to="/pacientes">Pacientes</Link>
      <Link to="/turnos">Turnos</Link>
    </nav>
  );
}
