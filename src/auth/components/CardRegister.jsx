import "../styles/Cards.css";
import axios from "axios";
import { useState } from "react";
export const CardRegister = () => {
  const [formData, setFormData] = useState({
    nombre1: "",
    nombre2: "",
    apellido1: "",
    apellido2: "",
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
      .post("http://tu-backend-api.com/api/register", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return (
    <>
      <div className="Main-card">
        <h1>Crea tu cuenta</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id in quas
          deserunt cupiditate a earum laborum, amet voluptatibus sed sunt, nihil
        </p>
        <form className="form-register" onSubmit={handleSubmit}>
          <div className="name">
            <label>Primer Nombre:</label>
            <input type="text" onChange={handleChange} />
            <label>Segundo Nombre:</label>
            <input type="text" onChange={handleChange} />
            <label>Primer Apellido:</label>
            <input type="text" onChange={handleChange} />
            <label>Segundo Apellido:</label>
            <input type="text" onChange={handleChange} />
          </div>
          <div className="account">
            <label>Correo:</label>
            <input type="text" onChange={handleChange} />
            <label>Contraseña:</label>
            <input type="text" onChange={handleChange} />
            <label>Confirmar contraseña:</label>
            <input type="text" onChange={handleChange} />
          </div>
          <a href=""></a>
          <button action="">Registrarse</button>
        </form>
      </div>
    </>
  );
};
