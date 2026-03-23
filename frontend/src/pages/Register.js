import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    voterID: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);

      alert("Registered Successfully!");

      // 🔥 Redirect to login
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="center">
      <div className="form-container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            required
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            placeholder="Voter ID"
            required
            onChange={(e) =>
              setForm({ ...form, voterID: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button>Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}