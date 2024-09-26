import { toast } from "sonner";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/CursoProgreso.css";

export const CursoProgreso = ({
  curso,
  modulo,
  usuarioId,
  inscrito,
  onInscribir,
}) => {
  const [inscripcionEstado, setInscripcionEstado] = useState(inscrito); // Estado local basado en la prop

  // Función para inscribir al usuario en el curso
  const handleInscribirse = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post(
        `${apiUrl}/api/cursos/${curso.uuid}/inscribir/${usuarioId}`
      );

      if (response.data.status === 200) {
        setInscripcionEstado(true); // Usuario inscrito correctamente en el estado local
        onInscribir(); // Actualizar la inscripción en el componente padre
        localStorage.setItem(`inscripcion_${curso.uuid}_${usuarioId}`, "true"); // Guardar en localStorage
        toast.success(response.data.message, {
          className: "toast-s",
        });
      } else if (response.data.status === 400) {
        toast.error(response.data.message, {
          className: "toast-e",
        });
        setInscripcionEstado(true); // Aseguramos que el botón también se deshabilite
        onInscribir(); // Actualizar en el componente padre
      }
    } catch (error) {
      console.error("Error al inscribirse:", error);
      toast.error("Hubo un error al intentar inscribirte.", {
        className: "toast-e",
      });
    }
  };

  useEffect(() => {
    setInscripcionEstado(inscrito); // Sincronizar el estado local con el prop inscrito
  }, [inscrito]);

  return (
    <div className="curso-progress">
      <div className="cardp">
        <div className="progre">
          <h1 className="Cascadia">Progreso</h1>
          <div className="barra">
            <progress
              value={curso.progreso}
              max="100"
              className="progress-bar"
            ></progress>
            <p>{curso != null ? curso.progreso : "0"}%</p>
          </div>
        </div>
        <div className="detailsContainer">
          <div className="detailItem">
            <span className="text">
              <strong>Numero de módulos: </strong>
              {modulo.length}
            </span>
          </div>
        </div>
        <div className="boton">
          <button onClick={handleInscribirse} disabled={inscripcionEstado}>
            <h1>{inscripcionEstado ? "Inscrito" : "Inscribirse"}</h1>
          </button>
        </div>
      </div>
    </div>
  );
};
