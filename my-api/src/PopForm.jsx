import React, { useState, useContext } from 'react';
import './PopForm.css';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const PopForm = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    const validationErrors = {};
    if (!formData.name) validationErrors.name = 'Name is required';
    if (!formData.email) validationErrors.email = 'Email is required';
    if (!formData.age || isNaN(formData.age) || formData.age <= 0) validationErrors.age = 'Please enter a valid age';
    if (!formData.gender) validationErrors.gender = 'Gender is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setUserDetails([...userDetails, formData]);
      setShowModal(false);
      setFormData({ name: '', email: '', age: '', gender: '' });
      setErrors({});
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="PopForm"
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#333333",
        color: theme === "light" ? "#000000" : "#ffffff",
        //minHeight: "100vh",
        
        
      }}
    >
      <button
        className="open-modal-btn"
        onClick={openModal}
        style={{
          backgroundColor: theme === "light" ? "#007BFF" : "#555555",
          color: theme === "light" ? "#ffffff" : "#cccccc",
        }}
      >
        Add New User
      </button>

      {showModal && (
        <div className="modal">
          <div
            className="modal-content"
            style={{
              backgroundColor: theme === "light" ? "#ffffff" : "#444444",
              color: theme === "light" ? "#000000" : "#ffffff",
              padding: "25px",
              alignItems: "center",
              paddingRight: "40px",
            }}
          >
            <span
              className="close"
              onClick={closeModal}
              style={{
                color: theme === "light" ? "#000000" : "#ffffff",
              }}
            >
              &times;
            </span>
            <h2>Enter User Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    backgroundColor: theme === "light" ? "#ffffff" : "#555555",
                    color: theme === "light" ? "#000000" : "#ffffff",
                    
                  }}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    backgroundColor: theme === "light" ? "#ffffff" : "#555555",
                    color: theme === "light" ? "#000000" : "#ffffff",
                  }}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  style={{
                    backgroundColor: theme === "light" ? "#ffffff" : "#555555",
                    color: theme === "light" ? "#000000" : "#ffffff",
                  }}
                />
                {errors.age && <span className="error">{errors.age}</span>}
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={{
                    backgroundColor: theme === "light" ? "#ffffff" : "#555555",
                    color: theme === "light" ? "#000000" : "#ffffff",
                  }}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="error">{errors.gender}</span>}
              </div>
              <button
                className="submit-btn"
                type="submit"
                style={{
                  backgroundColor: theme === "light" ? "#007BFF" : "#555555",
                  color: theme === "light" ? "#ffffff" : "#cccccc",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <h2>User Details</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "80%",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: theme === "light" ? "#ffffff" : "#555555",
            color: theme === "light" ? "#000000" : "#ffffff",
          }}
          border="1"
        >
          <thead>
            <tr style={{ backgroundColor: theme === "light" ? "#4CAF50" : "#444444", color: "white" }}>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((user, index) => (
              <tr key={index} style={{ backgroundColor: theme === "light" ? "#f9f9f9" : "#666666" }}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopForm;
