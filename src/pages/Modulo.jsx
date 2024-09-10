import { useParams, Link } from "react-router-dom";
import "../styles/Modulo.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

export const Modulo = () => {
  const { id } = useParams();
  const [modulo, setModulo] = useState(null); // Estado para los datos del módulo
  const [lecciones, setLecciones] = useState([]); // Estado para las lecciones
  const [descripcion, setDescripcion] = useState(""); // Estado para la descripción de la lección

  useEffect(() => {
    const fetchModuloDetalle = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/modulo/${id}`
        );
        console.log(response);

        // Guardamos el modulo y las lecciones en el estado
        setModulo(response.data.modulos);
        setLecciones(response.data.lecciones);
      } catch (error) {
        console.error("Error al obtener los detalles del módulo:", error);
        console.error(
          "Detalles del error:",
          error.response ? error.response.data : "No response data"
        );
      }
    };
    fetchModuloDetalle();
  }, [id]);

  return (
    <>
      <nav className="sidebar">
        <ul className="dashboard">
          {lecciones.length > 0 ? (
            lecciones.map((leccion) => (
              <li
                key={leccion.id}
                // onMouseEnter={() => onMouseEnterLeccion(leccion.descripcion)} // Muestra la descripción al pasar el mouse
              >
                <Link to={`/modulo/${id}/leccion/${leccion.uuid}`}>
                  {leccion.nombre}
                  <ArrowRightCircleIcon className="Icono-arrow" />
                </Link>
              </li>
            ))
          ) : (
            <p>No hay lecciones disponibles.</p>
          )}
        </ul>
      </nav>
    </>
  );
};
