import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AlreadyVoted from "./pages/AlreadyVoted";
import Admin from "./pages/Admin";

function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/already-voted" element={<AlreadyVoted />} />
        <Route
          path="/admin"
          element={
            role === "admin" ? <Admin /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;