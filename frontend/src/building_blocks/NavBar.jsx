import React from "react";
import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { AppStates } from "../Contents/States";

const NavBar = () => {
  const { DarkTheme, ToggleTheme, LoggedAs } = useContext(AppStates);

  /*
        possible states:
        "unknown" for logged out and non logged-in 
        "student" for students logged in
        "admin" for admin logged in 
        "staff" for staff logged in
    */

  switch (LoggedAs) {
    case "student":
      return (
        <Navbar
          className="Navbar"
          bg={DarkTheme ? "dark" : "light"}
          variant={DarkTheme ? "dark" : "light"}
        >
          <div className="divPad" />
          <Navbar.Brand href="/student">ONLINE LEARNING </Navbar.Brand>
          <div className="divPad-small" />
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/mycourses">My Courses</Nav.Link>
              <Nav.Link href="/regestercourses">Courses</Nav.Link>
              <Nav.Link href="/tests">Tests</Nav.Link>
              <Nav.Link href="/testscores">Test Scores</Nav.Link>
            </Nav>
            <Nav>
              <Button
                id="themes"
                onClick={() => {
                  ToggleTheme(!DarkTheme);
                }}
              >
                {DarkTheme ? "LIGHT THEME" : "DARK THEME"}
              </Button>
              <div className="divPad-small" />
              <Button id="profile">
                <Nav.Link href="/profile">Profile</Nav.Link>
              </Button>
              <div className="divPad" />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    case "staff":
      return (
        <Navbar
          className="Navbar"
          bg={DarkTheme ? "dark" : "light"}
          variant={DarkTheme ? "dark" : "light"}
        >
          <div className="divPad" />
          <Navbar.Brand href="/staff">ONLINE LEARNING </Navbar.Brand>
          <div className="divPad-small" />
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/madecourses">My Courses</Nav.Link>
              <Nav.Link href="/addcourses">Add Courses</Nav.Link>
              <Nav.Link href="/madetests">My Tests</Nav.Link>
              <Nav.Link href="/addtests">Add Tests</Nav.Link>
            </Nav>
            <Nav>
              <Button
                id="themes"
                onClick={() => {
                  ToggleTheme(!DarkTheme);
                }}
              >
                {DarkTheme ? "LIGHT THEME" : "DARK THEME"}
              </Button>
              <div className="divPad-small" />
              <Button id="profile">
                <Nav.Link href="/profile">Profile </Nav.Link>
              </Button>
              <div className="divPad" />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    case "admin":
      return (
        <Navbar
          className="Navbar"
          bg={DarkTheme ? "dark" : "light"}
          variant={DarkTheme ? "dark" : "light"}
        >
          <div className="divPad" />
          <Navbar.Brand href="/admin">ONLINE LEARNING </Navbar.Brand>
          <div className="divPad-small" />
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/Signup">Signup</Nav.Link>
            </Nav>
            <Nav>
              <Button
                id="themes"
                onClick={() => {
                  ToggleTheme(!DarkTheme);
                }}
              >
                {DarkTheme ? "LIGHT THEME" : "DARK THEME"}
              </Button>
              <div className="divPad-small" />
              <Button id="profile">
                <Nav.Link href="/profile">Profile</Nav.Link>
              </Button>
              <div className="divPad" />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
  }

  return (
    <Navbar
      className="Navbar"
      bg={DarkTheme ? "dark" : "light"}
      variant={DarkTheme ? "dark" : "light"}
    >
      <div className="divPad" />
      <Navbar.Brand href="/">ONLINE LEARNING </Navbar.Brand>
      <div className="divPad-small" />
      <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/Signup">Signup</Nav.Link>
        </Nav>
        <Nav>
          <Button
            id="themes"
            onClick={() => {
              ToggleTheme(!DarkTheme);
            }}
          >
            {DarkTheme ? "LIGHT THEME" : "DARK THEME"}
          </Button>
          <div className="divPad-small" />
          <div className="divPad" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
