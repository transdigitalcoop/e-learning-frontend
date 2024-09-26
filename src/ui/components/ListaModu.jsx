import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/ListaModu.css";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

export const ListaModu = ({ data, curso, onMouseEnterModulo }) => {
  useEffect(() => {
    // Selecciona todos los elementos que deben ser animados
    const elements = document.querySelectorAll(".animate-element");

    // Configura el IntersectionObserver
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // Aplica la animación cuando el elemento es visible y el scroll es hacia abajo
            entry.target.classList.add(
              "animate__animated",
              "animate__slideInUp"
            );
            // Deja de observar el elemento una vez que ha sido animado
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    ); // Se activa cuando el 10% del elemento es visible

    // Observa todos los elementos seleccionados
    elements.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup: Deja de observar cuando el componente se desmonta
    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);
  return (
    <div className="mod">
      <div className="modnames animate-element">
        <div className="title">
          <h1>Módulos</h1>
        </div>
        <div className="listmod">
          {/* <h2>{curso.nombre}</h2> */}
          <ul>
            {data.map((modulo) => (
              <li
                key={modulo.id}
                onMouseEnter={() => onMouseEnterModulo(modulo.descripcion)}
              >
                <Link to={`/modulo/${modulo.uuid}`}>{modulo.nombre}</Link>
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
      descripcion: PropTypes.string, // Asegúrate de que la descripción esté disponible
    })
  ).isRequired,
  onMouseEnterModulo: PropTypes.func.isRequired, // La función para manejar el evento
};
