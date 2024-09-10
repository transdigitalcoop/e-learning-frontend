import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Mainlayout from "./layout/Mainlayout";
import { Rutasauth } from "./auth/routes/Rutasauth";
import { Rutas } from "./routes/Rutas";
import { useAuth } from "./auth/hooks/useAuth";
import { AutoLogout } from "./ui/components/AutoLogout";

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Verifica si el path actual es "/modulo/:id"
  const isModuloRoute = location.pathname.startsWith("/modulo/");

  return (
    <AutoLogout>
      {/* Solo renderizamos el Mainlayout si no estamos en la ruta "/modulo/:id" */}
      {isModuloRoute ? (
        <Routes>
          {!isAuthenticated && <Route path="/auth/*" element={<Rutasauth />} />}
          {isAuthenticated && <Route path="/*" element={<Rutas />} />}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/auth"} />}
          />
        </Routes>
      ) : (
        <Mainlayout>
          <Routes>
            {!isAuthenticated && (
              <Route path="/auth/*" element={<Rutasauth />} />
            )}
            {isAuthenticated && <Route path="/*" element={<Rutas />} />}
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/" : "/auth"} />}
            />
          </Routes>
        </Mainlayout>
      )}
    </AutoLogout>
  );
}

export default App;
