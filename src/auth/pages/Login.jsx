import "../styles/Login.css";
import Muñeco2 from "../../assets/images/MuñecoTransDigital2.webp";
import { CardLogin } from "../components/CardLogin";

export const Login = () => {
  return (
    <>
      <div className="Mainlogin">
        <CardLogin />
        <div className="dibujo2">
          <div className="nuevo">
            <h1>¿Eres nuevo?</h1>
            <p className="Myriad">
              ¡Registrate y empieza a aprender con nosotros!
            </p>
            <a href="/auth/register">Registrate ahora</a>
          </div>
          <img src={Muñeco2} alt="Muñeco2" />
        </div>
      </div>
    </>
  );
};
