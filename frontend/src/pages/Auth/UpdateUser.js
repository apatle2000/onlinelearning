import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppStates } from "../../Contents/States";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import axios from "axios";

function UpdateUser() {
  //to navigate
  const navigate = useNavigate();

  // context variables
  const { Token, LoggedAs, UpdateLoggedAs, UpdateToken } = useContext(
    AppStates
  );

  // state variables
  const [Formstate, UpdateFormstate] = useState({
    firstname: "",
    lastname: "",
    UserId: "",
    email: "",
    contact: "",
    gender: "unknown",
  });

  const [oldData, UpdateOldData] = useState({
    firstname: "",
    lastname: "",
    UserId: "",
    email: "",
    contact: "",
    gender: "unknown",
  });

  // function to submit the form
  const submitThis = (e) => {
    e.preventDefault();
    //check conditions
    let flag = true;
    let alertlog = "";

    if (Formstate.UserId.length < 1 || Formstate.UserId.length > 30) {
      flag = false;
      alertlog = alertlog + "\nUser Id should be between 1 and 30 charecters";
    }
    if (Formstate.firstname.length < 1 || Formstate.firstname.length > 30) {
      flag = false;
      alertlog =
        alertlog + "\nUser's first should be between 1 and 30 charecters";
    }

    if (flag) {
      const payload = {
        first_name: Formstate.firstname,
        last_name: Formstate.lastname,
        username: Formstate.UserId,
        gender: Formstate.gender,
        email: Formstate.email,
        contact: Formstate.contact,
        token: Token,
      };

      axios
        .post("/login/updateuser/", payload)
        .then((result) => {
          if (result.data.code === "user error") {
            // failed token
            alert(result.data.message);
            navigate("/logout");
          } else if (result.data.code === "token error") {
            alert(result.data.message);
            navigate("/logout");
          } else if (result.data.code === "process error") {
            alert(result.data.message);
          } else if (result.data.code === "good") {
            navigate("/profile");
          }
        })
        .catch((result) => {
          navigate("/error");
        });
    } else {
      alert(alertlog);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    UpdateFormstate((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //load data for the first time into the the formdata
  useEffect(() => {
    axios
      .post("/login/get_me/", { token: Token })
      .then((result) => {
        if (result.data.code === 203) {
          alert(result.data.message);
          navigate("/logout");
        } else if (result.data.code === 400) {
          navigate("/logout");
        } else {
          let tempx = result.data.values;

          UpdateFormstate({
            firstname: tempx["first_name"],
            lastname: tempx["last_name"],
            UserId: tempx["username"],
            email: tempx["email"],
            contact: tempx["contact"],
            gender: tempx["gender"],
          });

          UpdateOldData({
            firstname: tempx["first_name"],
            lastname: tempx["last_name"],
            UserId: tempx["username"],
            email: tempx["email"],
            contact: tempx["contact"],
            gender: tempx["gender"],
          });
        }
      })
      .catch((result) => {
        console.log("Loading...");
      });
  }, []);

  //reload dome componets when the values of Token and LoggedAs change
  useEffect(() => {
    if (
      !(Token === LoggedAs) &&
      (!Token || !["student", "staff", "admin"].includes(LoggedAs))
    ) {
      alert("state error, logging out");
      navigate("/logout");
    }
  }, [Token, LoggedAs, UpdateToken]);

  return (
    <>
      <div className="update">
        <div className="divPad-big" />
        <div className="container-login">
          <h1> Update</h1>
          <span>________________</span>
          <div className="divPad-small" />
          <p>Enter the new values if you want to change them</p>
          <form>
            <label>First Name : {oldData.firstname} </label>
            <input
              type="text"
              placeholder="Enter new first name"
              name="firstname"
              id="firstname"
              onChange={handleChange}
            />
            <label>Last Name : {oldData.lastname} </label>
            <input
              type="text"
              placeholder="Enter the new last name"
              name="lastname"
              id="lastname"
              onChange={handleChange}
            />
            <label>User-Id: {oldData.UserId}</label>
            <input
              type="text"
              placeholder="Enter the new user id"
              name="UserId"
              id="UserId"
              onChange={handleChange}
            />
            <label>Email: {oldData.email}</label>
            <input
              type="email"
              placeholder="Enter the new email"
              name="email"
              id="email"
              onChange={handleChange}
            />
            <label>Contact: {oldData.contact}</label>
            <input
              type="number"
              placeholder="-"
              name="contact"
              id="contact"
              onChange={handleChange}
            />
            <div className="divPad" />
            <label>Gender</label>
            <DropdownButton
              name="gender"
              align="start"
              title={Formstate.gender}
            >
              <Dropdown.Item
                onClick={() => {
                  UpdateFormstate((prev) => {
                    return { ...prev, ["gender"]: "male" };
                  });
                }}
              >
                Male
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  UpdateFormstate((prev) => {
                    return { ...prev, ["gender"]: "female" };
                  });
                }}
              >
                FeMale
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  UpdateFormstate((prev) => {
                    return { ...prev, ["gender"]: "others" };
                  });
                }}
              >
                Others
              </Dropdown.Item>
            </DropdownButton>
            <div className="divPad-big" />

            {/* Date picker code comes over here  */}

            <div className="divPad-big" />
            <button onClick={submitThis}>Update Profile</button>
          </form>
          <div className="divPad" />
        </div>
        <div className="divPad-big" />
        <div className="divPad-big" />
      </div>
    </>
  );
}

export default UpdateUser;
