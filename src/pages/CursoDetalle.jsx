import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ArticleSkeleton from "../ui/components/ArticleSkeleton";

export const CursoDetalle = () => {
  const { id } = useParams(); // Obtiene el id del curso desde la URL
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursoDetalle = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/cursos/${id}`
        );
        setCurso(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1800);
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
        setLoading(false);
      }
    };

    fetchCursoDetalle();
  }, [id]);

  return (
    <>
      {loading ? (
        <ArticleSkeleton />
      ) : (
        <section className="CursoDetalle">
          <h1>{curso.nombre}</h1>
          <img
            src={`http://127.0.0.1:8000/storage/${curso.icono}`}
            alt={curso.nombre}
          />
          <p>{curso.descripcion}</p>
        </section>
      )}
    </>
  );
};
