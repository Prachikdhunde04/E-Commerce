import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login data
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      // Save JWT in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name);
      
      alert(`Welcome, ${res.data.name}!`);
      navigate("/"); // redirect to homepage
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Login
        </button>
      </form>
      <p className="text-center mt-3">
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
}


