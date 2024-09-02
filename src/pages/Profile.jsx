import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <p>Email: {user.email}</p>
      {/* Mostrar más información del usuario */}
    </div>
  );
};

export default UserProfile;
