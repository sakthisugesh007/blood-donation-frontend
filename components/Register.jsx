import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import axios from "axios";
import "../src/styles/register.css"; 
import { useNavigate } from "react-router-dom";
const Register = ({ setIsRegistering }) => {
  const navigate=useNavigate()
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name: registerFormData.name,
        email: registerFormData.email,
        password: registerFormData.password,
      });
      console.log(response);
      if (response.data.success) {
        setIsRegistering(false); 
        alert("Registration successful! Please log in.");
        navigate("/")

      } else {
        alert("email already exist.");
      }
    } catch (error) {
      alert("email already exist.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Create Your Account</h1>
        <p className="register-subtitle">Join us and make a difference today!</p>
        <form onSubmit={handleRegisterSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={registerFormData.name}
            onChange={handleInputChange}
            required
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={registerFormData.email}
            onChange={handleInputChange}
            required
            className="register-input"
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={registerFormData.password}
              onChange={handleInputChange}
              required
              className="register-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        <button className="login-redirect-btn" onClick={() => setIsRegistering(false)}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;
