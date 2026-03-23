import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  //  ADMIN SHOULD NOT SEE DASHBOARD
  if (role === "admin") return <Navigate to="/admin" />;

  return children;
};

export default PrivateRoute;