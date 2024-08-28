import "../styles/CardLogin.css";

export const CardLogin = () => {
  return (
    <>
      <div className="card-login">
        <div className="title">
          <h1>Iniciar Sesión</h1>
          <p className="Myriad">
            Inicia sesion para iniciar tu ruta con TransDigitalCoop
          </p>
        </div>
        <form className="form-login">
          <div className="account Myriad">
            <input type="email" placeholder="Correo electronico" required />
            <input type="password" placeholder="Contraseña" required />
          </div>
          <div className="redirect">
            <a href="auth/register" className="Myriad">
              Olvide mi contraseña
            </a>
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </>
  );
};
