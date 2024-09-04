import "../../styles/Cursos.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CursosLoader from "./loaders/CursosLoader";

export const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/rutas");
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

  const handleVerMas = (cursoId) => {
    navigate(`/curso/${cursoId}`);
  };

  return (
    <>
      {loading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <div className="card-curso" key={index}>
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
              <Link
                onClick={() => {
                  handleVerMas(curso.uuid);
                }}
              >
                Explorar
              </Link>
            </div>
          </div>
        ))
      )}
    </>
  );
};
