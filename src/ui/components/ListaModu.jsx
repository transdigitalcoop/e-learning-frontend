import PropTypes from "prop-types";
import "../../styles/ListaModu.css";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
export const ListaModu = ({ data, curso }) => {
  return (
    <div className="mod">
      <div className="modnames">
        <div className="title">
          <h1>Modulos</h1>
        </div>
        <div className="listmod">
          <h2>{curso.nombre}</h2>
          <ul>
            {data.map((modulo) => (
              <li key={modulo.id}>
                <a href="">{modulo.nombre}</a>
                <ArrowRightCircleIcon className="Icono-arrow" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ListaModu.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
};
