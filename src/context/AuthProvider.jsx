import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("token") !== null;
  });

  const [uuid, setUuid] = useState(() => {
    return localStorage.getItem("uuid"); // Obtenemos el UUID del usuario almacenado
  });

  const login = (token, userUuid) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token); // Guardamos el token en localStorage
    localStorage.setItem("uuid", userUuid); // Guardamos el UUID del usuario
    setUuid(userUuid); // Actualizamos el UUID en el estado
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("uuid"); // Eliminamos el UUID del usuario al hacer logout
    setUuid(null); // Reseteamos el UUID
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, uuid }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };
