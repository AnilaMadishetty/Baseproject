import React, { useState, useEffect,useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import "./AuthForm.css";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("https://e1.pxfuel.com/desktop-wallpaper/966/456/desktop-wallpaper-login-page-login.jpg") no-repeat center center fixed;
  background-size: cover;
  {/*background-color: ${(props) => (props.theme === "light" ? "#f0f0f0" : "#1a1a1a")};
  color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};*/}
`;

const FormContainer = styled.div`
  width: 400px;
  padding: 30px;
  border-radius: 32px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  //background: linear-gradient(to bottom, #ffffff, rgba(179, 190, 211, 0.93));
  background: ${(props) => (props.theme === "light" ? "rgba(246, 247, 248, 0.66)" : "#333")};
  color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
`;

const Title = styled.h2`
  text-align: center;
  color: rgb(35, 124, 219);
  font-weight: bold;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${(props) => (props.theme === "light" ? "#333" : "#fff")};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid ${(props) => (props.theme === "light" ? "#ccc" : "#777")};
  background-color: ${(props) => (props.theme === "light" ? "#fff" : "#555")};
  color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  &::placeholder {
    color: ${(props) => (props.theme === "light" ? "#888" : "#bbb")};
  }
  &.errorInput {
   // border-color: #ff4d4d;
    //background-color: #ffe6e6;
    //background-color: ${(props) => (props.theme === "light" ? "#ffebeb" : "#661515")}; /* Error background */
    //border: 1px solid ${(props) => (props.theme === "light" ? "red" : "#ff4d4d")}; /* Error border */
    color: ${(props) => (props.theme === "light" ? "red" : "#ffb3b3")}; /* Error text */  
  }
`;

const ErrorText = styled.p`
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background: ${(props) => (props.theme === "light" ? "#007bff" : "#444")};
  color: white;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, rgb(88, 127, 168), rgb(77, 136, 199));
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(to right, rgb(59, 111, 167), rgb(43, 93, 143));
    transform: translateY(-2px);
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 15px;
  color: ${(props) => (props.theme === "light" ? "#007BFF" : "#bbb")};
  cursor: pointer;
  text-decoration: ${(props) => (props.isRegistering ? "none" : "underline")};
  transition: color 0.3s ease;

  &:hover {
    color: rgb(4, 16, 85);
  }
`;

const AuthForm = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validationErrors = {};

    if (formData.email && !validateEmail(formData.email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (formData.password && !validatePassword(formData.password)) {
      validationErrors.password =
        "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character.";
    }

    if (isRegistering && formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(validationErrors);
  }, [formData, isRegistering]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert("Please fix the errors before submitting the form.");
      return;
    }
    alert("Form submitted successfully.");
    //navigate("/dashboard");
    navigate("/analytics");
  };

  return (
    <PageContainer theme={theme}>
      <FormContainer theme={theme} isRegistering={isRegistering}>
        <Title>{isRegistering ? "Register" : "Login"}</Title>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label theme={theme}>Email:</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              theme={theme}
              className={errors.email ? "errorInput" : ""}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FormField>

          <FormField>
            <Label theme={theme}>Password:</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className={errors.password ? "errorInput" : ""}
              theme={theme}
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </FormField>

          {isRegistering && (
            <FormField>
              <Label theme={theme}>Confirm Password:</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className={errors.confirmPassword ? "errorInput" : ""}
                theme={theme}
              />
              {errors.confirmPassword && (
                <ErrorText>{errors.confirmPassword}</ErrorText>
              )}
            </FormField>
          )}

          <SubmitButton type="submit">
            {isRegistering ? "Register" : "Login"}
          </SubmitButton>
          {/* Theme Toggle Switch */}
          <div className="theme-toggle-container">
            <label className="theme-toggle">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <span className="slider"></span>
            </label>
            <span>{theme === "dark" ? "Dark" : "Light"}</span>
          </div>
        </form>

        <ToggleText
          theme={theme}
          isRegistering={isRegistering}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "Already have an account? Login here."
            : "Don't have an account? Register here."}
        </ToggleText>
      </FormContainer>
    </PageContainer>
  );
};

export default AuthForm;
