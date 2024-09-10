import { useEffect } from "react";
import "../../styles/InfoModu.css";

export const InfoModu = ({ descripcion }) => {
  useEffect(() => {
    // Selecciona todos los elementos que deben ser animados
    const elements = document.querySelectorAll(".animate-elementi");

    // Configura el IntersectionObserver
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // Aplica la animación cuando el elemento es visible y el scroll es hacia abajo
            entry.target.classList.add(
              "animate__animated",
              "animate__slideInLeft"
            );
            // Deja de observar el elemento una vez que ha sido animado
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    ); // Se activa cuando el 10% del elemento es visible

    // Observa todos los elementos seleccionados
    elements.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup: Deja de observar cuando el componente se desmonta
    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []); // El array vacío asegura que esto se ejecute solo una vez cuando el componente se monte

  return (
    <div className="infocontainer animate-elementi">
      <div className="cardinfo">
        <h1>Información del Módulo</h1>
        <p>
          {descripcion ||
            "Pasa el mouse sobre un módulo para ver su descripción"}
        </p>
      </div>
    </div>
  );
};
