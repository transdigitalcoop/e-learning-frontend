import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider"; // Verifica la ruta

export const useAuth = () => useContext(AuthContext);