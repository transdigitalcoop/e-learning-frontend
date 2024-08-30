import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { CursoDetalle } from "../pages/CursoDetalle";

export const Rutas = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/curso/:id"
        element={
          <ProtectedRoute>
            <CursoDetalle />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
