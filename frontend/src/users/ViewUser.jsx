import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error("Error loading user:", error);
      alert("Failed to load user");
    }
  };

  return (
    <>
      <style>
        {`
          .user-container {
            width: 50%;
            margin: 40px auto;
            padding: 20px;
            border: 2px solid #333;
            border-radius: 8px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }

          .user-container h2 {
            text-align: center;
            margin-bottom: 20px;
          }

          .user-details p {
            font-size: 18px;
            margin: 10px 0;
          }

          .btn-back {
            display: block;
            margin: 20px auto 0;
            padding: 10px 20px;
            font-size: 16px;
            background-color: #5f93e2ff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .btn-back:hover {
            background-color: #0b5dd789;
          }
        `}
      </style>

      <div className="user-container">
        <h2>View User</h2>
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
        <button className="btn-back" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </>
  );
}
