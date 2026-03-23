import { useNavigate } from "react-router-dom";

export default function AlreadyVoted() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasVoted");
    navigate("/login");
  };

  return (
    <div className="center">
      <div className="form-container">
        <h2>🗳️ You have already voted</h2>
        <p>Thank you for participating!</p>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}