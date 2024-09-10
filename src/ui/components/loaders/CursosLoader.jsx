import ContentLoader from "react-content-loader";

const CursosLoader = (props) => (
  <ContentLoader
    speed={2}
    width={360} // Mismo ancho que .card-curso
    height={350} // Mismo alto que .card-curso
    viewBox="0 0 390 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="animate__animated animate__fadeIn animate__faster"
    {...props}
  >
    {/* Rectángulo para la imagen */}
    <rect x="95" y="40" rx="10" ry="10" width="200" height="200" />

    {/* Rectángulo para el título */}
    <rect x="50" y="270" rx="4" ry="4" width="290" height="20" />

    {/* Rectángulo para el botón "Explorar" */}
    <rect x="115" y="310" rx="8" ry="8" width="160" height="30" />
  </ContentLoader>
);

export default CursosLoader;
