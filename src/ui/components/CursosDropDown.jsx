import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CursosDropDown.css";
import { SelectLoader } from "./loaders/SelectLoader";

export const CursosDropdown = ({ id, nombre, currentModuloId }) => {
  const [modulos, setModulos] = useState([]);
  const [selectedModulo, setSelectedModulo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursoDetalle = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/cursos/${id}`
        );
        setModulos(response.data.modulos);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
        setIsLoading(false);
      }
    };
    fetchCursoDetalle();
  }, [id]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedModulo(selectedId);

    if (selectedId) {
      navigate(`/modulo/${selectedId}`);
    }
  };

  return (
    <div className="dropdown-container Myriad">
      {isLoading ? (
        <SelectLoader />
      ) : (
        <select value={selectedModulo} onChange={handleSelectChange}>
          <option value="">{nombre}</option>
          {modulos
            .filter((modulo) => modulo.uuid !== currentModuloId) // Excluye el módulo actual
            .map((modulo) => (
              <option key={modulo.id} value={modulo.uuid}>
                {modulo.nombre}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};
