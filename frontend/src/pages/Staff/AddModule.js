import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import { useState , useContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppStates } from '../../Contents/States';
import axios from "axios";

function AddModule(){

    //using uselocation hook for accessing the data passed from previous page
    const location = useLocation();

    //to navigate
    const navigate = useNavigate();
    
    // context variables
    const {Token,LoggedAs} = useContext(AppStates);

    // state variables
    const [Formstate,UpdateFormstate] = useState({
        name : "",
        number : 0,
        description : "",
        type : "",
        content : "",

    });

    //local variables for page 
    let pagevar = {};

    useEffect(()=>{
      pagevar = location.state? {...location.state}:{cource_name :" ",course_id:null};
      //console.log(pagevar);
    },[]);

    //reload dome componets when the values of Token and LoggedAs change
    useEffect(()=>{
      if(Token && LoggedAs === "admin"){
        navigate("/admin");
      }
      else if(Token && LoggedAs === "student"){
        navigate("/student");
      }
      else if (!Token || !LoggedAs || !["student","staff","admin"].includes(LoggedAs) ){
        alert("state error, logging out");
        navigate("/logout");
      }
      //console.log("what the value :",(!(Token) || !(["student","staff","admin"].includes(LoggedAs))));
    },[Token,LoggedAs]);

    
    // function to submit the form
    const submitThis=(e)=>{
        e.preventDefault();
        //check conditions 
        let flag = true;
        let alertlog = "";

        if( Formstate.name.length <1 || Formstate.name.length>30){
            flag = false;
            alertlog = alertlog +"\nModule name should be between 1 and 30 charecters";
        }


        if (flag){
        const payload = {
                "token" : Token,
                "module_name" : Formstate.name,
                "course_id" : location.state.course_id,
                "content" :Formstate.content,
                "module_num" : Formstate.number,
                "module_description" : Formstate.description,
                "module_type" : Formstate.type,
                
        };
        
        axios.post("/courses/addmodule/",payload)
        .then(result =>{
            console.log(result.data);

            if(result.data.code === 203){
                alert(result.data.message);
                navigate("/logout");
            }
            else if(result.data.code === 401){
                alert(result.data.message + "" + result.data.values);
            }
            else if(result.data.code === 204){
                alert(result.data.message + "" + result.data.values);
            }    
            else if(result.data.code === 200){
                navigate("/coursemanager",{state:location.state});
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

    // function the update the value eveytime the value is entered by the user
    const handleChange=(e)=>{

        const {name,value} = e.target;
        UpdateFormstate((prev)=>{return{...prev,[name]:value}});
    }
        

return (
  <>  

    <Container className='pagebar'>
       <button onClick={()=>{navigate("/coursemanager",{state:location.state})}}>Go Back</button>  
       <h4 >{location.state.course_name}</h4>     
    </Container>
    <div>
    <div className='AddCourses'>
        <div className='divPad-big'/>
        <div className='container-login'>
        <h1> Add Module</h1>
        <span>________________</span>
        <form>
        <label>Enter Module Number</label>    
        <input type='number' placeholder='Enter the Module number' name ="number" onChange={handleChange}/>
        <label>Enter Module Name</label>
        <input type='text' placeholder='Enter the Module name' name ="name" onChange={handleChange}/>
        <label>Enter Module Description</label>
        <input type='text' placeholder='Enter the Module description' name ="description" onChange={handleChange}/>
        <label>Enter Module Type</label>
        <input type='text' placeholder='Enter the Module Type' name ="type" onChange={handleChange}/>
        <label>Enter Module Content</label>
        <input type='text' placeholder='Enter the Module name' name ="content" onChange={handleChange}/>
        <div className='divPad-big'/>
        <div className='divPad-big'/>
        <button onClick={submitThis}>Add Module</button>
        </form>
        </div>
        <div className='divPad-big'/>
        <div className='divPad-big'/>
        </div>
    </div>
  </>    
);


}

export default AddModule;