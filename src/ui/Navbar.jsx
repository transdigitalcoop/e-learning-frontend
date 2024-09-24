import "../styles/Navbar.css";
import logo from "../assets/images/Transdigital.png";
import avatar from "../assets/icons/avatar.png";
import { useAuth } from "../auth/hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth(); // Obtén la función de logout del contexto

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    window.location.href = "/";
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav
        className={
          !isAuthenticated ? `Nav-maincontainer` : `Nav-maincontainer shad`
        }
      >
        <img src={logo} alt="Transdigital logo" />
        {isAuthenticated && ( // Muestra estas opciones solo si el usuario está autenticado
          <ul className="Nav-options">
            <div className={`menu ${menuOpen ? "open" : ""}`}>
              <li>
                <Link to="/">Mi aprendizaje</Link>
              </li>
              <li>
                <Link to="/content">Contenidos</Link>
              </li>
              <li>
                <Link to="/profile">Perfil</Link>
              </li>
              <li>
                <Link to="">
                  <img src={avatar} alt="" onClick={handleLogout} />
                </Link>
              </li>
            </div>
            <li className="menu-icon" onClick={toggleMenu}>
              ☰
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};
