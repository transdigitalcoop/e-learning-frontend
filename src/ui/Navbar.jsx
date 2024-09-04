import "../styles/Navbar.css";
import logo from "../assets/images/Transdigital.png";
import avatar from "../assets/icons/avatar.png";
import { useAuth } from "../auth/hooks/useAuth";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { useState } from "react";
>>>>>>> e07ca7e3caebb32cdf9765a79a95e53eeeefe73f

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
<<<<<<< HEAD
            <li>
              <Link to="/leLinkrning">Mi aprendizaje</Link>
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
=======
            <li className="menu-icon" onClick={toggleMenu}>
              ☰
>>>>>>> e07ca7e3caebb32cdf9765a79a95e53eeeefe73f
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
