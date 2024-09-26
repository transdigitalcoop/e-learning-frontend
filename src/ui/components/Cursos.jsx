import "../../styles/Cursos.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CursosLoader from "./loaders/CursosLoader";

export const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/rutas`);
        setCursos(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1800);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  return (
    <>
      {loading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <div
              className="card-curso animate__animated animate__fadeIn"
              key={index}
            >
              <CursosLoader />
            </div>
          ))}
        </>
      ) : (
        cursos.map((curso, index) => (
          <div className="card-curso" key={index}>
            <div className="curso">
              <img
                src={`https://res.cloudinary.com/digqcdimk/image/upload/v1725315836/${curso.icono}`}
                alt={curso.nombre}
              />
              <h3>{curso.nombre}</h3>
              <Link to={`/curso/${curso.uuid}`}>Explorar</Link>
            </div>
          </div>
        ))
      )}
    </>
  );
};
