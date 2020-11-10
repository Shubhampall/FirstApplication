import React, { useReducer,useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import './style.css';
import {Button} from 'reactstrap';
import * as ReactBootStrap from 'react-bootstrap';
var commit=""
const State={
    name:'',
    posts:[],
    Comment:false,
    loading:false
}
const reducer=(state,action)=>{
    switch(action.type){
        case "name":
            return{...state,name:action.payload}
        case "post":
            return{...state,posts:action.payload}
        case "loading":
            return{...state,loading:action.payload}
     }
}
function Post() {
    const [state,dispatch]=useReducer(reducer,State)
    const user=localStorage.getItem("Email");
    useEffect(()=>{
        fetch(`http://localhost:3333/users/${user}`)
        .then((response) => response.json())
        .then((json)=>dispatch({type:"name",payload:json.first_name+ " " +json.last_name}))
        .catch((error)=>alert(`${error}`))
        fetch('http://localhost:3333/posts?userid='+user)
        .then((response) => response.json())
        .then((json)=>dispatch({type:"post",payload:json}))
        .catch((error)=>alert(`${error}`))
    },[])
    const ViewData=()=>{
        return(<React.Fragment>
            {
             state.posts.map(post=><div key={post.id} className="post">
             <h2>{post.id}</h2>
             <h3><span>-:Title:-</span><br/> {post.title}</h3>
             <h3><span>-:Body:-</span><br/> {post.body}</h3>
             <a id={post.id} href={commit="/comment/"+post.id} className="Link" >View the Commit</a>
             </div>)
            }
        </React.Fragment>)
    }
    const Loading=()=>{
        setTimeout(()=>{dispatch({type:"loading",payload:true})},3000)
        if(state.loading){
            return(<div><h1>No Posts Yet</h1></div>)
        }
        else{
            return(<ReactBootStrap.Spinner animation="border" />)
        }
    }
    const Logout=()=>
    {
        localStorage.removeItem("Email")
        window.location.href='/'
    }
    const Posts=()=>
    {
        window.location.href='/post'
    }
    if(user==null){
       return(<Redirect to="/" />)
    }
    else{
    return(
        <div>
            <h2 className="abc">{state.name}</h2>
            <Button className="btn-lg btn-dark btn--block back" onClick={Posts}>Post</Button>
               <Button className="btn-lg btn-dark btn--block position" onClick={Logout}>Logout</Button>
            {state.posts.length>0  ? <ViewData/>:<Loading/>}
        </div>
    )
}
}
export default Post
