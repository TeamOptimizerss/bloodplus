import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./screens/Home";
import Signup from "./components/Signup";
import AboutUs from "./components/AboutUs";
import SideNav from "./components/SideNav";
import Footer from "./components/Footer";
import { UserProvider } from "./components/UserContext";
import { EventTriggerProvider } from "./components/EventTriggerContext";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <UserProvider>
      <EventTriggerProvider>
        <Fragment>
          <Router>
            <Nav></Nav>
            <SideNav></SideNav>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/donors" element={<Signup />}>
                <Route path="signup" element={<SignUpForm />} />
                <Route path="login" element={<LoginForm />} />
              </Route>
              <Route exact path="/aboutus" element={<AboutUs />} />
            </Routes>
            <Footer></Footer>
            <ToastContainer />
          </Router>
        </Fragment>
      </EventTriggerProvider>
    </UserProvider>
  );
}

export default App;
