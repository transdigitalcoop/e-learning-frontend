import { Routes, Route, Navigate } from "react-router-dom";
import Mainlayout from "./layout/Mainlayout";
import { Rutasauth } from "./auth/routes/Rutasauth";
import { Rutas } from "./routes/Rutas";
import { useAuth } from "./auth/hooks/useAuth";
import { AutoLogout } from "./ui/components/AutoLogout";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <AutoLogout>
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
    </AutoLogout>
  );
}

export default App;
