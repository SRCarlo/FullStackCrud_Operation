import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function AddUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
  });

  const { name, email, username } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user", user);
      alert("User added successfully!");
      setUser({ name: "", email: "", username: "" });
      navigate("/");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
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
        <h2>Add New User</h2>
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
              Add User
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
