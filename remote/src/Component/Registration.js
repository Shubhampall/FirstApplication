import React, { useEffect, useReducer } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, Redirect, Switch } from 'react-router-dom';
import { Base64 } from 'js-base64';

const initialstate={
    Email :"",
    First:"",
    Last :"",
    Password:"",
}
  
  const reducer=(state,action)=>{
   switch(action.type){
        case "Email":
           return{...state,Email:action.value}
        case "First_name":
           return{...state,First:action.value}   
        case "Last_name":
            return{...state,Last:action.value}
        case "Password":
            return{...state,Password:action.value}
        }
  }
function Registration() { 
    const [state,dispatch]=useReducer(reducer,initialstate)
  const styles={
button :{
    margin :15
}}
const setData=(e)=>{
    e.preventDefault();
    const a= Base64.encode(state.Password)
    fetch(`http://localhost:3333/users?email=${state.Email}`)
    .then((response) => response.json())
    .then((json) =>{if(json.length==0){
        fetch('http://localhost:3333/users', {
            method: 'POST',
            body: JSON.stringify({
              email :state.Email,
              first_name:state.First,
              last_name:state.Last,
              password:a
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
          .then(async response => {
              const data = await response.json();
              if (!response.ok) {
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
          })
          .catch(error => {
              console.error('There was an error!', error);
          });     
        alert("Sucessfully Registered")
        window.location.href='/'
        
    } else{
        alert("Email already registerd")
    }
})
}
    return (
      <form onSubmit={setData}>
      <MuiThemeProvider>
            <React.Fragment>
                <AppBar title="Registration"/>
            <TextField 
            hintText="Enter Your Email"
            floatingLabelText="Email"
            value={state.Email}
            onChange={e=>{dispatch({type :"Email", value:e.target.value})}} required
            /><br/>
           <TextField 
            hintText="Enter Your First Name"
            floatingLabelText="First_Name"
            value={state.First}
            onChange={e=>{dispatch({type :"First_name", value:e.target.value})}} required 
           /><br/>
            <TextField 
            hintText="Enter Your Last Name"
            floatingLabelText="Last_Name"
            value={state.Last}
            onChange={e=>{dispatch({type :"Last_name", value:e.target.value})}} required 
            /><br/>
            <TextField 
            hintText="Enter Your Password"
            floatingLabelText="password"
            type="password" 
            value={state.Password}
            onChange={e=>{dispatch({type :"Password", value:e.target.value})}} required 
            />
            <br/>
            <RaisedButton 
             label="Click"
             primary={true}
             style={styles.button}
             type="submit"
            />
            </React.Fragment>
        </MuiThemeProvider>
        </form>
    )
}

export default Registration
