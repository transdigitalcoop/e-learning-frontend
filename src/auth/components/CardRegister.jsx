import "../styles/CardRegister.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export const CardRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    email: "",
    password: "",
    confirmar_contraseña: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación de contraseñas
    if (formData.password !== formData.confirmar_contraseña) {
      toast.error("Las contraseñas no coinciden", {
        className: "toast-e",
      });
      return; // Detiene la ejecución si las contraseñas no coinciden
    }
    axios
      .post("http://127.0.0.1:8000/api/usuarios", formData)
      .then((response) => {
        console.log(response.data);
        toast.success("Registrado exitosamente!", {
          className: "toast-s",
        });
        navigate("/auth/");
      })
      .catch((error) => {
        console.error(error.response.data);
        toast.error("Error al registrarse, intenta nuevamente", {
          className: "toast-e",
        });
      });
  };

  return (
    <>
      <div className="Main-card">
        <div className="titulo-desc">
          <h1>Crea tu cuenta</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id in quas
            deserunt cupiditate a earum laborum, amet voluptatibus sed sunt,
            nihil
          </p>
        </div>
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
              name="password"
              required
            />
            <label>Confirmar contraseña:</label>
            <input
              type="password"
              onChange={handleChange}
              name="confirmar_contraseña"
              required
            />
          </div>
          <div className="redirect">
            <a href="/auth/">¿Ya tienes cuenta? Inicia sesion aquí</a>
            <button type="submit">Registrarse</button>
          </div>
        </form>
      </div>
    </>
  );
};
