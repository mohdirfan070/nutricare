// Layout.jsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Bottomnavbar from "./Bottomnavbar";
import { useEffect } from "react";
import Cookies from "js-cookie";
import AuthContextComponent from "../context/Auth";
import { useAuthContext } from "../context/Auth";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, loading } = useAuthContext();

  useEffect(() => {
    if (loading) return;

    if (
      !currentUser &&
      location.pathname !== "/signup" &&
      location.pathname !== "/login"
    ) {
      navigate("/login");
    }

    if (
      currentUser &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      navigate("/profile");
    }
  }, [currentUser, loading, location.pathname, navigate]);


  return (
    <>
      {/* <AuthContextComponent> */}
      <TopNavbar />
      <main className="bg-lightteal h-[86dvh] w-[100dwh] flex justify-center items-center">
        <Outlet />
      </main>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Bottomnavbar />
      )}
      {/* </AuthContextComponent> */}
    </>
  );
}
``;
