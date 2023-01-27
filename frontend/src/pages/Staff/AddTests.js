import React, { useEffect } from 'react';
import { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStates } from '../../Contents/States';
import axios from "axios";
import Container from 'react-bootstrap/Container';

function AddTests(){

  //to navigate
  const navigate = useNavigate();
  
  // context variables
  const {Token,LoggedAs} = useContext(AppStates);

  // state variables
  const [Formstate,UpdateFormstate] = useState({
        test_name : "",
    
  });


  // function to submit the form
  const submitThis=(e)=>{
    e.preventDefault();
    //check conditions 
    let flag = true;
    let alertlog = "";

    if( Formstate.test_name.length <1 || Formstate.test_name.length>30){
      flag = false;
      alertlog = alertlog +"\nTest name should be between 1 and 30 charecters";
    }


    if (flag){
      const payload = {
            "test_name" : Formstate.test_name,
            "token" : Token,
      };

      //console.log(payload);
      
      axios.post("/courses/addtest/",payload)
      .then(result =>{
        console.log(result.data);

        if(result.data.code === 203){
          alert(result.data.message);
          navigate("/logout");
        }

        else if(result.data.code === 401){
          alert(result.data.message);
        }
        else if(result.data.code === 200){
          navigate("/testmanager",{state:{tests_id:result.data.get("test_id")}});
        }
      })
      .catch(result =>{
        navigate("/error");
      })	
    }
    else{
      alert(alertlog);
    }
  }

  const handleChange=(e)=>{
    
    const {name,value} = e.target;
    UpdateFormstate((prev)=>{return{...prev,[name]:value}});
    //console.log(Formstate);
  }


  //reload dome componets when the values of Token and LoggedAs change
  useEffect(()=>{
    if(Token && LoggedAs === "admin"){
      console.log("go to admin page");
      navigate("/admin");
    }
    else if(Token && LoggedAs === "student"){
      console.log("go to student page");
      navigate("/student");
    }
    else if (!Token || !LoggedAs || !["student","staff","admin"].includes(LoggedAs) ){
      alert("state error, logging out");
      navigate("/logout");
    }
    //console.log("what the value :",(!(Token) || !(["student","staff","admin"].includes(LoggedAs))));
    },[Token,LoggedAs]);

  return (
    <>  
    <div className='AddTests'>
    <div className='divPad-big'/>
    <div className='container-login'>
    <h1> Add Test</h1>
    <span>________________</span>
      <form>
      <label>Enter Test Name</label>
      <input type='text' placeholder='Enter the Test name' name ="test_name" onChange={handleChange}/>
      <div className='divPad-big'/>
      <div className='divPad-big'/>
      <button onClick={submitThis}>Add Test</button>
      </form>
    </div>
    <div className='divPad-big'/>
    <div className='divPad-big'/>
    </div>
</>
  );

}


export default AddTests;