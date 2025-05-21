import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const countries = {
  India: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad"],
  USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"],
  UK: ["London", "Manchester", "Birmingham", "Liverpool", "Edinburgh", "Glasgow"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton"]
};

export default function Form() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    
    // Name validations
    if (!form.firstName.trim()) {
      errs.firstName = "First Name is required";
    } else if (form.firstName.length < 2) {
      errs.firstName = "First Name must be at least 2 characters";
    }

    if (!form.lastName.trim()) {
      errs.lastName = "Last Name is required";
    } else if (form.lastName.length < 2) {
      errs.lastName = "Last Name must be at least 2 characters";
    }

    // Username validation
    if (!form.username.trim()) {
      errs.username = "Username is required";
    } else if (form.username.length < 3) {
      errs.username = "Username must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      errs.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      errs.email = "Please enter a valid email address";
    }

    // Password validation
    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    // Phone validation
    if (!form.phoneNumber) {
      errs.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phoneNumber)) {
      errs.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    // Location validation
    if (!form.country) {
      errs.country = "Please select a country";
    }
    if (!form.city) {
      errs.city = "Please select a city";
    }

    // PAN validation
    if (!form.pan) {
      errs.pan = "PAN number is required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan)) {
      errs.pan = "Please enter a valid PAN number (e.g., ABCDE1234F)";
    }

    // Aadhar validation
    // Aadhar validation
if (!form.aadhar) {
  errs.aadhar = "Aadhar number is required";
} else if (!/^[2-9]{1}[0-9]{11}$/.test(form.aadhar.trim())) {
  errs.aadhar = "Please enter a valid 12-digit Aadhar number (cannot start with 0 or 1)";
}


    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: form });
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Personal Information */}
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className={errors.firstName ? "error" : ""}
              placeholder="Enter your first name"
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className={errors.lastName ? "error" : ""}
              placeholder="Enter your last name"
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>

          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className={errors.username ? "error" : ""}
              placeholder="Choose a username"
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div>
            <label>Password</label>
            <input
              type={form.showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
              placeholder="Enter your password"
            />
            <label className="inline">
              <input
                type="checkbox"
                name="showPassword"
                checked={form.showPassword}
                onChange={handleChange}
              />
              Show Password
            </label>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {/* Phone Number */}
          <div>
            <label>Phone Number</label>
            <div className="phone-container">
              <input
                type="text"
                name="phoneCode"
                value={form.phoneCode}
                readOnly
                className="phone-code"
              />
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className={`phone-number ${errors.phoneNumber ? "error" : ""}`}
                placeholder="Enter phone number"
              />
            </div>
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>

          {/* Location */}
          <div>
            <label>Country</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className={errors.country ? "error" : ""}
            >
              <option value="">Select Country</option>
              {Object.keys(countries).map((ctry) => (
                <option key={ctry} value={ctry}>
                  {ctry}
                </option>
              ))}
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          <div>
            <label>City</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className={errors.city ? "error" : ""}
              disabled={!form.country}
            >
              <option value="">Select City</option>
              {(countries[form.country] || []).map((cty) => (
                <option key={cty} value={cty}>
                  {cty}
                </option>
              ))}
            </select>
            {errors.city && <span className="error">{errors.city}</span>}
          </div>

          {/* Document Numbers */}
          <div>
            <label>PAN Number</label>
            <input
              type="text"
              name="pan"
              value={form.pan}
              onChange={handleChange}
              className={errors.pan ? "error" : ""}
              placeholder="Enter PAN number (e.g., ABCDE1234F)"
            />
            {errors.pan && <span className="error">{errors.pan}</span>}
          </div>

          <div>
  <label>Aadhar Number</label>
  <input
    type="text"
    name="aadhar"
    value={form.aadhar}
    onChange={(e) => {
      const { value } = e.target;
      // Allow only digits and limit to 12 characters
      if (/^\d{0,12}$/.test(value)) {
        setForm((prev) => ({ ...prev, aadhar: value }));
      }
    }}
    className={errors.aadhar ? "error" : ""}
    placeholder="Enter Aadhar number"
  />
  {errors.aadhar && <span className="error">{errors.aadhar}</span>}
</div>
        </div>

        <button type="submit" disabled={Object.keys(errors).length !== 0}>

          Register
        </button>
      </form>
    </div>
  );
}
