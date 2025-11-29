import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLogged: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Usuario admin simulado
const ADMIN_USER = {
  username: "admin",
  password: "1234",
};

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }: any) => {
  const [isLogged, setIsLogged] = useState<boolean>(
    sessionStorage.getItem("isLogged") === "true"
  );

  // Función de login simulada, verifica contra el usuario admin
  const login = (user: string, pass: string) => {
    if (user === ADMIN_USER.username && pass === ADMIN_USER.password) {
      setIsLogged(true);
      sessionStorage.setItem("isLogged", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLogged(false);
    sessionStorage.removeItem("isLogged");
  };


  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
