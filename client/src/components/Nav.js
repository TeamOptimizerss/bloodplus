import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BloodplusLogo from "../images/Bloodpluslogo.png";
import { useEventTrigger } from "./EventTriggerContext";

const Nav = () => {
  const savedTheme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === "dark");
  const { themeTrigger, setThemeTrigger } = useEventTrigger();

  const toggleMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    setThemeTrigger(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  return (
    <Fragment>
      <div className="nav">
        <NavLink to="/">
          <div className="blood-logo">
            <div className="image">
              <img src={BloodplusLogo} alt="Blood + Logo" />
            </div>
            <div className="title">Blood +</div>
          </div>
        </NavLink>

        <div className="tags">
          <ul>
            <span onClick={toggleMode}>
              <span className="thememode">
                {isDarkMode ? (
                  <i className="fa-solid fa-lightbulb glow"></i>
                ) : (
                  <i className="fa-regular fa-lightbulb"></i>
                )}
              </span>
            </span>
            <li>
              <NavLink
                to="/donors/signup"
                className="btn-flip"
                data-back="Back"
                data-front="Front"
              >
                <span>Be a Donor</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/donors/login">
                <span>Already a Donor</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutus">
                <span>About Us</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contactus">
                <span>Contact Us</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Nav;
