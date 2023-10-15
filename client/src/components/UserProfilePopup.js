import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

const UserProfilePopup = () => {
  const navigate = useNavigate();
  const { userName, userEmail } = useUserContext();

  const handleLogout = () => {
    for (const key in localStorage) {
      if (key !== "theme") {
        localStorage.removeItem(key);
      }
    }
    navigate("/");
    window.location.reload();
  };

  return (
    <Fragment>
      <div className="userprofile-popup">
        <div>
          <div>
            <i className="fa-solid fa-user"></i>
            {userName}
          </div>
          <div>
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
        </div>
        <div>
          <div>
            <i className="fa-solid fa-envelope"></i>
            {userEmail}
          </div>
        </div>
        <div>
          <div>
            <i className="fa-solid fa-location-dot"></i>Update address
          </div>
          <div>
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
        </div>
        <div>
          <div>
            <i className="fa-solid fa-phone"></i>Update Contact No
          </div>
          <div>
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
        </div>
        <div>
          <div>
            <i className="fa-solid fa-lock"></i>Chage Password
          </div>
          <div>
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
        </div>
        <div className="button">
          <button className="btn" onClick={handleLogout}>
            <span>
              <i classNamea="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfilePopup;
