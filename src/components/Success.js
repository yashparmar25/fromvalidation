import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Success.css"; // Import the new styles

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="form-container">
        <h2>No data submitted</h2>
        <button onClick={() => navigate("/")}>Go to Form</button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Registration Successful</h2>
      <div className="success-card">
        <div className="row">
          <strong>First Name:</strong> <span>{state.firstName}</span>
        </div>
        <div className="row">
          <strong>Last Name:</strong> <span>{state.lastName}</span>
        </div>
        <div className="row">
          <strong>Username:</strong> <span>{state.username}</span>
        </div>
        <div className="row">
          <strong>Email:</strong> <span>{state.email}</span>
        </div>
        <div className="row">
          <strong>Phone:</strong>{" "}
          <span>{state.phoneCode} {state.phoneNumber}</span>
        </div>
        <div className="row">
          <strong>Country:</strong> <span>{state.country}</span>
        </div>
        <div className="row">
          <strong>City:</strong> <span>{state.city}</span>
        </div>
        <div className="row">
          <strong>PAN:</strong> <span>{state.pan}</span>
        </div>
        <div className="row">
          <strong>Aadhar:</strong> <span>{state.aadhar}</span>
        </div>
      </div>

      <button className="submit-another" onClick={() => navigate("/")}>
        Submit Another
      </button>
    </div>
  );
}
