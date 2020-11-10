import React, { useReducer } from 'react'
import { Link } from 'react-router-dom';
import { Base64 } from 'js-base64';
import './style.css';
import {Button,Form,FormGroup,Label,Input} from 'reactstrap';
const State={
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
    const [state,dispatch]=useReducer(reducer,State)
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
        <div className="bg">
            <div className="form1-container">
<Form className="login-form" onSubmit={setData}>
        <h1><span className="font-weight-bold">Registration</span></h1>
        <h2 className="text-center">Welcome</h2>
        <FormGroup className="right">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter Your Email" value={state.Email}
            onChange={e=>{dispatch({type :"Email", value:e.target.value})}} required />
        </FormGroup>
        <FormGroup className="right">
            <Label>First Name</Label>
            <Input type="text" placeholder="Enter Your First Name" value={state.First}
            onChange={e=>{dispatch({type :"First_name", value:e.target.value})}} required />
        </FormGroup>
        <FormGroup className="right">
            <Label>Last Name</Label>
            <Input type="text" placeholder="Enter Your Last Name" value={state.Last}
            onChange={e=>{dispatch({type :"Last_name", value:e.target.value})}} required />
        </FormGroup>
    
        <FormGroup className="right">
            <Label>Password</Label>
            <Input type="password" placeholder="Password" value={state.Password}
            onChange={e=>{dispatch({type :"Password", value:e.target.value})}} required />
        </FormGroup>
        <Button className="btn-lg btn-dark btn-block">Submit</Button>
        <div className="form-link">
        <Link style={{color:"darkblue"}} to="/">Login</Link>
        </div>
        </Form>
        </div>
    </div>
    )
}

export default Registration
