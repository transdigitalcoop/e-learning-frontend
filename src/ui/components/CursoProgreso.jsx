import "../../styles/CursoProgreso.css";
export const CursoProgreso = ({ curso }) => {
  return (
    <>
      <div className="curso-progress">
        <div className="cardp">
          <div className="progre">
            <h1 className="Cascadia">Progreso</h1>
            <div className="barra">
              <progress
                value={curso.progreso}
                max="100"
                className="progress-bar"
              ></progress>
              <p>{curso != null ? curso.progreso : "0"}%</p>
            </div>
          </div>
          <div className="duracion"></div>
          <div className="boton">
            <button>
              <h1>Continuar</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
