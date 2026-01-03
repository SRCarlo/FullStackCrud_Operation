import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <style>
        {`
          .navbar {
            background-color: #333;
            padding: 12px 20px;
            display: flex;
            align-items: center;
          }

          .brand {
            color: white;
            font-size: 24px;
            font-weight: bold;
            margin-right: auto;
            text-decoration: none;
          }

          .brand:hover {
            color: #5f93e2ff;
          }

          .btn {
            padding: 6px 12px;
            background-color: #5f93e2ff;
            color: white;
            border: none;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
          }

          .btn:hover {
            background-color: #0b5dd789;
          }
        `}
      </style>

      <nav className="navbar">
        <Link className="brand" to="/">
          Full Stack Application
        </Link>
        <Link className="btn" to="/add-user">
          Add User
        </Link>
      </nav>
    </>
  );
}
