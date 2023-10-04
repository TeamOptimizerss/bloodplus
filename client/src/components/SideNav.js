import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <div className={`side-nav ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link onClick={toggleSidebar}>
              {isOpen ? (
                <i className="fa-solid fa-door-open"></i>
              ) : (
                <i className="fa-solid fa-door-closed"></i>
              )}
            </Link>
          </li>
          <li>
            <i className="fa-solid fa-heart"></i>
          </li>
          <li>
            <i className="fa-solid fa-share"></i>
          </li>
          <li>
            <i className="fa-solid fa-bullhorn"></i>
          </li>
        </ul>
        {isOpen && (
          <div>
            <div className="search-section">
              <input id="search" type="text" placeholder="Search.." />
              <label htmlFor="search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </label>
            </div>
            <div className="hide-icons-section">
              <h3>Hide Icons</h3>
              <input type="radio" name="blood" id="hideicons" />
              <label htmlFor="hideicons">Blood</label>
              <br />
              <input type="radio" name="hospital" id="hideicons" />
              <label htmlFor="hideicons">Hospital</label>
              <br />
            </div>
            <div className="feedback-section">
              <div className="feedback-text"></div>
              <button className="btn green feedback">FeedBack</button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SideNav;
