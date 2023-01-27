import React from 'react';
import axios from "axios";
import { useState , useContext} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStates } from '../../Contents/States';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Signup (){

	//to navigate
    const navigate = useNavigate();

    // context variables
    const {Token,LoggedAs,UpdateLoggedAs,UpdateToken} = useContext(AppStates);

	// state variables
		const [Formstate,UpdateFormstate] = useState({
			firstname : "",
			lastname : "",
			UserId :"",
			password1 : "",
			// password2 : "",
			email : "",
			contact : "",
			gender : "Others",
		});


		// function to submit the form
		const submitThis=(e)=>{
			e.preventDefault();
			//check conditions 
			let flag = true;
			let alertlog = "";

			if(Formstate.password1.length < 8 || Formstate.password1.length >30){
				flag = false;
				alertlog = alertlog +"\npassword should be between 8 and 30 charecters";
			}
			if( Formstate.UserId.length <1 || Formstate.UserId.length>30){
				flag = false;
				alertlog = alertlog +"\nUser Id should be between 1 and 30 charecters";
			}
			if( Formstate.firstname.length <1 || Formstate.firstname.length>30){
				flag = false;
				alertlog = alertlog +"\nUser's first should be between 1 and 30 charecters";
			}


			if (flag){
				const payload = {
					"first_name" : Formstate.firstname,
					"last_name" : Formstate.lastname,
					"username" : Formstate.UserId,
					"password" : Formstate.password1,
					"gender" : Formstate.gender,
					"email" : Formstate.email,
					"contact_number" : Formstate.contact,
				};
	
				console.log(payload);
				
				axios.post("/login/signup/",payload)
				.then(result =>{
					console.log(result.data);
					const eater = result.data
					if (eater["reply"] === "loginSuccessfull"){
						UpdateToken(eater["token"]);
						UpdateLoggedAs(eater["loggedAs"]);
						if(eater["loggedAs"] === "admin"){
							navigate("/admin");
						  }
						  else if(eater["loggedAs"] === "staff"){
							navigate("/staff");
						  }
						  else{
							navigate("/student");
						  }
					}
					else{
						alert(eater["reply"]);
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
			else if(Token && LoggedAs === "staff"){
			  console.log("go to staff page");
			  navigate("/staff");
			}
			else if(Token && LoggedAs === "student"){
			  console.log("go to student page");
			  navigate("/student");
			}
			//console.log("what the value :",(!(Token) || !(["student","staff","admin"].includes(LoggedAs))));
		  },[Token,LoggedAs,UpdateToken]);
		  
		  

		return(
		  <>  
			  <div className='signup'>
			  <div className='divPad-big'/>
				<div className='container-login'>
				<h1> SIGN-UP</h1>
				<span>________________</span>
				  <form>
					<label>First Name</label>
					<input type='text' placeholder='Enter your first name' name ="firstname" onChange={handleChange}/>
					<label>Last Name</label>
					<input type='text' placeholder='Enter your last name' name ="lastname" onChange={handleChange}/>
					<label>User-Id</label>
					<input type='text' placeholder='Enter your user id ' name = "UserId" onChange={handleChange}/>
					<label>Password</label>
					<input type='text' placeholder='Enter your password' name ="password1" onChange={handleChange}/>
					{/* <label>Re-enter Password</label>
					<input type='text' placeholder='Enter your password again' name ="password2" onChange={handleChange}/> */}
					<label>Email</label>
					<input type='email' placeholder='Enter your email id ' name = "email" onChange={handleChange}/>
					<label>Contact</label>
					<input type='number' placeholder='Enter your contact no ' name = "contact" onChange={handleChange}/>
					<div className='divPad'/>
						<label>Gender</label>
						<DropdownButton name="gender" align="start" title={Formstate.gender} >
						<Dropdown.Item onClick={()=>{UpdateFormstate((prev)=>{return{...prev,["gender"]:"male"}});}}>Male</Dropdown.Item>
						<Dropdown.Item onClick={()=>{UpdateFormstate((prev)=>{return{...prev,["gender"]:"female"}});}} >FeMale</Dropdown.Item>
						<Dropdown.Item onClick={()=>{UpdateFormstate((prev)=>{return{...prev,["gender"]:"others"}});}}>Others</Dropdown.Item>
						</DropdownButton>
					<div className='divPad-big'/>

					{/* Date picker code comes over here  */}

					<div className='divPad-big'/>
					<button onClick={submitThis}>SIGN UP</button>
				  </form>
				  <div className='divPad'/>
				  <p>Have an Account ?</p>
				  <button onClick={()=>navigate("/login")}>LOGIN</button>
				</div>
				<div className='divPad-big'/>
				<div className='divPad-big'/>
				</div>
		</>
		);
		
}

export default Signup;
