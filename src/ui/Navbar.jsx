import "../styles/Navbar.css";
import logo from "../assets/images/Transdigital.png";
import avatar from "../assets/icons/avatar.png";
import { useAuth } from "../auth/hooks/useAuth";
import { useState } from "react";

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
      <nav className="Nav-maincontainer">
        <img src={logo} alt="Transdigital logo" />
        {isAuthenticated && ( // Muestra estas opciones solo si el usuario está autenticado
          <ul className="Nav-options">
            <li className="menu-icon" onClick={toggleMenu}>
              ☰
            </li>
            <div className={`menu ${menuOpen ? "open" : ""}`}>
              <li>
                <a href="/learning">Mi aprendizaje</a>
              </li>
              <li>
                <a href="/content">Contenidos</a>
              </li>
              <li>
                <a href="/profile">Perfil</a>
              </li>
              <li>
                <a href="">
                  <img src={avatar} alt="" onClick={handleLogout} />
                </a>
              </li>
            </div>
          </ul>
        )}
      </nav>
    </>
  );
};
