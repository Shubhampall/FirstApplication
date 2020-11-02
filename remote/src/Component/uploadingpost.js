import React, { useEffect, useReducer } from 'react'
import { Link, Redirect, Switch } from 'react-router-dom';
import './style.css';
import {Button,Form,FormGroup,Label,Input} from 'reactstrap';

const initialstate={
    Title :"",
    Body:"",
}
  
  const reducer=(state,action)=>{
   switch(action.type){
        case "title":
           return{...state,Title:action.value}
        case "body":
           return{...state,Body:action.value}   
        }
  }
function Uploadingpost() { 
    const [state,dispatch]=useReducer(reducer,initialstate)
    const user=localStorage.getItem("Email");
    const styles={
button :{
    margin :15
}}
const setData=(e)=>{
    e.preventDefault();
    fetch('http://localhost:3333/posts', {
            method: 'POST',
            body: JSON.stringify({
              userId :user,
              title:state.Title,
              body:state.Body,
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
              alert(error);
          });     
          alert("Sucessfully Post")
        window.location.href='/post'
        
    } 
    const Back=()=>
    {
        window.location.href='/posts'
    }
    return (
        <div className="bg">
        <Button className="btn-lg btn-dark btn--block back" onClick={Back}>Posts</Button>
        <Form className="login-form" onSubmit={setData}>
        <h1><span className="font-weight-bold">Post</span></h1>
        <FormGroup className="right">
            <Label>Title</Label>
            <Input type="text" placeholder="Enter Title" value={state.Email}
            onChange={e=>{dispatch({type :"title", value:e.target.value})}} required />
        </FormGroup>
        <FormGroup className="right">
            <Label>First Name</Label>
            <Input type="textarea" placeholder="Enter Your body" value={state.First}
            onChange={e=>{dispatch({type :"body", value:e.target.value})}} required />
        </FormGroup>
        <Button className="btn-lg btn-dark btn-block">Submit</Button>
        <div className="text-center">
        </div>
        </Form>
    </div>
    )
}

export default Uploadingpost
