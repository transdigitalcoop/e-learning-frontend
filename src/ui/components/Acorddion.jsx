import { useState, useEffect } from "react";
import axios from "axios";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationCircleIcon as ExclamationIcon,
} from "@heroicons/react/24/solid";
import SkeletonCourseCard from "./loaders/SkeletonCourseCard";
import "../../styles/Accordion.css";

export const Accordion = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  // const [abierto, setabierto] = useState(false);
  // const expand = () => {
  //   setabierto(!abierto);
  //   !abierto
  //     ? (window.location.href = "#miscursos")
  //     : window.history.pushState("", document.title, window.location.pathname),
  //     window.scrollTo(0, 0);
  // };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/rutas`)
      .then((response) => {
        setCourses(Array.isArray(response.data) ? response.data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los cursos", error);
        setCourses([]);
        setIsLoading(false);
      });
  }, []);

  const toggleItem = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div id="miscursos" className="accordion-container">
      <div className="accordion-item">
        <div onClick={() => toggleItem(0)} className="accordion-title">
          <span>Mis Cursos</span>
          <span className="icon">
            {activeIndex === 0 ? (
              <ChevronUpIcon className="icon-style" />
            ) : (
              <ChevronDownIcon className="icon-style" />
            )}
          </span>
        </div>
        {activeIndex === 0 && (
          <div className="accordion-content animate__animated animate__slideInUp">
            {isLoading ? (
              <>
                <SkeletonCourseCard />
                <SkeletonCourseCard />
                <SkeletonCourseCard />
              </>
            ) : Array.isArray(courses) && courses.length > 0 ? (
              // Filtramos los cursos con progreso mayor a 0
              courses.filter((course) => course.progreso > 0).length > 0 ? (
                courses
                  .filter((course) => course.progreso > 0)
                  .map((course) => (
                    <div
                      key={course.id}
                      className="course-container animate__animated animate__backInUp"
                    >
                      <div className="course-progress">
                        <progress
                          value={course.progreso}
                          max="100"
                          className="progress-bar"
                        ></progress>
                        <span>{course.progreso}%</span>
                      </div>
                      <div className="course-header">
                        <div className="info">
                          <img
                            src={`https://res.cloudinary.com/digqcdimk/image/upload/v1725315836/${course.icono}`}
                            alt={course.nombre}
                            className="course-icon"
                          />
                          <h3 className="course-title">{course.nombre}</h3>
                        </div>
                        <div className="button">
                          <button
                            className="course-button"
                            onClick={() =>
                              console.log("Seguir curso", course.id)
                            }
                          >
                            Seguir con el curso
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                // Si no hay cursos con progreso mayor a 0, mostramos el mensaje
                <div className="no-courses">
                  <ExclamationIcon className="no-courses-icon" />
                  <p>No tienes cursos activos</p>
                </div>
              )
            ) : (
              <div className="no-courses">
                <ExclamationIcon className="no-courses-icon" />
                <p>No tienes cursos activos</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
