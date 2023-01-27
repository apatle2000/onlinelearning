import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppStates } from '../../Contents/States';
import axios from 'axios';

function Logout() {

    //to navigate
    const navigate = useNavigate();
    // context variables
    const {Token,UpdateLoggedAs,UpdateToken} = useContext(AppStates);

    useEffect(()=>{
    //deleting the local variables
      UpdateToken(null);
      UpdateLoggedAs(null);
      
    },[]);

    

    axios.post("/login/logout/",{"token":Token})
        .then(result =>{
            console.log(result);  
        })
        .catch(result =>{
            console.log("Logging out ");
        });

  return (
    <div>Logout</div>
  )
}

export default Logout;
