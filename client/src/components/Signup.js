// Signup.js
import React, { Fragment, useState } from "react";
import { useUserContext } from "./UserContext";
import AutoSignupfill from "./AutoSignupFill";
const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    mailid: "",
    password: "",
    terms: false,
    address: "", // Store the selected address here
    bloodgroup: "",
    contact: "",
  });

  const { coordinates } = useUserContext();

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  return (
    <Fragment>
      <div className="signup-side"></div>
      <div className="signup-form">
        <h1>Be A Donor 🩸</h1>
        <form className="form-container">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="mailid"
            placeholder="Email"
            value={userData.mailid}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="bloodgroup"
            placeholder="Blood Group"
            value={userData.bloodgroup}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={userData.contact}
            onChange={handleInputChange}
          />
          <input
            type="checkbox"
            name="terms"
            checked={userData.terms}
            onChange={handleInputChange}
          />
          <label>Agree to terms and conditions</label>
          <AutoSignupfill userData={userData} />{" "}
          {/* Pass user data to AutofillCheckout */}
        </form>
        {/* Display coordinates if available */}
        {coordinates && (
          <p>
            Coordinates: Latitude {coordinates[1]}, Longitude {coordinates[0]}
          </p>
        )}
      </div>
    </Fragment>
  );
};

export default Signup;
