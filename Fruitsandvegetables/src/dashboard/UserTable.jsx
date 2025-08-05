import React, { useState, useEffect } from "react";
import "./UserTable.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import Cookies from "js-cookie";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://192.168.29.136:8000/admin/total", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formattedUsers = response.data.data.map((u) => ({
        ...u,
        status: u.status === true || u.status === 1 || u.status === "active",
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    try {
      const token = Cookies.get("token");
      const updatedStatus = !currentStatus;

      await axios.post(
        "http://192.168.29.136:8000/admin/total",
        { id: userId, status: updatedStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: updatedStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating status via POST API:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <div className="user-table-container">
            <h2>User List</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id || index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.number}</td>
                    <td>
                      <span className={`status-label ${user.status ? "active" : "deactive"}`}>
                        {user.status ? "Active" : "Deactive"}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`status-btn ${user.status ? "deactivate" : "activate"}`}
                        onClick={() => toggleStatus(user.id, user.status)}
                      >
                        {user.status ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="6">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
