import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import PropTypes from "prop-types"; // Importa PropTypes

export const AutoLogout = ({ children }) => {
  const { logout } = useAuth();
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const [warningShown, setWarningShown] = useState(false);
  const navigate = useNavigate();

  const logoutAfterInactivity = 10 * 60 * 1000;
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
      const elapsedTime = Date.now() - lastActiveTime;

      if (elapsedTime > logoutAfterInactivity) {
        toast.dismiss();
        logout();
        navigate("/login");
      } else if (elapsedTime > warningTime && !warningShown) {
        toast("¿Sigues ahi?, La sesion se cerrara en breve.", {
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

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [
    lastActiveTime,
    logout,
    navigate,
    logoutAfterInactivity,
    warningTime,
    warningShown,
    resetTimer,
  ]);

  return <>{children}</>;
};
AutoLogout.propTypes = {
  children: PropTypes.node.isRequired,
};
