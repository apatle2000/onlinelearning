import React, { useEffect } from 'react';
import { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStates } from '../../Contents/States';
import axios from "axios";
import {Grid} from '@mui/material';
import ContentCard from '../../building_blocks/ContentCard';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


function IntoModuletests(){

    //to navigate
    const navigate = useNavigate();

    //using uselocation hook for accessing the data passed from previous page
    const location = useLocation();
    
    // context variables
    const {Token,LoggedAs} = useContext(AppStates);
  
    //states
    const [content,UpdateContent]=useState([]);

    //run the first time
    useEffect(()=>{
        axios.post("/courses/getspecificmodule/",{"token":Token,"module_id":location.state.module_id})
              .then(result =>{
                  console.log(result.data.values); 
                  if(result.data.code === 200){
                    UpdateContent(result.data.values); 
                  }
                  else if(result.data.code === 203){
                    UpdateContent([]);
                  }
                  else if(result.data.code === 401){
                      navigate("/logout");
                  } 
              })
              .catch(result =>{
                  console.log("Error occured ");
              })
    },[]);


    //reload dome componets when the values of Token and LoggedAs change
    useEffect(()=>{
        if(Token && LoggedAs === "admin"){
          navigate("/admin");
        }
        else if(Token && LoggedAs === "staff"){ 
          navigate("/staff");
        }
        else if (!Token || !LoggedAs || !["student","staff","admin"].includes(LoggedAs) ){
          alert("state error, logging out");
          navigate("/logout");
        }
        //console.log("what the value :",(!(Token) || !(["student","staff","admin"].includes(LoggedAs))));
      },[Token,LoggedAs]);


      //function to render the module details onto the page
      const rendermodule=()=>{
            if (content){
                return(
                    <>
                    <Container className='contentContainer'>
                      <Container className='subContainer'>
                        <h6>module number :</h6>
                        <h6>{content.module_id}</h6>
                      </Container>
                      <Container className='subContainer'>
                        <h6>module name :</h6>
                        <h6>{content.module_name}</h6>
                      </Container>
                      <Container className='subContainer'>
                        <h6>module description :</h6>
                        <h6>{content.module_description}</h6>
                      </Container>
                      <Container className='subContainer'>
                        <h6>content :</h6>
                        <h6>{content.content}</h6>
                      </Container>
                    </Container>
                    </>
                );
            }
            else{
                return(
                    <>
                    <h4>Module has no data in it </h4>
                    </>
                );
            }
      };

      return (
        <>
            <div>
                <label>This page contains all the modules details </label>
            </div>
            {/* <h1>The regester Courses page</h1> */}
            {/* {gripper(content)} */}
            {rendermodule()}
        </>
    );
  
}

export default IntoModuletests;