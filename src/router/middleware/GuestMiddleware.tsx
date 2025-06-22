import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function GuestMiddleware() {
  const { getProfile } = useAuthContext();

  const userData = getProfile();

  return !userData?.userName ? <Outlet /> : <Navigate to="/" />;
}
