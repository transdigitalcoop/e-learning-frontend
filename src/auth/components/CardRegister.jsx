import "../styles/CardRegister.css";
import axios from "axios";
import { useState } from "react";
export const CardRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
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
      .post("http://127.0.0.1:8000/api/usuarios", formData)
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
            <div className="inputs">
              <label>Primer Nombre:</label>
              <input type="text" onChange={handleChange} name="name" required />
            </div>
            <div className="inputs">
              <label>Segundo Nombre:</label>
              <input
                type="text"
                onChange={handleChange}
                name="segundo_nombre"
                required
              />
            </div>
            <div className="inputs">
              <label>Primer Apellido:</label>
              <input
                type="text"
                onChange={handleChange}
                name="primer_apellido"
                required
              />
            </div>
            <div className="inputs">
              <label>Segundo Apellido:</label>
              <input
                type="text"
                onChange={handleChange}
                name="segundo_apellido"
                required
              />
            </div>
          </div>
          <div className="account">
            <label>Correo:</label>
            <input type="email" onChange={handleChange} name="email" required />
            <label>Contraseña:</label>
            <input
              type="password"
              onChange={handleChange}
              name="contraseña"
              required
            />
            <label>Confirmar contraseña:</label>
            <input type="text" onChange={handleChange} required />
          </div>
          <a href=""></a>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </>
  );
};
