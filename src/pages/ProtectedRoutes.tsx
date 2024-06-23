import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function ProtectedRoutes() {
  const user = localStorage.getItem("user");
  console.log(user);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate, location]);
  return user ? <Outlet /> : null;
}

export default ProtectedRoutes;
