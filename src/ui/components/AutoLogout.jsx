import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PropTypes from "prop-types"; // Importa PropTypes

export const AutoLogout = ({ children }) => {
  const { logout, isAuthenticated } = useAuth(); // Asegúrate de que `isAuthenticated` esté disponible en tu contexto
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const [warningShown, setWarningShown] = useState(false);
  const navigate = useNavigate();

  const logoutAfterInactivity = 10 * 60 * 1000; // 15 minutos de inactividad
  const warningTime = logoutAfterInactivity - 2 * 60 * 1000; // 2 minutos antes del logout

  const resetTimer = useCallback(() => {
    setLastActiveTime(Date.now());
    if (warningShown) {
      toast.dismiss(); // Oculta el toast si está visible
      setWarningShown(false);
    }
  }, [warningShown]);

  useEffect(() => {
    const checkInactivity = () => {
      if (!isAuthenticated) return; // No hacer nada si no está autenticado

      const elapsedTime = Date.now() - lastActiveTime;

      if (elapsedTime > logoutAfterInactivity) {
        toast.dismiss();
        logout();
        navigate("/login");
      } else if (elapsedTime > warningTime && !warningShown) {
        toast("¿Sigues ahí? La sesión se cerrará en breve.", {
          className: "toast-w",
          duration: Infinity,
          type: "warning",
        });
        setWarningShown(true);
      }
    };

    const interval = setInterval(checkInactivity, 1000);

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Cierra la sesión al cerrar la página
    // const handleBeforeUnload = () => {
    //   if (isAuthenticated) {
    //     logout();
    //   }
    // };
    // window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      // window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [
    lastActiveTime,
    logout,
    navigate,
    logoutAfterInactivity,
    warningTime,
    warningShown,
    resetTimer,
    isAuthenticated, // Agrega `isAuthenticated` como dependencia
  ]);

  return <>{children}</>;
};

AutoLogout.propTypes = {
  children: PropTypes.node.isRequired,
};
