import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../src/styles/login.css";
import axios from 'axios'

const Login = ({ setIsRegistering, setIsLoggedIn }) => {
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error messages
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const register=()=>{
    navigate("/register")
  }

   const handleLogin = async (e) => {
     e.preventDefault();

    const email = loginFormData.email;
    const password = loginFormData.password;

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
     


      if (response.data.success) {
        console.log(".jbchvdnc")
        navigate("/Home");
    
        setIsLoggedIn(true);
      } else {
        setErrorMessage(response.data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginFormData.email}
          onChange={handleInputChange}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={loginFormData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error messages */}
      <button className="register-btn" onClick={register}>
        Don't have an account? Register
      </button>
    </div>
  );
};

export default Login;





