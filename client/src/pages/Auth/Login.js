import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/login.css"; // Import the new CSS file
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignUp
        ? "/api/v1/auth/register"
        : "/api/v1/auth/login";
      const formData = isSignUp
        ? { name: email, email, password }
        : { email, password };

      const res = await axios.post(endpoint, formData);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        if (!isSignUp) {
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
        }
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Navigate to register page if the user doesn't have an account
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Layout title={`${isSignUp ? "Register" : "Login"} - Ecommer App`}>
      <div className="login-container" id="login-container">
        {/* Sign In Form */}
        <div className={`login-form-container ${isSignUp ? "sign-up" : "sign-in"}`}>
          <form onSubmit={handleSubmit}>
            <h1>{isSignUp ? "Login" : "Login"}</h1>
            {!isSignUp && <span>or use your email password</span>}
            {!isSignUp && (
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-form-control"
                placeholder="Enter Your Email"
                required
              />
            )}
            {!isSignUp && (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-form-control"
                placeholder="Enter Your Password"
                required
              />
            )}
            {!isSignUp && (
              <a
                href="#"
                className="forgot-password"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Your Password?
              </a>
            )}
            <button type="submit" className="login-btn btn-primary">
              {isSignUp ? "REGISTER" : "LOGIN"}
            </button>
          </form>
        </div>
        {/* Register button */}
      </div>
    </Layout>
  );
};

export default Login;
