import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./screens/Home";
import AboutUs from "./components/AboutUs";
import SideNav from "./components/SideNav";

function App() {
  return (
    <Fragment>
      <Router>
        <Nav></Nav>
        <SideNav></SideNav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
