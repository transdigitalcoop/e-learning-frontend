import { CardRegister } from "../components/CardRegister";
import muñecoImage from "../../assets/images/MuñecoTransDigital.png";
import "../styles/Register.css";
export const Register = () => {
  return (
    <>
      <div className="Register-container">
        <CardRegister />
        <div className="dibujo">
          <img src={muñecoImage} alt="Muñeco" />
        </div>
      </div>
    </>
  );
};
