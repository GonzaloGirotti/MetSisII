import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/medicos">Médicos</Link>
      <Link to="/pacientes">Pacientes</Link>
    </nav>
  );
};

export default Navbar;
