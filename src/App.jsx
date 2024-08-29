import { Routes, Route, Navigate } from "react-router-dom";
import Mainlayout from "./layout/Mainlayout";
import { Rutasauth } from "./auth/routes/Rutasauth";
import { Rutas } from "./routes/Rutas";
import { useAuth } from "./auth/hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Mainlayout>
      <Routes>
        {!isAuthenticated && <Route path="/auth/*" element={<Rutasauth />} />}
        {isAuthenticated && <Route path="/*" element={<Rutas />} />}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/auth"} />}
        />
      </Routes>
    </Mainlayout>
  );
}

export default App;
