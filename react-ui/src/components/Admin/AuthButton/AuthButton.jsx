import React from "react";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";

export default function AuthButton(props) {
  const history = useHistory()
  console.log(props.props);
  return(props.props.token !== undefined
    ? <p>
        Welcome user! <Button  variant="outlined" onClick={() => {
          props.props.deleteCookie(() => history.push('/'))
        }}>Sign out</Button>
      </p>
    : <p>You are not logged in.</p>) 
}