import React, { useEffect } from 'react';
import { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStates } from '../../Contents/States';
import axios from "axios";
import {Grid} from '@mui/material';
import ContentCard from '../../building_blocks/ContentCard';

function TestScores(){

  //to navigate
  const navigate = useNavigate();
  
  // context variables
  const {Token,LoggedAs,UpdateLoggedAs,UpdateToken} = useContext(AppStates);

  //states
  const [content,UpdateContent]=useState([]);

  //run the first time
  useEffect(()=>{
      axios.post("/courses/getallcourses/",{"token":Token})
            .then(result =>{
                console.log(result); 
                if (result.data.values){
                  UpdateContent([]);  
                }
                else{
                  UpdateContent(result.data.values);
                } 
            })
            .catch(result =>{
                console.log("Error occured ");
            })
  },[]);

  //reload dome componets when the values of Token and LoggedAs change
  useEffect(()=>{
    if(Token && LoggedAs === "admin"){
      console.log("go to admin page");
      navigate("/admin");
    }
    else if(Token && LoggedAs === "staff"){
      console.log("go to staff page");
      navigate("/staff");
    }
    else if (!(Token === LoggedAs) && (!Token || !["student","staff","admin"].includes(LoggedAs))){
      alert("state error, logging out");
      navigate("/logout");
    }
    //console.log("what the value :",(!(Token) || !(["student","staff","admin"].includes(LoggedAs))));
  },[Token,LoggedAs,UpdateToken]);

  //function to put out a grid of objects if data exists else a blank message
  const gripper =(e)=>{
      if(e){
          return (
              e.map( item =>(
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                      <Grid item xs={2} sm={4} md={4} key={item["id"]}>
                          <div onClick={()=>{console.log(item["id"],item)}}>
                              <ContentCard data={item}/>
                          </div> 
                      </Grid>             
                  </Grid>    
              ))
          );
      }
      else{
          return(
              <h2>No Test attempted</h2>
          );
      }
  };



  return (
      <>
          {/* <h1>The regester Courses page</h1> */}
          {gripper(content)}
      </>
  );

}

export default TestScores;