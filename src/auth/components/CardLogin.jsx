import "../styles/CardLogin.css";
import axios from "axios";
import { useState } from "react";
export const CardLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/logear", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };
  return (
    <>
      <div className="card-login">
        <div className="title">
          <h1>Iniciar Sesión</h1>
          <p className="Myriad">
            Inicia sesion para iniciar tu ruta con TransDigitalCoop
          </p>
        </div>
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="account Myriad">
            <input type="email" placeholder="Correo electronico" name="email" onChange={handleChange} required />
            <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} required />
          </div>
          <div className="redirect">
            <a href="/auth/" className="Myriad">
              Olvide mi contraseña
            </a>
            <button type="submit" className="Cascadia">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
