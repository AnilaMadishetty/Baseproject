import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ThemeContext } from "./ThemeContext"; // Import ThemeContext

const UserDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { theme } = useContext(ThemeContext); // Get theme from context

  const user = state?.user;

  if (!user) {
    return <p>User details not found. Please go back and try again.</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: theme === "light" ? "#ffffff" : "#333333",
        color: theme === "light" ? "#000000" : "#ffffff",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center" }}>User Details</h2>
      <table
        border="1"
        style={{
          width: "50%",
          borderCollapse: "collapse",
          margin: "auto",
          backgroundColor: theme === "light" ? "#ffffff" : "#555555",
          color: theme === "light" ? "#000000" : "#ffffff",
        }}
      >
        <tbody>
          <tr
            style={{
              backgroundColor: theme === "light" ? "#4CAF50" : "#444444",
              color: "white",
            }}
          >
            <th style={{ textAlign: "left", padding: "8px" }}>Field</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Value</th>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>Name</td>
            <td style={{ padding: "8px" }}>
              {user.firstName} {user.lastName}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>Email</td>
            <td style={{ padding: "8px" }}>{user.email}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>Phone</td>
            <td style={{ padding: "8px" }}>{user.phone}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>Age</td>
            <td style={{ padding: "8px" }}>{user.age}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>Gender</td>
            <td style={{ padding: "8px" }}>{user.gender}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>BirthDate</td>
            <td style={{ padding: "8px" }}>{user.birthDate}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>BloodGroup</td>
            <td style={{ padding: "8px" }}>{user.bloodGroup}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
