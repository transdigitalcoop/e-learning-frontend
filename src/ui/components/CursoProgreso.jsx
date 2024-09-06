import "../../styles/CursoProgreso.css";
import { ClockIcon } from "@heroicons/react/24/solid";

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
          <div className="detailsContainer">
            <div className="detailItem">
              {/* <h1>Duración</h1> */}
              <ClockIcon className="icon" />
              <span className="text">
                {curso.horas}Horas y {curso.minutos} minutos
              </span>
            </div>
          </div>
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
