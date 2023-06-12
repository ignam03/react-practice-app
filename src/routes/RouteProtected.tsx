import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../shared/NavBar/NavBar";

const RouteProtected = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.id ? (
        <>
          <NavBar />
          <main>
            <Outlet></Outlet>
          </main>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RouteProtected;
