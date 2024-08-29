import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ProtectedRoute } from "../routes/ProtectedRoute";

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
    </Routes>
  );
};
