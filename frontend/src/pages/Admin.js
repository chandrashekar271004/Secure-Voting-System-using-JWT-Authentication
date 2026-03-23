import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);
  const [tiedParties, setTiedParties] = useState([]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchResults = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/results",
        { headers: { Authorization: token } }
      );

      const sorted = res.data.results.sort((a, b) =>
        a._id.localeCompare(b._id)
      );

      setResults(sorted);
      setWinner(res.data.winner || null);
      setIsTie(res.data.isTie);
      setTiedParties(res.data.tiedParties || []);

    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="center">
    <div style={{ textAlign: "center", width: "100%" }}>
      
      <h2 style={{ marginBottom: "20px", marginTop: "220px" }}>📊 Live Results</h2>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      {isTie && (
      <div style={{
        background: "#f59e0b",
        padding: "15px",
        borderRadius: "10px",
        margin: "20px auto",
        width: "320px"
      }}>
        <h2>🤝 It's a Tie!</h2>
      </div>
      )}

      {!isTie && winner && (
      <div style={{
        background: "green",
        padding: "15px",
        borderRadius: "10px",
        margin: "20px auto",
        width: "320px"
      }}>
        <h2>🏆 Winner: {winner._id}</h2>
        <p>{winner.votes} votes</p>
      </div>
      )}

      {results.map((r, i) => (
        <div key={i} className="result-box">
          <h3>{r._id}</h3>
          <p>{r.votes} votes</p>
          <p>{r.percent}%</p>
        </div>
      ))}

      <div style={{ width: "300px", margin: "20px auto" }}>
        <Pie
          data={{
            labels: results.map(r => r._id),
            datasets: [
              {
                data: results.map(r => r.votes),
                backgroundColor: results.map(r => {
                switch (r._id) {
                  case "Party A": return "#3b82f6";
                  case "Party B": return "#ef4444";
                  case "Party C": return "#10b981";
                  case "Party D": return "#f59e0b";
                  default: return "#8b5cf6";
                }})
              }
            ]
          }}
          options={{
            animation : false
          }}
        />
      </div>

    </div>
  </div>
);
}