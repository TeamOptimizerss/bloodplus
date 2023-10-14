import React, { Fragment, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AutoSignupfill from "./AutoSignupFill";
import HandDonate from "../images/handdonate.png";
import { toast } from "react-toastify";
import { useUserContext } from "./UserContext";

const Signup = () => {
  return (
    <Fragment>
      <div className="in-container">
        <Outlet />
        <div className="signup-side">
          <img src={HandDonate} alt="Hand Donate" />
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
