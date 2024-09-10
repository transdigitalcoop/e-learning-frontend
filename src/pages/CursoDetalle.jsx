import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CursoDetalle.css";
import { ListaModu } from "../ui/components/ListaModu";
import { CursoProgreso } from "../ui/components/CursoProgreso";
import { InfoModu } from "../ui/components/InfoModu";
import CursoSkeleton from "../ui/components/loaders/CursoSkeleton";

export const CursoDetalle = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [modulo, setModulo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [descripcionModulo, setDescripcionModulo] = useState(""); // Nuevo estado

  useEffect(() => {
    const fetchCursoDetalle = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/cursos/${id}`
        );
        setCurso(response.data.curso);
        setModulo(response.data.modulos);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
        setLoading(false);
      }
    };
    fetchCursoDetalle();
  }, [id]);

  // Función para actualizar la descripción del módulo
  const handleMouseEnter = (descripcion) => {
    setDescripcionModulo(descripcion);
  };

  return (
    <>
      {loading ? (
        <CursoSkeleton />
      ) : (
        <div className="detalle-cont animate__animated animate__fadeIn animate__faster">
          <section className="CursoDetalle">
            <div className="curso">
              <div className="img">
                <img
                  src={`https://res.cloudinary.com/digqcdimk/image/upload/v1725315836/${curso.icono}`}
                  alt={curso.nombre}
                />
              </div>
              <div className="cont">
                <h1>{curso.nombre}</h1>
                <p className="Cascadia">{curso.descripcion}</p>
              </div>
            </div>
            <CursoProgreso curso={curso} modulo={modulo} />
          </section>
          <section className="CursoContenido">
            <InfoModu descripcion={descripcionModulo} />{" "}
            {/* Pasar la descripción */}
            <ListaModu
              data={modulo}
              curso={curso}
              onMouseEnterModulo={handleMouseEnter} // Pasar la función de manejo del mouse
            />
          </section>
        </div>
      )}
    </>
  );
};
