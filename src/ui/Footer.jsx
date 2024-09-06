import "../styles/Footer.css";
import Icono from "../assets/icons/IconoTr.png";
import { useAuth } from "../auth/hooks/useAuth";
export const Footer = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && (
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-logo">
              <img className="logo" src={Icono} alt="Transdigital logo" />
            </div>
            <div className="footer-info">
              <p>TransdigitalCoop</p>
              <p>© 2024 TransdigitalCoop. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      )}
      {/* <div className="footer-social">
            <a
              href="https://www.facebook.com/transdigital"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://i.ibb.co/7y8wL8w/facebook.png"
                alt="Facebook logo"
              />
            </a>
            <a
              href="https://www.instagram.com/transdigital"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://i.ibb.co/7y8wL8w/facebook.png"
                alt="Instagram logo"
              />
            </a>
            <a
              href="https://www.twitter.com/transdigital"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://i.ibb.co/7y8wL8w/facebook.png"
                alt="Twitter logo"
              />
            </a>
          </div> */}
    </>
  );
};
