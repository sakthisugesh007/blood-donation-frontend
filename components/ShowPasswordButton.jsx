import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ShowPasswordButton = ({ showPassword, setShowPassword }) => {
  return (
    <button
      type="button"
      className="show-password-btn"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
};

export default ShowPasswordButton;
