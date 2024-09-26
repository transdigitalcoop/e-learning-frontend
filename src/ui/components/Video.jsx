import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Video.css";

export const Video = ({ videoUrl, handleNextVideo, isNextAvailable }) => {
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  const onVideoLoad = () => {
    setIsLoadingVideo(false); // Actualiza el estado cuando el video está listo
  };

  return (
    <>
      <div className="contain-video">
        {/* Contenedor del video */}
        <div className={`video ${isLoadingVideo ? "hidden" : ""}`}>
          <video
            src={videoUrl}
            controls
            onLoadedData={onVideoLoad} // Llamado cuando el video está completamente cargado
            style={{
              width: "100%",
              maxWidth: "90%",
              height: "auto",
            }}
          ></video>
        </div>

        {/* Botón "Siguiente sección" */}
        <div className="boton">
          {isNextAvailable ? (
            <button onClick={handleNextVideo}>
              <h2>Siguiente lección</h2>
            </button>
          ) : (
            <button onClick={handleNextVideo}>
              <h2>Siguiente Modulo</h2>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
