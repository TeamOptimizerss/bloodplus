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
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/aboutus" element={<AboutUs />} />
            </Routes>
            <Footer></Footer>
          </Router>
        </Fragment>
      </EventTriggerProvider>
    </UserProvider>
  );
}

export default App;
