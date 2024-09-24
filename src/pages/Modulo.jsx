import { useParams, useNavigate } from "react-router-dom";
import "../styles/Modulo.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowRightCircleIcon,
  VideoCameraIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { CursosDropdown } from "../ui/components/CursosDropDown";
import ModuloLessonsLoader from "../ui/components/loaders/ModuloLessonsLoader";
import { Video } from "../ui/components/Video";

export const Modulo = () => {
  const { id } = useParams(); // Obtener el ID del módulo desde los params
  const [modulo, setModulo] = useState(null);
  const [curso, setCurso] = useState(null); // ID del curso relacionado con el módulo
  const [lecciones, setLecciones] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Controla el índice de la lección actual
  const [isLoadingLecciones, setIsLoadingLecciones] = useState(true);
  const [modulos, setModulos] = useState([]); // Para manejar todos los módulos

  const navigate = useNavigate();

  // Obtener el detalle del módulo actual
  const fetchModuloDetalle = async (moduloId) => {
    setIsLoadingLecciones(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/modulo/${moduloId}`
      );
      setModulo(response.data.modulo || []);
      setCurso(response.data.curso); // Guardar el curso al que pertenece este módulo
      setLecciones(response.data.lecciones);
      setCurrentVideoIndex(0); // Resetear el índice de la lección cuando cambia el módulo
      setIsLoadingLecciones(false);

      const cursoResponse = await axios.get(
        `http://127.0.0.1:8000/api/curso/${response.data.curso.uuid}/modulos`
      );
      setModulos(cursoResponse.data.modulos);
    } catch (error) {
      console.error("Error al obtener los detalles del módulo:", error);
      setIsLoadingLecciones(false);
    }
  };

  useEffect(() => {
    fetchModuloDetalle(id);
  }, [id]);

  const handleNextVideo = () => {
    if (currentVideoIndex < lecciones.length - 1) {
      // Si hay más lecciones, avanzamos a la siguiente
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      // Si es la última lección, intentar cargar el siguiente módulo
      handleNextModule();
    }
  };

  // Redirigir al siguiente módulo y su primera lección
  const handleNextModule = () => {
    const currentModuleIndex = modulos.findIndex(
      (mod) => mod.uuid === modulo.uuid
    );

    if (currentModuleIndex !== -1 && currentModuleIndex < modulos.length - 1) {
      const nextModule = modulos[currentModuleIndex + 1];
      // Cargar el siguiente módulo y su primera lección
      fetchModuloDetalle(nextModule.uuid);
    } else {
      console.log("No hay más módulos disponibles.");
    }
  };

  // Redirigir al detalle del curso cuando se hace clic en el botón de retroceso
  const handleBackToCourse = () => {
    if (curso) {
      navigate(`/curso/${curso.uuid}`); // Redirigir al detalle del curso con su ID
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
