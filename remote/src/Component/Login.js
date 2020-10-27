import React,{useEffect, useReducer} from 'react'
import './style.css';

import { Base64 } from 'js-base64';
import { Link, Redirect } from 'react-router-dom';
import {Button,Form,FormGroup,Label,Input} from 'reactstrap';
const initialstate={
    Email :"",
    Password:"",
    loggedin:false,
}
const reducer=(state,action)=>{
    switch(action.type){
        case "Email":
            return{...state,Email:action.value}
        case "Password":
            return{...state,Password:action.value}
        case "Login":
            return{...state,loggedin:action.payload}
            }
   }

function Login() {
    const [state,dispatch]=useReducer(reducer,initialstate)
    const styles={
        button :{
            margin :15
        }}
    const submit=(e)=>{
        e.preventDefault();
       const a= Base64.encode(state.Password)
    fetch(`http://localhost:3333/users?email=${state.Email}&password=${a}`)
    .then((response) => response.json())
    .then((json)=>{
        if(json.length===0){
            alert("Invalid Email and Password")
        }
        else{
             localStorage.setItem("Email",json[0].id)
             dispatch({
                 type:"Login",payload:!state.loggedin
             })
        }
    })
    .catch((error)=>alert(`${error}`))
};
    if(state.loggedin){
        return <Redirect to ="/posts" />
    }
    else{
    return (
       <div className="bg" >
       <Form className="login-form" onSubmit={submit}>
        <h1><span className="font-weight-bold text-center">Login</span></h1>
        <h2 className="text-center">Welcome</h2>
        <FormGroup className="right">
            <Label>Email</Label>
            <Input type="email" placeholder="Email" value={state.Email}
            onChange={e=>{dispatch({type :"Email", value:e.target.value})}} required />
        </FormGroup>
        <FormGroup className="right">
            <Label>Password</Label>
            <Input type="password" placeholder="Password" value={state.Password}
            onChange={e=>{dispatch({type :"Password", value:e.target.value})}} required />
        </FormGroup>
        <Button className="btn-lg btn-dark btn-block">Login</Button>
        <div className="text-center">
        <Link to="/Regisration">Registration</Link>
        </div>
        </Form>
    </div>
    ) }
}

export default Login
