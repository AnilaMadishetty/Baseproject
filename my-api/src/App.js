import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./AuthForm";
import ParentComponent from "./ParentComponent";
import UserDetails from "./UserDetails";
import Dashboard from "./Dashboard";
import ThemeProvider from "./ThemeContext";

function App() {
  return (
   <ThemeProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/dashboard" element={<ParentComponent />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/analytics" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
   </ThemeProvider>
  );
}

export default App;
