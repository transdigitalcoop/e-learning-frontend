import { Rutasauth } from "./auth/routes/Rutasauth";
import Mainlayout from "./layout/Mainlayout";
// import { Rutas } from "./routes/Rutas";
import "./styles/App.css";

function App() {
  return (
    <>
      <Mainlayout>
        <Rutasauth />
      </Mainlayout>
    </>
  );
}

export default App;
