// import { useEffect, useState } from "react";
import { Cursos } from "../ui/components/Cursos";
import "../styles/Home.css";
import { Accordion } from "../ui/components/Acorddion";
export const Home = () => {
  // const [Loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1800);
  // }, []);

  return (
    <>
      <div className="main-containerhome">
        <section className="Cursos">
          <div className="titulo">
            <h1>Contenidos por explorar</h1>
          </div>

          <div className="contenido">
            <Cursos />
          </div>
        </section>
        <div className="miruta">
          <Accordion />
        </div>
      </div>
    </>
  );
};
