// Layout.jsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Bottomnavbar from "./Bottomnavbar";
import { useEffect } from "react";
import Cookies from "js-cookie";
import AuthContextComponent from "../context/Auth";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      // If no token, redirect to login
      if (location.pathname !== "/signup") {
        navigate("/login");
      }
    } else {
      // If token exists, redirect to home
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/");
      }
    }
  }, [navigate, location.pathname]);

  return (
    <>
      <AuthContextComponent>
        <TopNavbar />
        <main className="bg-lightteal h-[86dvh] w-[100dwh] flex justify-center items-center">
          <Outlet />
        </main>
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
          <Bottomnavbar />
        )}
      </AuthContextComponent>
    </>
  );
}
``