import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    voterID: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.voterID || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // 🔐 Store data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("hasVoted", res.data.hasVoted);
      localStorage.setItem("role", res.data.role);

      // 🔥 ROLE-BASED REDIRECT
      if (res.data.role === "admin") {
        navigate("/admin");
      } else if (res.data.hasVoted) {
        navigate("/already-voted");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <div className="form-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Voter ID"
            value={form.voterID}
            required
            onChange={(e) =>
              setForm({ ...form, voterID: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/">Register here</Link>
        </p>
      </div>
    </div>
  );
}