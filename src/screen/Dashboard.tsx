import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Role: {user?.role}</p>
      <button
        onClick={logout}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
