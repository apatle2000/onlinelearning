import React, { useEffect } from 'react';
import { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStates } from '../../Contents/States';
import axios from "axios";

function Login (){

    //to navigate
    const navigate = useNavigate();
    // context variables
    const {Token,LoggedAs,UpdateLoggedAs,UpdateToken} = useContext(AppStates);

    // reference variables
    const [Formstate,UpdateFormstate] = useState({
      user_name : "",
      password :""
    });


    const handleChange=(e)=>{
      
      const {name,value} = e.target;
      UpdateFormstate((prev)=>{return{...prev,[name]:value}});
      //console.log(Formstate);
    }


    const submitThis=(e) => {
      e.preventDefault();
      const payload = {
        "username" : Formstate.user_name,
        "password" : Formstate.password
      };
      axios.post("/login/login/",payload)
      .then (result =>{
          console.log(result);
          const eater = result.data
          if (eater["reply"]=== "approved"){
            UpdateToken(eater["token"]);
            UpdateLoggedAs(eater["loggedAs"]);
            // localStorage.setItem("Token",eater["token"]);
            // localStorage.setItem("LoggedAs",eater["loggedAs"]);
          }
      })
      .catch(e =>{
          navigate("/error");
      })
    }



    //reload dome componets when the values of Token and LoggedAs change
    useEffect(()=>{
      console.log(Token, LoggedAs);
      //console.log(LoggedAs,Token,!["student","staff","admin"].includes(LoggedAs));
      if(Token !==null && LoggedAs === "admin"){
        navigate("/admin");
      }
      else if(Token !==null && LoggedAs === "staff"){
        navigate("/staff");
      }
      else if(Token !==null && LoggedAs === "student"){
        navigate("/student");
      }
      
      //console.log("what the value :",(!(Token) || !(["student","staff","admin"].includes(LoggedAs))));
    },[Token,LoggedAs,UpdateToken]);

    

    return (
            <>  
                <div className='divPad-big'/>
                <div className='LOGIN'>
                <div className='divPad-big'/>
                  <div className='container-login'>
                  <div className='divPad-big'/>
                  <h1> LOGIN</h1>
                  <span>________________</span>
                  <div className='divPad-big'/>
                    <form>
                      <label>User-Id</label>
                      <input type='text' placeholder='Enter your user id ' name="user_name" id="user_name" onChange={handleChange}/>
                      <label>Password</label>
                      <input type='password' placeholder='Enter your password' name="password" id="password" onChange={handleChange}/>
                      <div className='divPad'/>
                      <button onClick={submitThis}>Log In</button>
                    </form>
                    {/* <div className='bottom'>
                      <p>Forget your password?</p>
                      <a href='/forgotcreds'>Reset Password</a> 
                    </div> */}
                    <div className='divPad'/>
                    <button onClick={()=>navigate("/signup")}>Create Account</button>
                  </div>
                  <div className='divPad-big'/>
                  <div className='divPad-big'/>
                  </div>
            </>

    );
  };

export default Login;
