import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
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
      // Send signup data to backend
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.message); // "User created successfully"
      navigate("/login"); // redirect to login
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Signup</h2>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
          Signup
        </button>
      </form>
      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

