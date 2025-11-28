import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLogged, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>

      {isLogged && (
        <>
          {" | "}
          <Link to="/medicos">Médicos</Link>
          {" | "}
          <Link to="/pacientes">Pacientes</Link>
          {" | "}
          <Link to="/turnos">Turnos</Link>
        </>
      )}

      {isLogged ? (
        <button onClick={logout} style={{ marginLeft: "20px" }}>
          Logout
        </button>
      ) : (
        <Link to="/login" style={{ marginLeft: "20px" }}>
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
