import { useParams, useNavigate } from "react-router-dom";
import "../styles/Modulo.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  ArrowRightCircleIcon,
  VideoCameraIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { CursosDropdown } from "../ui/components/CursosDropDown";
import ModuloLessonsLoader from "../ui/components/loaders/ModuloLessonsLoader";
import { Video } from "../ui/components/Video";
import { AuthContext } from "../context/AuthProvider";

export const Modulo = () => {
  const { id } = useParams(); // Obtener el ID del módulo desde los params
  const [modulo, setModulo] = useState(null);
  const [curso, setCurso] = useState(null);
  const [lecciones, setLecciones] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoadingLecciones, setIsLoadingLecciones] = useState(true);
  const [modulos, setModulos] = useState([]);
  const { uuid } = useContext(AuthContext); // Obtenemos el UUID del usuario desde el contexto
  const navigate = useNavigate();

  // Obtener el detalle del módulo actual
  const fetchModuloDetalle = async (moduloId) => {
    setIsLoadingLecciones(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${apiUrl}/api/modulo/${moduloId}`);
      setModulo(response.data.modulo || []);
      setCurso(response.data.curso);
      setLecciones(response.data.lecciones);
      setCurrentVideoIndex(0);
      setIsLoadingLecciones(false);
    } catch (error) {
      console.error("Error al obtener los detalles del módulo:", error);
      setIsLoadingLecciones(false);
    }
  };

  // Completar el módulo actual
  const CompletarModulo = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      // Hacemos la petición con el UUID del usuario
      const response = await axios.post(
        `${apiUrl}/api/${uuid}/modulos/${modulo.uuid}/completar`
      );

      const siguienteModuloId = response.data.siguiente_modulo_id;

      if (siguienteModuloId) {
        // Redirigir al siguiente módulo si existe
        navigate(`/modulo/${siguienteModuloId}`);
        fetchModuloDetalle(siguienteModuloId); // Cargar el siguiente módulo
      } else {
        console.log("No hay más módulos disponibles.");
      }
    } catch (error) {
      console.error("Error al completar el módulo:", error);
    }
  };

  useEffect(() => {
    fetchModuloDetalle(id); // Cargar el módulo inicial
  }, [id]);

  const handleNextVideo = () => {
    if (currentVideoIndex < lecciones.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      CompletarModulo(); // Completar el módulo actual y cargar el siguiente
    }
  };

  const handleBackToCourse = () => {
    if (curso) {
      navigate(`/curso/${curso.uuid}`);
    } else {
      console.log("No se ha podido obtener el curso.");
    }
  };

  return (
    <>
      <div className="contain-lesson animate__animated animate__fadeIn animate__faster">
        <nav className="sidebar">
          <button className="back-button" onClick={handleBackToCourse}>
            <ArrowLeftIcon className="Icono-arrow" />
          </button>

          {curso && (
            <CursosDropdown
              id={curso.uuid}
              nombre={modulo?.nombre}
              currentModuloId={modulo?.uuid}
            />
          )}

          <ul className="dashboard">
            {isLoadingLecciones ? (
              <ModuloLessonsLoader />
            ) : lecciones.length > 0 ? (
              lecciones.map((leccion, index) => (
                <li
                  key={leccion.id}
                  onClick={() => setCurrentVideoIndex(index)} // Actualiza el video al seleccionar una lección
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      currentVideoIndex === index ? "#06161c" : "transparent", // Resalta la lección seleccionada
                  }}
                >
                  <h2>{leccion.nombre}</h2>
                  <VideoCameraIcon className="Icono-cam" />
                </li>
              ))
            ) : (
              <p>No hay lecciones disponibles.</p>
            )}
          </ul>
        </nav>

        {/* Renderizar el componente de video */}
        {lecciones.length > 0 && (
          <Video
            videoUrl={lecciones[currentVideoIndex].video} // Cargar el video basado en el índice actual
            handleNextVideo={handleNextVideo}
            isNextAvailable={
              currentVideoIndex < lecciones.length - 1 ||
              (modulos.length > 1 && currentVideoIndex === lecciones.length - 1)
            }
          />
        )}
      </div>
    </>
  );
};
