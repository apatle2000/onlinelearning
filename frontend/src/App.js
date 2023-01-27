import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { useState, useEffect} from 'react';
import { AppStates } from './Contents/States';

//importing all the components 
import Home from './pages/Auth/Home';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import NotFound from './pages/Auth/NotFound';
import ForgotCreds from './pages/Auth/ForgotCreds';
import Staff from './pages/Staff/Staff';
import Student from './pages/Student/Student';
import Admin from './pages/Admin/Admin';
import NavBar from './building_blocks/NavBar';
import Profile from './pages/Auth/Profile';
import UpdateUser from './pages/Auth/UpdateUser';
import Auth from './pages/Auth/Auth';
import PageEnd from './building_blocks/footer';
import RegesterCourses from './pages/Student/RegesterCourses';
import MyCourses from './pages/Student/MyCourses';
import TestScores from './pages/Student/TestScores';
import Tests from './pages/Student/Tests';
import MadeCourses from './pages/Staff/MadeCourses';
import CourseManager from './pages/Staff/CourseManager';
import MadeTests from './pages/Staff/MadeTests';
import AddCourses from './pages/Staff/AddCourses';
import AddTests from './pages/Staff/AddTests';
import Logout from './pages/Auth/Logout';
import AddModule from './pages/Staff/AddModule';
import IntoCourse from './pages/Student/Intocourse';
import IntoModules from './pages/Student/IntoModules';
import IntoTests from './pages/Student/IntoTests';
import IntoModuletests from './pages/Student/IntoModuleTests';
import TestManager from './pages/Staff/TestManager';
import CourseTestManager from './pages/Staff/CourseTestManager';
import AddCourseTests from './pages/Staff/AddCourseTest';



function App() {
    //inatalizing a state 
    const [DarkTheme,ToggleTheme] = useState(
      (localStorage.getItem("DarkTheme")) ? localStorage.getItem("DarkTheme") : false 
    );
    const [Token,UpdateToken] = useState(
      (localStorage.getItem("Token")) ?localStorage.getItem("Token") : null // undefined value for not having any token
      );
    const [LoggedAs,UpdateLoggedAs] = useState(
      (localStorage.getItem("LoggedAs")) ? localStorage.getItem("LoggedAs") : null // undefined value for not being loggedAs
      );

      //update when state is changed
      useEffect(()=>{

        localStorage.setItem("DarkTheme",DarkTheme);
        localStorage.setItem("Token",Token);
        localStorage.setItem("LoggedAs",LoggedAs);
        
      },[DarkTheme,Token,LoggedAs]);

return (

    <AppStates.Provider value={
      {DarkTheme,ToggleTheme,
        Token,UpdateToken,
        LoggedAs,UpdateLoggedAs
      }
    }>
      <div className='App' data-theme={DarkTheme} >
        <NavBar/>
        <div className='divPad'/>
       <div className='mainbody'> 
        <Router > 
              <Routes>
                  <Route exact path='' element={< Home />}/>
                  <Route exact path='/' element={< Home />}/>
                  <Route exact path='/auth' element={< Auth/>}/>
                  <Route exact path='/logout' element={< Logout/>}/> 
                  <Route exact path='/login' element={< Login  />}/>
                  <Route exact path='/signup' element={< Signup />}/>
                  <Route exact path='/forgotcreds' element={< ForgotCreds />}/>
                  <Route exact path='/profile' element={< Profile />}/>
                  <Route exact path='/updateuser' element={<UpdateUser/>}/>
                  <Route exact path='/staff' element={< Staff />}/>
                  <Route exact path='/updatecources' element={<MyCourses/>}/>
                  <Route exact path='/madecourses' element={<MadeCourses/>}/>
                  <Route exact path='/admin' element={< Admin/>}/>
                  <Route exact path='/student' element={<Student />}/>
                  <Route exact path='/testscores' element={< TestScores/>}/>
                  <Route exact path='/mycourses' element={<MyCourses/>}/>
                  <Route exact path='/regestercourses' element={<RegesterCourses/>}/>
                  <Route exact path='/addcourses' element={<AddCourses/>}/>
                  <Route exact path='/addtests' element={<AddTests/>}/>
                  <Route exact path='/madetests' element={<MadeTests/>}/>
                  <Route exact path='/tests' element={<Tests/>}/>
                  <Route exact path='/intomoduletest' element={<IntoModuletests/>}/>
                  <Route exact path='/intotest' element={<IntoTests/>}/>
                  <Route exact path='/intocourse' element={<IntoCourse/>}/>
                  <Route exact path='/intomodules' element={<IntoModules/>}/>
                  <Route exact path='/coursemanager' element={<CourseManager/>}/>
                  <Route exact path='/addmodule' element={<AddModule/>}/>
                  <Route exact path='/addcoursetest' element={<AddCourseTests/>}/>
                  <Route exact path= '/testmanager' element={<TestManager/>}/>
                  <Route exact path= '/coursetestmanager' element={<CourseTestManager/>}/>
                  {/* <Route exact path='/updatecourses' element={<UpdateCourses/>}/>
                  <Route exact path='/updatemodule' element={<UpdateModule/>}/>
                  <Route exact path='/updatetest' element={<UpdateTest/>}/> */}
                  <Route exact path='/error'  element={<NotFound/>} />
                  <Route exact path='*'  element={<NotFound/>} />
              </Routes>
        </Router> 
        </div>
        <PageEnd/>
      </div> 
      </AppStates.Provider>

  );
}

export default App;
