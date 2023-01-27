import React, { useEffect } from 'react';
import { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStates } from '../../Contents/States';
import axios from "axios";

function AddCourses(){

    //to navigate
    const navigate = useNavigate();
    
    // context variables
    const {Token,LoggedAs,UpdateLoggedAs,UpdateToken} = useContext(AppStates);

    // state variables
		const [Formstate,UpdateFormstate] = useState({
          course_name : "",
          course_description : ""
			
		});


		// function to submit the form
		const submitThis=(e)=>{
			e.preventDefault();
			//check conditions 
			let flag = true;
			let alertlog = "";

			if( Formstate.course_name.length <1 || Formstate.course_name.length>30){
				flag = false;
				alertlog = alertlog +"\nCourse name should be between 1 and 30 charecters";
			}


			if (flag){
				const payload = {
					"course_name" : Formstate.course_name,
          			"course_description" : Formstate.course_description,
          			"token" : Token,
				};
	
				console.log(payload);
				
				axios.post("/courses/addcourse/",payload)
				.then(result =>{
					console.log(result.data);
					if(result.data.code === 203){
						alert(result.data.message);
						navigate("/logout");
	
					  }
			  
					  else if(result.data.code === 401){
						alert(result.data.message);
						console.log("i ran");
					  }
					  else if(result.data.code === 200){
						// navigate to modules page 
						navigate("/coursemanager",{state:{...(result.data.values)}})
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
		  },[Token,LoggedAs,UpdateToken]);
		  

    return (
      <>  
      <div className='AddCourses'>
      <div className='divPad-big'/>
      <div className='container-login'>
      <h1> Add Course</h1>
      <span>________________</span>
        <form>
        <label>Enter Course Name</label>
        <input type='text' placeholder='Enter your course name' name ="course_name" onChange={handleChange}/>
        <label>Enter Course Description</label>
        <input type='text' placeholder='Enter course decription' name ="course_description" onChange={handleChange}/> 
        <div className='divPad-big'/>
        <div className='divPad-big'/>
        <button onClick={submitThis}>Add Course</button>
        </form>
      </div>
      <div className='divPad-big'/>
      <div className='divPad-big'/>
      </div>
  </>
    );

}

export default AddCourses;