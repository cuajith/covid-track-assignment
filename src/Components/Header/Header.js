import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "../../styles/header.css";

const Header = () => {
  return (
    <div className="container-fluid header">
      <Navbar expand="lg" className="justify-content-between">
        <Navbar.Brand href="/">
          <img src="./images/Assiduus_TM_Logo--1-.png" alt="logo" />
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default Header;
