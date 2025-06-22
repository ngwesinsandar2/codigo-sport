import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";
import { ERoutePath } from "../path.enum";

export default function AuthMiddleware() {
  const { getProfile } = useAuthContext();

  const userData = getProfile();

  return userData?.userName ? <Outlet /> : <Navigate to={ERoutePath.Login} />;
}
