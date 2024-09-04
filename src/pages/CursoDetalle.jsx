import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ArticleSkeleton from "../ui/components/Loaders/ArticleSkeleton";
import "../styles/CursoDetalle.css";
import { ListaModu } from "../ui/components/ListaModu";
export const CursoDetalle = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursoDetalle = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/cursos/${id}`
        );
        setCurso(response.data.curso);
        setData(response.data.modulos);
        setTimeout(() => {
          setLoading(false);
        }, 1800);
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
        console.error(
          "Detalles del error:",
          error.response ? error.response.data : "No response data"
        );
        setLoading(false);
      }
    };

    fetchCursoDetalle();
  }, [id]);
  console.log(data);
  return (
    <>
      {loading ? (
        <ArticleSkeleton />
      ) : (
        <div className="detalle-cont">
          <section className="CursoDetalle">
            <div className="curso">
              <div className="img">
                <img
                  src={`https://res.cloudinary.com/digqcdimk/image/upload/v1725315836/${curso.icono}`}
                  alt={curso.nombre}
                />
              </div>
              <div className="cont">
                <h2>Transformación digital</h2>
                <h1>{curso.nombre}</h1>
                <p className="Myriad">{curso.descripcion}</p>
              </div>
            </div>
            <div className="curso-progress">
              <div className="cardp">
                <h2>Progreso</h2>
                <progress
                  value={curso.progress}
                  max="100"
                  className="progress-bar"
                ></progress>
              </div>
            </div>
          </section>
          <section className="CursoContenido">
            <div className="infoMod"></div>
            <ListaModu data={data} curso={curso} />
          </section>
        </div>
      )}
    </>
  );
};
