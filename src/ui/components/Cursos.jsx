import "../../styles/Cursos.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";

export const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/rutas");
        setCursos(response.data);
        // Simula una pequeña demora adicional
        setTimeout(() => {
          setLoading(false);
        }, 1800); // Aumenta el tiempo para simular el tiempo de carga
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  return (
    <section className="Cursos">
      <h1>Contenidos por explorar</h1>
      <div className="contenido">
        {loading ? (
          <CursosLoader />
        ) : (
          cursos.map((curso, index) => (
            <div className="card-curso" key={index}>
              <div className="curso">
                <img
                  src={`http://127.0.0.1:8000/storage/${curso.icono}`}
                  alt={curso.nombre}
                />
                <h2>{curso.nombre}</h2>
                <a href={curso.enlace}>Explorar</a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

const CursosLoader = (props) => (
  <ContentLoader
    speed={2}
    width={340}
    height={84}
    viewBox="0 0 340 84"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
    <rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
    <rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
    <rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
    <rect x="18" y="48" rx="3" ry="3" width="100" height="11" />
    <rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
    <rect x="18" y="23" rx="3" ry="3" width="140" height="11" />
    <rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
  </ContentLoader>
);
