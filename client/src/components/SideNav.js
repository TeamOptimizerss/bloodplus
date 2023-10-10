import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AutofillCheckoutDemo from "./AutofillCheckout";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Group");
  const filterRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsFilterOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    toggleFilter();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
          <div className="side-nav-div">
            <AutofillCheckoutDemo></AutofillCheckoutDemo>
            <div className="hide-icons-section">
              <h3>
                Hide Icons <i class="fa-regular fa-eye-slash"></i>
              </h3>
              <input type="radio" name="bloodhosp" id="blood" />
              <label htmlFor="blood" id="bloodlabel">
                <i className="fa-solid fa-droplet"></i> Blood
              </label>
              <br />
              <input type="radio" name="bloodhosp" id="hospital" />
              <label htmlFor="hospital" id="hospitallabel">
                <i className="fa-solid fa-hospital"></i> Hospital
              </label>
              <br />
            </div>
            <div className="feedback-section">
              <div className="feedback-text">
                Your feedback is valuable to us. It helps us understand your
                needs and preferences better. Whether you have suggestions for
                improvements, encountered issues, or just want to share your
                thoughts, please feel free to let us know. We appreciate your
                input in making our platform even better for you and others.
              </div>
              <button className="btn green feedback">FeedBack</button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SideNav;
