import "../../styles/Cursos.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Iconop from "../../assets/icons/Icono.png";
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
                src={Iconop}
                // src={`http://127.0.0.1:8000/storage/${curso.icono}`}
                // alt={curso.nombre}
              />
              <h3>{curso.nombre}</h3>
              <a
                onClick={() => {
                  handleVerMas(curso.uuid);
                }}
              >
                Explorar
              </a>
            </div>
          </div>
        ))
      )}
    </>
  );
};
