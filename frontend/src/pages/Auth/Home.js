import React from 'react';
import { useContext } from 'react';
import { AppStates } from '../../Contents/States';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import logout from './Logout';
// import Signup from './Signup';
// import Login from './Login';

function Home (params){

    //to navigate
    const navigate = useNavigate();
    // context variables
    const {Token,LoggedAs,UpdateLoggedAs,UpdateToken} = useContext(AppStates);

    //reload dome componets when the values of Token and LoggedAs change
    useEffect(()=>{
        if(Token && LoggedAs === "admin"){
          navigate("/admin");
        }
        else if(Token && LoggedAs === "staff"){
          navigate("/staff");
        }
        else if(Token && LoggedAs === "student"){
          navigate("/student");
        }
        //console.log("what the value :",(!(Token) || !(["student","staff","admin"].includes(LoggedAs))));
      },[Token,LoggedAs,UpdateToken]);

	return ( 
    <div className='home_page' >
        <header>
        
        </header>  

        <h1 >Welcome to the Home page</h1>
    
        <div>
            <ul>
                <li>
                    <button onClick={() => navigate("/login")}>Login</button>
                </li>
                <div className='divPad-big'/>
                <li>
                    <button onClick={() => navigate("/signup")}>Signup</button>
                </li>
            </ul>
        </div>  

        <footer>
            
            
        </footer>   
    </div>
    );

}

export default Home;

