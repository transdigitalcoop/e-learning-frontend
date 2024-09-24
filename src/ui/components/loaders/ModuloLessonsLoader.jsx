import ContentLoader from "react-content-loader";

const ModuloLessonsLoader = (props) => (
  <ContentLoader
    speed={2} // Ajuste de velocidad
    width={390} // Ancho del contenedor de lecciones
    height={700} // Altura ajustada para incluir el nuevo ítem y todos los ítems
    viewBox="0 0 400 800" // Ajusta el viewBox para que coincida con la nueva altura
    backgroundColor="#143C4B" // Color oscuro para el fondo del loader
    foregroundColor="#276575" // Color más claro para la animación del loader
    {...props}
  >
    {/* Simulamos seis ítems de lecciones */}
    <rect x="0" y="0" rx="8" ry="8" width="390" height="50" />
    <rect x="0" y="70" rx="8" ry="8" width="390" height="50" />
    <rect x="0" y="140" rx="8" ry="8" width="390" height="50" />
    <rect x="0" y="210" rx="8" ry="8" width="390" height="50" />
    <rect x="0" y="280" rx="8" ry="8" width="390" height="50" />
    <rect x="0" y="350" rx="8" ry="8" width="390" height="50" />
    <rect x="0" y="420" rx="8" ry="8" width="390" height="50" />
    <rect x="0" y="490" rx="8" ry="8" width="390" height="50" />
    <rect x="0" y="560" rx="8" ry="8" width="390" height="50" />
  </ContentLoader>
);

export default ModuloLessonsLoader;
