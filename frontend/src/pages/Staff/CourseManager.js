import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppStates } from "../../Contents/States";
import axios from "axios";
import { Grid } from "@mui/material";
import ContentCard from "../../building_blocks/ContentCard";

function CourseManager() {
  //using uselocation hook for accessing the data passed from previous page
  const location = useLocation();
  console.log(location.state);

  //to navigate
  const navigate = useNavigate();

  // context variables
  const { Token, LoggedAs } = useContext(AppStates);

  //states
  const [content, UpdateContent] = useState([]);

  //local variables for page
  let pagevar = {};
  let toggle = true;

  //function to load all modules created
  const loadmodules = () => {
    toggle = false;
    console.log(toggle, "toggle");
    axios
      .post("/courses/getcoursemodule/", {
        token: Token,
        course_id: location.state.course_id,
      })
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
        console.log("Error occured while loading modules");
      });
  };

  //function to load all module tests created
  const loadmoduletests = () => {
    toggle = true;
    axios
      .post("/courses/getcoursetests/", {
        token: Token,
        course_id: location.state.course_id,
      })
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
        console.log("Error occured while loading modules");
      });
  };

  useEffect(() => {
    pagevar = location.state ? { ...location.state } : { cource_name: " " };
    //console.log(pagevar);
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
  }, [Token, LoggedAs]);

  // function to call sub functions
  const subcaller = (e, v) => {
    if (e) {
      if (v.length > 0) {
        console.log(v);
        return (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {console.log("in grid ")}
            {v.map((item) => (
              <Grid item xs={2} sm={4} md={4} key={item["test_id"]}>
                <div
                  onClick={() => {
                    console.log(item["test_id"], item);
                  }}
                >
                  <ContentCard data={item["test_name"]} />
                </div>
              </Grid>
            ))}
          </Grid>
        );
      } else {
        return <h2>No tests yet</h2>;
      }
    } else {
      if (v.length > 0) {
        console.log(v);
        return (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {v.map((item) => (
              <Grid item xs={2} sm={4} md={4} key={item["course_id"]}>
                <div
                  onClick={() => {
                    console.log(item["course_id"], item);
                  }}
                >
                  <ContentCard data={item["course_name"]} />
                </div>
              </Grid>
            ))}
          </Grid>
        );
      } else {
        return <h2>No modules yet</h2>;
      }
    }
  };

  return (
    <>
      <Container className="pagebar">
        <div>
          <button
            onClick={() => {
              loadmodules();
            }}
          >
            See Modules
          </button>
          <div className="divPad-small" />
          <button
            onClick={() => {
              loadmoduletests();
            }}
          >
            See Tests
          </button>
        </div>
        <div>
          <h4>{pagevar["cource_name"]}</h4>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/addmodule", { state: location.state });
            }}
          >
            Add Module +
          </button>
          <div className="divPad-small" />
          <button
            onClick={() => {
              navigate("/addcoursetest", { state: location.state });
            }}
          >
            Add Tests +
          </button>
        </div>
      </Container>
      <div>
        {/* {subcaller(toggle)} */}
        {/* <subcaller 
              e={toggle}
            /> */}
        {subcaller(toggle, content)}
      </div>
    </>
  );
}

export default CourseManager;
