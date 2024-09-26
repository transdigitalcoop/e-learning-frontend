import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/ListaModu.css";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner"; // Importamos toast

export const ListaModu = ({ data, curso, onMouseEnterModulo, inscrito }) => {
  // Función para verificar si el usuario está inscrito antes de acceder al módulo
  const handleModuloClick = (e, moduloId) => {
    if (!inscrito) {
      e.preventDefault(); // Prevenir la navegación si no está inscrito
      toast.error(
        "Debes inscribirte en el curso antes de acceder a los módulos.",
        { className: "toast-w" }
      );
    }
  };

  return (
    <div className="mod">
      <div className="modnames animate-element">
        <div className="title">
          <h1>Módulos</h1>
        </div>
        <div className="listmod">
          <ul>
            {data.map((modulo) => (
              <li
                key={modulo.id}
                onMouseEnter={() => onMouseEnterModulo(modulo.descripcion)}
              >
                <Link
                  to={`/modulo/${modulo.uuid}`}
                  onClick={(e) => handleModuloClick(e, modulo.uuid)} // Verificamos inscripción al hacer clic
                >
                  {modulo.nombre}
                </Link>
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
      uuid: PropTypes.string.isRequired,
      descripcion: PropTypes.string,
    })
  ).isRequired,
  onMouseEnterModulo: PropTypes.func.isRequired,
  inscrito: PropTypes.bool.isRequired, // Asegúrate de que este prop sea pasado correctamente
};
