import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppStates } from "../../Contents/States";
import axios from "axios";
import { Container } from "@mui/system";

function Profile() {
  //to navigate
  const navigate = useNavigate();

  // context variables
  const { Token, LoggedAs, UpdateLoggedAs, UpdateToken } = useContext(
    AppStates
  );

  // variable to store all the data coming from request
  const [userData, updateUserData] = useState({});

  // function to fetch data
  const fetchData = () => {
    axios
      .post("/login/get_me/", { token: Token })
      .then((result) => {
        //console.log(result.data);
        if (result.data.code === "user error") {
          navigate("/login");
        } else if (result.data.code === "token error") {
          navigate("/logout");
        } else {
          updateUserData(result.data.values);
        }
      })
      .catch((result) => {
        console.log("Loading...");
      });
  };

  // to be called only once to load all data using the fetchData function
  useEffect(() => {
    const arr = ["student", "staff", "admin"];
    if (Token && arr.includes(LoggedAs)) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, []);

  // if user is not known go to login page
  useEffect(() => {
    if (!Token || !LoggedAs) {
      UpdateToken(null);
      UpdateLoggedAs(null);
      navigate("login");
    }
  }, [Token, LoggedAs]);
  return (
    <>
      <div className="divPad-big" />
      <div className="Profile">
        <div className="divPad-big" />
        <div className="divPad-big" />
        <h1> Profile</h1>
        <span>________________</span>
        <div className="divPad-big" />
        <button
          onClick={() => {
            navigate("/updateuser");
          }}
        >
          UPDATE
        </button>
        <Container className="contentContainer">
          <Container className="subContainer">
            <label>Name</label>
            <p>{userData["first_name"] + " " + userData["last_name"]}</p>
          </Container>
          <Container className="subContainer">
            <label>User-Id</label>
            <p>{userData["username"]}</p>
          </Container>
          <Container className="subContainer">
            <label>Desegnation</label>
            <p>{userData["roll"]}</p>
          </Container>
          <Container className="subContainer">
            <label>Email</label>
            <p>{userData["email"]}</p>
          </Container>
          <Container className="subContainer">
            <label>contact number</label>
            <p>{userData["contact_number"]}</p>
          </Container>
          <Container className="subContainer">
            <label>Gender</label>
            <p>{userData["gender"]}</p>
          </Container>
        </Container>
        <div className="divPad" />
        <div className="divPad-big" />
        <button onClick={() => navigate("/logout")}>Signout</button>
      </div>
      <div className="divPad-big" />
      <div className="divPad-big" />
    </>
  );
}

export default Profile;
