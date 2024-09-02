import { useState, useEffect } from "react";
import axios from "axios";
import Icono from "../../assets/icons/Icono.png";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationCircleIcon as ExclamationIcon,
} from "@heroicons/react/24/solid";
import SkeletonCourseCard from "./loaders/SkeletonCourseCard";
import "../../styles/Accordion.css";

export const Accordion = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/rutas") // Asegúrate de que esta ruta es correcta
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
    <div className="accordion-container">
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
          <div className="accordion-content">
            {isLoading ? (
              <>
                <SkeletonCourseCard />
                <SkeletonCourseCard />
                <SkeletonCourseCard />
              </>
            ) : Array.isArray(courses) && courses.length > 0 ? (
              courses.map((course) => (
                <div key={course.id} className="course-container">
                  <div className="course-progress">
                    <progress
                      value={course.progress}
                      max="100"
                      className="progress-bar"
                    ></progress>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="course-header">
                    <div className="info">
                      <img
                        src={Icono}
                        // src={course.icono}
                        alt={course.nombre}
                        className="course-icon"
                      />
                      <h3 className="course-title">{course.nombre}</h3>
                    </div>
                    <div className="button">
                      {" "}
                      <button
                        className="course-button"
                        onClick={() => console.log("Seguir curso", course.id)}
                      >
                        Seguir con el curso
                      </button>
                    </div>
                  </div>
                </div>
              ))
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
