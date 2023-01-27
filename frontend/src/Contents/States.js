
import { createContext } from "react";

export const AppStates =createContext({});



// other option to impliment the same thing 


// import {createGlobalState } from "react-hooks-global-state";

// //console.log((localStorage.getItem("Theme"))  ? localStorage.getItem("Theme") : "dark" , "loading into global state");

// const {setGlobalState, getGlobalState } = createGlobalState({
//     Theme : localStorage.getItem("Theme") ? localStorage.getItem("Theme") : "dark" ,
//     Token : localStorage.getItem("Token") ? localStorage.getItem("Token") : "" ,
//     LoggedAs :localStorage.getItem("LoggedAs") ? localStorage.getItem("LoggedAs") : "Unknown" ,

// });



// export {setGlobalState, getGlobalState};

