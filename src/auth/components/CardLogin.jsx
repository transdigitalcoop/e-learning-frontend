import "../styles/CardLogin.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
export const CardLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });

  const { login } = useAuth(); // Obtén la función login del contexto
  const navigate = useNavigate(); // Hook para redirigir
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
      .then(() => {
        toast.success("Sesión iniciada con éxito!", { className: "toast-s" });
        login();
        navigate("/");
      })
      .catch(() => {
        toast.error("Error al iniciar sesión, verifica tus credenciales", {
          className: "toast-e",
        });
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
            <input
              type="email"
              placeholder="Correo electronico"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="redirect">
            <Link to="/auth/" className="Myriad boton">
              Olvide mi contraseña
            </Link>
            <button type="submit" className="Cascadia boton">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
