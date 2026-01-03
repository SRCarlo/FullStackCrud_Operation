import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user");
      }
    }
  };

  return (
    <>
      <style>
        {`
          .table {
            width: 90%;
            margin: 40px auto;
            border-collapse: collapse;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            overflow: hidden;
          }

          .table th,
          .table td {
            border: 2px solid #333;
            padding: 16px 20px;
            text-align: left;
          }

          .table thead {
            background-color: #333;
            color: white;
          }

          .table tbody tr:nth-child(even) {
            background-color: #f2f2f2;
          }

          .table tbody tr:hover {
            background-color: #ddd;
          }

          .action-btn {
            margin-right: 8px;
          }
        `}
      </style>

      <div>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading users...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : users.length === 0 ? (
          <p style={{ textAlign: "center" }}>No users found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                    <Link
                      className="btn btn-info action-btn"
                      to={`/view-user/${user.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-warning action-btn"
                      to={`/edit-user/${user.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger action-btn"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
