import "../styles/CardRegister.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

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
  const apiUrl = import.meta.env.VITE_API_URL;
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
      .post(`${apiUrl}/api/usuarios`, formData)
      .then(() => {
        toast.success("Registrado exitosamente!", {
          className: "toast-s",
        });
        navigate("/auth/");
      })
      .catch(() => {
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
          <p className="Myriad">
            Empieza tu nueva experiencia de aprendizaje con TransDigitalCoop
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
            <Link to="/auth/">¿Ya tienes cuenta? Inicia sesion aquí</Link>
            <button type="submit">Registrarse</button>
          </div>
        </form>
      </div>
    </>
  );
};
