import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
export const Rutasauth = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<Login />} />
      <Route path="auth/register" element={<Register />} />
    </Routes>
  );
};
