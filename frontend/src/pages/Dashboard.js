import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const vote = async (party) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/vote/vote",
        { party },
        { headers: { Authorization: token } }
      );

      alert("Vote successful");

      //  Logout after voting
      localStorage.removeItem("token");
      localStorage.removeItem("hasVoted");

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  //  LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasVoted");
    navigate("/login");
  };

  return (
    <div className="center">
      <h2>Vote Now</h2>

      <button onClick={() => vote("Party A")}>Party A</button>
      <button onClick={() => vote("Party B")}>Party B</button>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}