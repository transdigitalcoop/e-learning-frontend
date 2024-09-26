import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/CursoDetalle.css";
import { ListaModu } from "../ui/components/ListaModu";
import { CursoProgreso } from "../ui/components/CursoProgreso";
import { InfoModu } from "../ui/components/InfoModu";
import CursoSkeleton from "../ui/components/loaders/CursoSkeleton";
import { AuthContext } from "../context/AuthProvider";

export const CursoDetalle = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [modulo, setModulo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [descripcionModulo, setDescripcionModulo] = useState("");
  const { uuid } = useContext(AuthContext); // Obtener el UUID del usuario
  const [inscrito, setInscrito] = useState(false); // Estado para manejar la inscripción
  const apiUrl = import.meta.env.VITE_API_URL;
  // Cargar detalles del curso y verificar si el usuario ya está inscrito
  useEffect(() => {
    const fetchCursoDetalle = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/cursos/${id}`);
        setCurso(response.data.curso);
        setModulo(response.data.modulos);
        setLoading(false);

        // Verificar si el usuario ya está inscrito en el curso
        const inscritoEnCurso = localStorage.getItem(
          `inscripcion_${id}_${uuid}`
        );
        setInscrito(inscritoEnCurso === "true");
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
        setLoading(false);
      }
    };
    fetchCursoDetalle();
  }, [id, uuid]);

  const handleMouseEnter = (descripcion) => {
    setDescripcionModulo(descripcion);
  };

  // Función para manejar la inscripción desde CursoProgreso
  const handleInscripcion = () => {
    setInscrito(true); // Actualizar el estado de inscripción en el componente padre
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
            {/* Pasamos la función de inscripción y el estado inscrito */}
            <CursoProgreso
              curso={curso}
              modulo={modulo}
              usuarioId={uuid}
              inscrito={inscrito} // Pasamos el estado de inscripción actual
              onInscribir={handleInscripcion} // Pasamos la función que actualiza la inscripción
            />
          </section>
          <section className="CursoContenido">
            <InfoModu descripcion={descripcionModulo} />
            {/* Pasamos el estado de inscripción a ListaModu */}
            <ListaModu
              data={modulo}
              curso={curso}
              onMouseEnterModulo={handleMouseEnter}
              inscrito={inscrito} // Aseguramos que el estado actualizado se pase
            />
          </section>
        </div>
      )}
    </>
  );
};
