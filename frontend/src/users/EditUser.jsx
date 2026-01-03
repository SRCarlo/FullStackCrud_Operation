import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
  });

  const { name, email, username } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error("Error loading user:", error);
      alert("Failed to load user data");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/user/${id}`, user);
      alert("User updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  const onCancel = () => {
    navigate("/");
  };

  return (
    <>
      <style>
        {`
          .form-container {
            width: 50%;
            margin: 40px auto;
            padding: 20px;
            border: 2px solid #333;
            border-radius: 8px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }

          .form-container h2 {
            text-align: center;
            margin-bottom: 20px;
          }

          .form-control {
            margin-bottom: 15px;
            padding: 12px;
            font-size: 16px;
          }

          .button-row {
            display: flex;
            justify-content: space-between;
          }

          .button-row .btn {
            width: 48%;
          }
        `}
      </style>

      <div className="form-container">
        <h2>Edit User</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            value={name}
            onChange={onInputChange}
            required
          />
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={onInputChange}
            required
          />
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter Username"
            value={username}
            onChange={onInputChange}
            required
          />

          <div className="button-row">
            <button type="submit" className="btn btn-success">
              Update User
            </button>
            <button type="button" className="btn btn-danger" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
