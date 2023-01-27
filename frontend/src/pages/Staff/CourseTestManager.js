import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppStates } from "../../Contents/States";
import axios from "axios";
import { Grid } from "@mui/material";
import ContentCard from "../../building_blocks/ContentCard";

function CourseTestManager() {
  //using uselocation hook for accessing the data passed from previous page
  const location = useLocation();
  console.log(location);

  //to navigate
  const navigate = useNavigate();

  // context variables
  const { Token, LoggedAs, UpdateLoggedAs, UpdateToken } = useContext(
    AppStates
  );

  //states
  const [content, UpdateContent] = useState([]);

  //run the first time
  useEffect(() => {
    axios
      .post("/students/getmycourses/", { token: Token })
      .then((result) => {
        console.log(result);
        if (result.data.code === 200) {
          UpdateContent(result.data.values);
        } else if (result.data.code === 203) {
          UpdateContent([]);
        } else if (result.data.code === 401) {
          navigate("/logout");
        }
      })
      .catch((result) => {
        console.log("Error occured ");
      });
  }, []);

  //reload dome componets when the values of Token and LoggedAs change
  useEffect(() => {
    if (Token && LoggedAs === "admin") {
      navigate("/admin");
    } else if (Token && LoggedAs === "student") {
      navigate("/student");
    } else if (
      !Token ||
      !LoggedAs ||
      !["student", "staff", "admin"].includes(LoggedAs)
    ) {
      alert("state error, logging out");
      navigate("/logout");
    }
    //console.log("what the value :",(!(Token) || !(["student","staff","admin"].includes(LoggedAs))));
  }, [Token, LoggedAs, UpdateToken]);

  //function to put out a grid of objects if data exists else a blank message
  const gripper = (e) => {
    if (e.length > 0) {
      console.log(e);
      return (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {e.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item["course_id"]}>
              <div
                onClick={() => {
                  navigate("/intocourse", { state: { ...item } });
                }}
              >
                <ContentCard data={item["course_name"]} />
              </div>
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return <h2>No questions Enrolled yet</h2>;
    }
  };

  return (
    <>
      <Container className="pagebar">
        <button
          onClick={() => {
            navigate("/coursemanager", { state: location.state });
          }}
        >
          Go Back
        </button>
        {/* <h4 >{location.state.course_name ? location.state.course_name : ""}</h4>       */}
      </Container>
      <div>
        <h5>The cource test questions page</h5>
      </div>
    </>
  );
}

export default CourseTestManager;
