import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import PopForm from "./PopForm";

const ParentComponent = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        setFilteredUsers(data.users); 
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleUserClick = (user) => {
    navigate(`/user/${user.id}`, { state: { user } });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sorted = [...filteredUsers].sort((a, b) => {
      if (order === "asc") {
        return a.age - b.age;
      }
      return b.age - a.age;
    });
    setFilteredUsers(sorted);
  };

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: theme === "light" ? "#ffffff" : "#333333", 
      color: theme === "light" ? "#000000" : "#ffffff",
      minHeight: "100vh" 
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>User List</h1>

      
      <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "20px" }}>
        <button
          onClick={() => navigate("/analytics")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: theme === "light" ? "white" : "#555",
            color: theme === "light" ? "black" : "white",
            border: "1px solid #ddd",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Dashboard
        </button>
      </div>

      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "20%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: theme === "light" ? "#fff" : "#555",
            color: theme === "light" ? "#000" : "#fff"
          }}
        />

        
        <select
          value={sortOrder}
          onChange={handleSortChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: theme === "light" ? "#fff" : "#555",
            color: theme === "light" ? "#000" : "#fff"
          }}
        >
          <option value="asc">Sort by Age: Ascending</option>
          <option value="desc">Sort by Age: Descending</option>
        </select>
      </div>

      
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <table
          border="1"
          style={{
            width: "80%",
            borderCollapse: "collapse",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: theme === "light" ? "#ffffff" : "#555",
            color: theme === "light" ? "#000" : "#fff"
          }}
        >
          <thead>
            <tr style={{ backgroundColor: theme === "light" ? "#4CAF50" : "#222222", // Adjust header for dark mode
                color: "#ffffff",
                textAlign: "center"
            }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleUserClick(user)}
                style={{
                  cursor: "pointer",
                  backgroundColor: theme === "light" ? "#f9f9f9" : "#777777", // Different row colors for contrast
                  color: theme === "light" ? "#000000" : "#ffffff",
                  borderBottom: "1px solid " + (theme === "light" ? "#ccc" : "#999"),
                }}
              >
                <td>{user.id}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div style={{ marginTop: "40px" }}>
        <PopForm />
      </div>
    </div>
  );
};

export default ParentComponent;
