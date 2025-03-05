import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Users Gained",
        data: [50, 100, 150, 200, 250, 300],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Active", "Inactive", "Pending"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const donutData = {
    labels: ["Mobile", "Desktop", "Tablet"],
    datasets: [
      {
        data: [40, 45, 15],
        backgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF"],
        hoverBackgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF"],
      },
    ],
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Revenue",
        data: [300, 450, 400, 600],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const areaData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [400, 600, 800, 700, 900, 1000],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const tableData = [
    { id: 1, name: "Johny", email: "johny@example.com", status: "Active" },
    { id: 2, name: "sushma", email: "sushma@example.com", status: "Inactive" },
    { id: 3, name: "Midhuna", email: "midhuna@example.com", status: "Pending" },
  ];

  return (
    <div style={{ backgroundColor: theme === "light" ? "#ffffff" : "#333333",
      color: theme === "light" ? "#000000" : "#ffffff", }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Dashboard</h1>

      {/* Counters */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
          gap: "20px",
        }}
      >
        {[
          { label: "Total Users", value: 30, bgColor: "#007BFF" },
          { label: "Active Users", value: 20, bgColor: "#28A745" },
          { label: "New Signups", value: 19, bgColor: "#FFC107" },
        ].map((counter, index) => (
          <div
            key={index}
            style={{
              flex: "1",
              padding: "1px",
              backgroundColor: counter.bgColor,
              color: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <h4 style={{ marginBottom: "5px" }}>{counter.label}</h4>
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                margin: "0",
              }}
            >
              {counter.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts and Table */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {[
          {
            title: "Users Gained (Monthly)",
            component: <Bar data={barData} />,
          },
          {
            title: "User Status Distribution",
            component: <Pie data={pieData} />,
          },
          {
            title: "Device Usage",
            component: <Doughnut data={donutData} />,
          },
          {
            title: "Revenue Growth",
            component: <Line data={lineData} />,
          },
          {
            title: "Sales Over Time",
            component: <Line data={areaData} />,
          },
          {
            title: "User Information",
            component: (
              <div >
                
                <button
                  onClick={() => navigate("/Dashboard")}
                  style={{
                    position: "right",
                    marginBottom: "10px",
                    padding: "8px 16px",
                    backgroundColor: theme === "light" ? "#ffffff" : "#555555",
                    color: theme === "light" ? "#000000" : "#ffffff",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  View All
                </button>
                <table style={{ width: "100%", borderCollapse: "collapse",backgroundColor: theme === "light" ? "#ffffff" : "#555555",
                    color: theme === "light" ? "#000000" : "#ffffff", }}>
                  <thead>
                    <tr style={{ backgroundColor: theme === "light" ? "#f8f8f8" : "#444444"  }}>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row) => (
                      <tr key={row.id}>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.id}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.name}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.email}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          },
          
        ].map((card, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              backgroundColor: theme === "light" ? "#ffffff" : "#444444",
              textAlign: "center",
            }}
          >
            <h4>{card.title}</h4>
            <div style={{ width: "100%", height: "200px", overflow: "auto" }}>
              {card.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
