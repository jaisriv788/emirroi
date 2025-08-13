// components/PublicRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function PublicRoute() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated === null)
    return <div className="text-center p-8 text-gray-500">Loading...</div>;

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

export default PublicRoute;
