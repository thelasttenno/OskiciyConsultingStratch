import React, {useState} from "react";
import Signin from "../sign-in/SignIn"

export const AdminHome = (props) => { 
  const [LoggedIn, SetLoggedIn] = useState(false);
  if (LoggedIn===true) {
    return (
      <div>
          <p>tests</p>
      </div>
  );

  } else {
    return (
      <div>
          
      </div>
  );
  }
  
}