import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/medicos" style={{ marginRight: "15px" }}>
        Médicos
      </Link>

      <Link to="/pacientes">Pacientes</Link>
    </div>
  );
};

export default Navbar;
