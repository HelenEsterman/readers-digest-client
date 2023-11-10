import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export const Authorized = () => {
  if (localStorage.getItem("readers_digest_token")) {
    return (
      <>
        <NavBar />
        <main className="p-4">
          <Outlet />
        </main>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
