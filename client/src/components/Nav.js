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
    setThemeTrigger(!themeTrigger);
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
              <NavLink to="/signup">Be a Donor</NavLink>
            </li>
            <li>
              <NavLink to="/login">Already a Donor</NavLink>
            </li>
            <li>
              <NavLink to="/aboutus">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contactus">Contact Us</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Nav;
