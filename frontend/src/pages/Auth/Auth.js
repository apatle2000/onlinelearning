import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppStates } from "../../Contents/States";
import axios from "axios";

function Auth() {
  //to navigate
  const navigate = useNavigate();

  // context variables
  const { Token, LoggedAs, UpdateLoggedAs, UpdateToken } = useContext(
    AppStates
  );

  //reload dome componets when the values of Token and LoggedAs change
  useEffect(() => {
    if (Token && LoggedAs === "admin") {
      console.log("go to admin page");
      navigate("/admin");
    } else if (Token && LoggedAs === "staff") {
      console.log("go to staff page");
      navigate("/staff");
    } else if (Token && LoggedAs === "student") {
      console.log("go to student page");
      navigate("/student");
    } else if (
      !(Token === LoggedAs) &&
      (!Token || !["student", "staff", "admin"].includes(LoggedAs))
    ) {
      alert("state error, logging out");
      axios
        .post("/login/logout/", { token: Token })
        .then((result) => {
          console.lot(result);
        })
        .catch((result) => {
          console.log("Logging out ");
        });
      UpdateToken(null);
      UpdateLoggedAs(null);
      navigate("/");
    }
    //console.log("what the value :",(!(Token) || !(["student","staff","admin"].includes(LoggedAs))));
  }, [Token, LoggedAs, UpdateToken]);

  return (
    <div>
      <h1>The Auth page</h1>
    </div>
  );
}

export default Auth;
